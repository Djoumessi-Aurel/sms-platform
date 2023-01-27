import { Injectable } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Contact} from '../../models/contact.model';
import {Message} from '../../models/message.models';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  contacts:Contact[] = [new Contact('654454354','John DOE', "../../../assets/images/profile.jpeg")];;
  messages:Message[] = [new Message('Hey', {hours:14,minutes:47}, new Date())] 
  getContacts():Contact[]{
    return this.contacts;
  }
  getMessages():Message[]{
    return this.messages;
  }
}
