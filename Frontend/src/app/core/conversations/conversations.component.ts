import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  
  constructor(private convService: ConversationService) { }

  ngOnInit(): void {
  }


}
