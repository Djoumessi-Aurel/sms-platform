import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService} from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
  }

  addContact(number:string, name:string, photo:string): Contact{
    return new Contact(number, name,photo);
  }

  onDeleteContact(contact: Contact):void{

  }

  onModifyContacts(contact: Contact):void{

  }
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const number = form.value['number'];
    const photo = form.value['photo'];
    this.contactService.addContact(this.addContact(number,name, photo));
    form.resetForm();
  }
}
