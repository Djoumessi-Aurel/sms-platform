import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentUser!: User;
  isShow: boolean= false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser
  }
  onSubmit(form:NgForm){

  }
  onModify(){
    // if(this.isShow){
    //   this.isShow = false;
    // } else{
    //   this.isShow = true;
    // }
  }
}
