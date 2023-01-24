import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import  checkPassword  from '../validators/checkPassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup = this.fb.group({ });
  signupMessage: string = '';
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) { 
    
  }
  get name(){
    return this.signupForm.get('name');
  }
  get email(){
    return this.signupForm.get('email');
  }
  get phone(){
    return this.signupForm.get('phone');
  }
  get password(){
    return this.signupForm.get('password');
  }

  onSubmit(): void {
    if(this.signupForm.invalid) {console.log('Formulaire invalide'); return;}

    let name = this.signupForm.get('name')!.value;
    let email = this.signupForm.get('email')!.value;
    let password = this.signupForm.get('password')!.value;
    let phone = this.signupForm.get('phone')!.value;
    console.log(name, email, phone, password)
    this.authService.signUpUser(name, email, phone, password).then(
      (response) => { console.log('Inscription réussie. Redirection...', response)
        this.router.navigate(['/auth/signin']);
        },
      (error) => {
        this.signupMessage = error.data.message;
        // this.router.navigate(['/auth/signup']);
       }
    );
    
  }
  initForm(){
    this.signupForm = this.fb.group({
      name: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^6[0-9]{8}")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^.*[~!@#$%^&*|]+.*$")]],
      passwordConfirmation: ['', [Validators.required]]
    },
    {
      validators: [checkPassword]
    });
  }
  ngOnInit(): void {
    this.initForm();
  }
  
  
}
