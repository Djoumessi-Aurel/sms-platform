import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isAuth: boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth
  }

}
