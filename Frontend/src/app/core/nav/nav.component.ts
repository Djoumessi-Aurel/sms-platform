import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth/services/auth.service'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  adminStatus: boolean = false;
  userName: string = ''
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.adminStatus = this.authService.isAdmin;
    this.userName = this.authService.currentUser.name;
  }
  onSignOut() {
    this.authService.signOut();
  }
}
