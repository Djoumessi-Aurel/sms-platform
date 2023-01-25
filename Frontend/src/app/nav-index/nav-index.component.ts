import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav-index',
  templateUrl: './nav-index.component.html',
  styleUrls: ['./nav-index.component.scss']
})
export class NavIndexComponent implements OnInit {

  isAuth: boolean = false
  currentUser: any
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth
    this.currentUser = this.authService.currentUser
  }

  onSignOut(): void {
    this.authService.signOut()
    this.router.navigate(['/auth/signin'])
  }

}
