import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { BackuppasswordComponent } from './backuppassword/backuppassword.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent,
    children:[
      {path:'', redirectTo:'signin'},
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'backuppassword', component: BackuppasswordComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'resetpassword/:id/:token', component: ResetPasswordComponent },
      
    ] 
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
