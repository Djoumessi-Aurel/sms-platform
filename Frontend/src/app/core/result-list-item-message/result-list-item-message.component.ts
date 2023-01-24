import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-list-item-message',
  templateUrl: './result-list-item-message.component.html',
  styleUrls: ['./result-list-item-message.component.scss']
})
export class ResultListItemMessageComponent implements OnInit {
  @Input() content:string="Hey you";
  @Input() hour:Time={hours:12,minutes:9};
  constructor() { }

  ngOnInit(): void {
  }

}
