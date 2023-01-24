import { Injectable } from '@angular/core';
import { Contact} from '../../models/contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSubject = new Subject<Contact[]>();
  private contacts: Contact[] = [new Contact('654454354','John DOE', "../../../assets/images/logosms.png")];
  emitContacts() {
    this.contactSubject.next(this.contacts.slice());
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.emitContacts();
  }
  deleteContact(contact: Contact){
    ////
    this.emitContacts();
  }
  modifyContact(contact: Contact, name:string, number:string, photo:string){
    //////////
    this.emitContacts();
  }
  constructor() { }
}
