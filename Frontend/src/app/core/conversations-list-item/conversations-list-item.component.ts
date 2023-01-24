import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversations-list-item',
  templateUrl: './conversations-list-item.component.html',
  styleUrls: ['./conversations-list-item.component.scss']
})
export class ConversationsListItemComponent implements OnInit {
  @Input() nomContact:string="John Doe";
  @Input() lastMessage: string="Hope you are okay";
  constructor() { }

  ngOnInit(): void {
  }

}
