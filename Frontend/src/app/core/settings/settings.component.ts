import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentUser: User = new User('675454554','jesuisaw','johndoe06', 'fdfdfdfd');
  isShow: boolean= false;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){

  }
  onModify(){
    if(this.isShow){
      this.isShow = false;
    } else{
      this.isShow = true;
    }
    
  }
}
