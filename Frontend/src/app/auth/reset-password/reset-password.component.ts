import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import  checkPassword  from '../validators/checkPassword';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  id: string = ''
  token: string = ''
  email: string = ''
  resetPasswordForm : FormGroup = this.fb.group({ });
  resetPasswordMessage: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router, private route: ActivatedRoute) { 
    
  }

  get password(){
    return this.resetPasswordForm.get('password');
  }

  onSubmit(): void {
    if(this.resetPasswordForm.invalid) {console.log('Formulaire invalide'); return;}

    this.resetPasswordMessage = 'Processing... Please wait.'
    let password = this.resetPasswordForm.get('password')!.value;

    this.authService.resetPassword(this.id, this.token, password).then(
      (response) => { //console.log('Réinitialisation de mot de passe réussie. Redirection...', response)
        this.router.navigate(['/auth/signin']);
        },
      (error) => {
        this.resetPasswordMessage = error.data.message;
        // this.router.navigate(['/auth/signup']);
       }
    );
  }

  initForm(){
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^.*[~!@#$%^&*|]+.*$")]],
      passwordConfirmation: ['', [Validators.required]]
    },
    {
      validators: [checkPassword]
    });
  }

  verifyUser(){
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.token = params['token']
    });
    
    this.authService.verifyToken(this.id, this.token).then(
      (response: any) => {
        this.email = response.content.email
        },
      (error) => {
        console.log(error.data.message)
        this.router.navigate(['/']);
       }
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.verifyUser()
  }
  
}
