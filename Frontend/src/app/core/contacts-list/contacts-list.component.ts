import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  @Input() filterText = ''
  @Input() sortDirection: string = '1'

  contacts: Contact[] = [];
  contactSubscription: Subscription = new Subscription();
  constructor(private contactService:ContactService) { }

  get arrangedContacts(){
    let tab = this.contacts.slice()

    if(this.filterText !== ''){ let fil = this.filterText.toLowerCase()
      tab = tab.filter((value)=>{
        return value.name.toLowerCase().includes(fil) || value.phone.includes(fil)
      })
    }

    if(this.sortDirection === '1'){
      tab.sort((a, b) => a.name.localeCompare(b.name))
    }

    else if(this.sortDirection === '2'){
      tab.sort((a, b) => b.name.localeCompare(a.name))
    }

    return tab
  }

  ngOnInit(): void {
    this.contactSubscription = this.contactService.contactSubject.subscribe(
      (contacts:Contact[]) => { this.contacts = contacts;  }
    );
    
    this.contactService.refreshContacts()

  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }
  

}
