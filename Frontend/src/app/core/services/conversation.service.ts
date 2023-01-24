import { Injectable } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  conversationSubject = new Subject<Conversation[]>();
  private conversations: Conversation[] = [];

  emitConversations() {
    this.conversationSubject.next(this.conversations.slice());
  }

  addConversation(conversation: Conversation) {
    this.conversations.push(conversation);
    this.emitConversations();
  }
  deleteContact(conversation: Conversation){
    ////
    this.emitConversations();
  }
  modifyContact(conversation: Conversation){
    //////////
    this.emitConversations();
  }
  constructor() { }
}
