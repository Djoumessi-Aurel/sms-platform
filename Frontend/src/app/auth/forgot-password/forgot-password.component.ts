import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm : FormGroup = this.fb.group({ });
  errorMessage: string = ''
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router) { 

    }
    get f(): {[key: string]: AbstractControl}{
      return this.forgotPasswordForm.controls;
    }
    get email(){
      return this.forgotPasswordForm.get('email');
    }
    
    initForm(){
      this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]]
      });
    }
    onSubmit(): void {
      if(this.forgotPasswordForm.invalid) {console.log('Formulaire invalide'); return;}
      this.errorMessage = 'Processing... Please wait.'

      let email = this.forgotPasswordForm.get('email')!.value;
      this.authService.backupPassword(email).then(
        (response) => { console.log(response)
          this.router.navigate(['/auth/backuppassword']);
        },
        (error) => {this.errorMessage = error.data.message;}
      );
      
    }
    ngOnInit(): void {
      this.initForm();
    }

}
