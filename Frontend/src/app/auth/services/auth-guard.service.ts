import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    authMessage:string = "";
    constructor(private authService: AuthService,
                private router: Router) { }
  
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.getIsAuth()) {
        return true;
      } else {
        this.authMessage = "You must sign in first!";
        this.router.navigate(['/auth/signin']);
        return false;
      }
    }
  }