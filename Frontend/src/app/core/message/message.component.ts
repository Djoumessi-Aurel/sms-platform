import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: any // The message object {_id, content, createdAt}

  constructor() { }

  get _message(){ // The message object with formatted date and time attributes
    let msg = this.message
    msg.date = moment(msg.createdAt).format('DD/MM')
    msg.time = moment(msg.createdAt).format('HH:mm')

    return msg
  }

  ngOnInit(): void {
  }

}
