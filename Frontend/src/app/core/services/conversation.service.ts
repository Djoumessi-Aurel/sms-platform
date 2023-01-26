import { Injectable } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  sentMessagesSubject = new Subject<any[]>();
  private sentMessages: any[] = []; //List of the current user sent messages

  emitMessages() {
    this.sentMessagesSubject.next(this.sentMessages.slice());
  }

  refreshMessages() {
    
    return new Promise((resolve, reject)=>{
      axios.get(this.authService.backendUrl + '/sms/getSent/' + this.authService.currentUser.email)
                .then((response)=>{//console.log('Getting contacts: OK')
                    this.sentMessages = response.data.docs
                    this.emitMessages()
                    resolve('Getting SMS: OK')
                    //resolve(this.sentMessages)
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
  }

  sendMessage(content: string, receivers: string[]) {
    return new Promise((resolve, reject)=>{
      axios.post(this.authService.backendUrl + '/sms/send', {content, sender: this.authService.currentUser._id, receivers})
                .then((response)=>{//console.log(response.data.content)
                    this.sentMessages.push(response.data.content)
                    this.emitMessages()
                    resolve('Sending SMS: OK')
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
  }

  constructor(private authService: AuthService) { 
    
  }
}
