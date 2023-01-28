import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isAuth: boolean = false
  isAuthSubscription = new Subscription

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth: boolean) => { this.isAuth = isAuth }
    )
    
    this.authService.emitUserInfos()
  }

}
