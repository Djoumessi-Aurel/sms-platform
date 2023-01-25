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
  @Input() contact:Contact = new Contact("klsjfdlk1fkd","Joe","675654454");

  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
  }

  delete(event:any){
    let a=confirm(`Do you really want to remove this contact?\nName: ${this.contact.name}, Phone: ${this.contact.phone}`)
    if(a){
      //Function to delete the contact
      this.contactService.deleteContact(this.contact._id)
    }
    
  }

  onSubmit(form: NgForm, event:any) {
    let a=confirm("Do you really want to modify this contact?")

    if(a){
      const name = form.value['name'];
      const number = form.value['phone'];
      //Function to update the contact
      this.contactService.updateContact(this.contact._id, name, number)
    }
   
   form.resetForm({name: this.contact.name, phone: this.contact.phone})
  }
}
