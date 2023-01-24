import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth/services/auth.service'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  adminStatus: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.adminStatus = this.authService.isAdmin;
  }
  onSignOut() {
    this.authService.signOut();
  }
}
