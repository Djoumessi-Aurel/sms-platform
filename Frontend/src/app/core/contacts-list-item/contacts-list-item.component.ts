import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contacts-list-item',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.scss']
})
export class ContactsListItemComponent implements OnInit {
  @Input() id:number=0;
  @Input() name:string = "John Doe";
  @Input() number:string = "6700000876";
  @Input() photo:string = '';
  currentContact:Contact = new Contact("675654454","Joe","");
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const number = form.value['number'];
    const photo = form.value['photo'];
    this.contactService.modifyContact(this.currentContact,name,number, photo);
    form.resetForm();
  }
}
