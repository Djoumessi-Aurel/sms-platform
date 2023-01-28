import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav-index',
  templateUrl: './nav-index.component.html',
  styleUrls: ['./nav-index.component.scss']
})
export class NavIndexComponent implements OnInit {

  isAuth: boolean = false
  currentUser: any
  isAuthSubscription = new Subscription()
  currentUserSubscription = new Subscription()

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth: boolean) => { this.isAuth = isAuth }
    )

    this.currentUserSubscription = this.authService.currentUserSubject.subscribe(
      (currentUser) => { this.currentUser = currentUser }
    )

    this.authService.emitUserInfos()
  }

  onSignOut(): void {
    this.authService.signOut()
    this.router.navigate(['/auth/signin'])
  }

}
