import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '../services/conversation.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {

  messagesSubscription: Subscription = new Subscription();
  sentMessages: any[] = []
  showInput: boolean = false
  inputNumber: string = ''
  filterText: string = ''

  contactSubscription: Subscription = new Subscription()
  contacts: Contact[] = []

  get convList(){
    let receiverList: any[] = []
    let _convListObject: any = {}

    for(let message of this.sentMessages){
      receiverList = receiverList.concat(message.receivers)
    }
    receiverList = [...new Set(receiverList)]; //eliminate duplicates, to obtain the list of receivers

    for(let receiver of receiverList){
      _convListObject[receiver] = []
    }

    for(let message of this.sentMessages){
      let {_id, content, createdAt} = message

        for(let receiver of message.receivers){
        _convListObject[receiver].push({_id, content, createdAt})
        }
    }

    let finalTab = []
    for(let phone in _convListObject){
      finalTab.push({receiver: phone, messageList: _convListObject[phone]})
    }

    if(this.filterText !== ''){ let fil = this.filterText.toLowerCase()
      finalTab = finalTab.filter((value)=>{
        return this.getContactName(value.receiver).toLowerCase().includes(fil)
      })
    }
    
    return finalTab.sort((a, b) => {
      let lastA = a.messageList[a.messageList.length - 1];
      let lastB = b.messageList[b.messageList.length - 1];
      return moment(lastB.createdAt).unix() - moment(lastA.createdAt).unix()
    })
  }

  constructor(private router: Router, private convService: ConversationService,
    private contactService: ContactService) { }

  toggleShowInput(): void {
    this.showInput = !this.showInput
  }

  ngOnInit(): void {
    this.messagesSubscription = this.convService.sentMessagesSubject.subscribe(
      (messages:any[]) => { this.sentMessages = messages;  }
    );

    this.convService.emitMessages()//.then((response)=>{console.log(response)})

    this.contactSubscription = this.contactService.contactSubject.subscribe(
      (contacts:Contact[]) => { this.contacts = contacts; }
    )
    
    this.contactService.emitContacts()
  }

  getContactName(phone: string){
    //If the phone number is in the contacts, return the related contact name
    //else, return the phone number
    let contact = this.contacts.find((value)=>{return value.phone === phone})

    if(contact) return contact.name
    return phone
  }

  onViewConv(phone: string){
    this.router.navigate(['core', 'conversations', phone]);    
  }

  writeToNumber(){
    if(this.inputNumber.match(/^[0-9]{6,}$/)){
      this.router.navigate(['core', 'conversations', this.inputNumber])
    }
    else {alert('Invalid phone number')}
 
  }

}
