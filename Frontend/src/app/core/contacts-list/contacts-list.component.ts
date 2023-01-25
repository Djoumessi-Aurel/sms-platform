import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  contactSubscription: Subscription = new Subscription();
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactSubscription = this.contactService.contactSubject.subscribe(
      (contacts:Contact[]) => { this.contacts = contacts;}
    );
    
    this.contactService.refreshContacts()
    .then(()=>{
      this.contactService.emitContacts()
    }) 
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }
  

}
