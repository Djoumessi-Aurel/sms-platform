import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import * as moment from 'moment';

@Component({
  selector: 'app-conversations-list-item',
  templateUrl: './conversations-list-item.component.html',
  styleUrls: ['./conversations-list-item.component.scss']
})
export class ConversationsListItemComponent implements OnInit {
  @Input() receiver: string = '' //receiver phone number
  @Input() messageList: any[] = [];
  contactSubscription: Subscription = new Subscription()
  contacts: Contact[] = []

  get lastMessage(){
    let msg = this.messageList[this.messageList.length - 1]
    msg.date = moment(msg.createdAt).format('DD/MM/YYYY')
    msg.time = moment(msg.createdAt).format('HH:mm')

    return msg
  }
  get receiverName(){
    let contact = this.contacts.find((value)=>{return value.phone === this.receiver})

    if(contact) return contact.name
    return ''
  }


  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactSubscription = this.contactService.contactSubject.subscribe(
      (contacts:Contact[]) => { this.contacts = contacts; }
    );
    
    this.contactService.emitContacts()
  }
       
}
