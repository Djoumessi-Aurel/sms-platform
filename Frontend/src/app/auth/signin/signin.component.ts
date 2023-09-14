import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuardService} from '../services/auth-guard.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup = this.fb.group({ });
  submitted = false;
  signinMessage: string = '';
  authMessage: string = '';
  waitingMessage: string = 'Processing... Please wait.';
  isSending: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router,
              private authGuardService: AuthGuardService) { 

  }
  get email(){
    return this.signinForm.get('email');
  }
  get password(){
    return this.signinForm.get('password');
  }
  onSubmit(): void {
    let email = this.signinForm.get('email')!.value;
    let password = this.signinForm.get('password')!.value;
    
    if(this.signinForm.invalid){ console.log('Formulaire invalide'); return;}

    this.signinMessage = '';
    this.isSending = true;
    
    this.authService.signInUser(email,password).then(
      
      (response) => {
        this.router.navigate(['/core']);
      },
      (error) => {
        this.isSending = false;
        this.signinMessage = error.data.message;
        //this.router.navigate(['/auth/signup']);
      }
    );
    
  }
  initForm(){
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    if(this.authService.getIsAuth()) this.router.navigate(['/core']);

    this.authMessage = this.authGuardService.authMessage;
    this.initForm();
  }

}
