import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '../services/conversation.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

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
    
    return finalTab.sort((a, b) => {
      let lastA = a.messageList[a.messageList.length - 1];
      let lastB = b.messageList[b.messageList.length - 1];
      return moment(lastB.createdAt).unix() - moment(lastA.createdAt).unix()
    })
  }

  constructor(private router: Router, private convService: ConversationService) { }

  toggleShowInput(): void {
    this.showInput = !this.showInput
  }

  ngOnInit(): void {
    this.messagesSubscription = this.convService.sentMessagesSubject.subscribe(
      (messages:any[]) => { this.sentMessages = messages;  }
    );

    this.convService.refreshMessages()//.then((response)=>{console.log(response)})
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
