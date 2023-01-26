import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { ConversationService } from '../services/conversation.service';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-single-conversation',
  templateUrl: './single-conversation.component.html',
  styleUrls: ['./single-conversation.component.scss']
})
export class SingleConversationComponent implements OnInit {

  messagectrl!: FormControl

  receiver: string = '' //Phone number of the receiver
  messagesSubscription: Subscription = new Subscription()
  sentMessages: any[] = [] //All the messages sent by the current user, to all his receivers
  contactSubscription: Subscription = new Subscription()
  contacts: Contact[] = []

  constructor(private route: ActivatedRoute, private formbuilder:FormBuilder, private convService:ConversationService,
     private contactService: ContactService) { }

  get receiverName(){
      let contact = this.contacts.find((value)=>{return value.phone === this.receiver})

      if(contact) return contact.name
      return ''
    }

  get messages(){ //Messages sent by the current user to this receiver

    let finalTab = []

    for(let message of this.sentMessages){
      let {_id, content, createdAt} = message

      if(message.receivers.indexOf(this.receiver) > -1){
        finalTab.push({_id, content, createdAt})
      }
    }
    
    return finalTab
  }
  
  ngOnInit(): void {
    this.receiver = this.route.snapshot.params['id'];
    this.messagectrl = this.formbuilder.control('', [Validators.required])

    this.messagesSubscription = this.convService.sentMessagesSubject.subscribe(
      (messages:any[]) => { this.sentMessages = messages;  }
    )

    this.contactSubscription = this.contactService.contactSubject.subscribe(
      (contacts:Contact[]) => { this.contacts = contacts; }
    )
    
    this.contactService.emitContacts()

    this.convService.emitMessages()
  }

 
  onSubmit(form: NgForm) {
    if(form.invalid) return

    let message = form.value['message']
    if(message.trim() === '') return
  
    this.convService.sendMessage(message, [this.receiver])
    .then(()=>{form.resetForm()})
    .catch((error)=>{console.log(error)})
   
  }

}
