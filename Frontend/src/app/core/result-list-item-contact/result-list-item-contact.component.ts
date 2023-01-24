import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-list-item-contact',
  templateUrl: './result-list-item-contact.component.html',
  styleUrls: ['./result-list-item-contact.component.scss']
})
export class ResultListItemContactComponent implements OnInit {
  @Input() name:string="John";
  @Input() number:string="675849404";
  constructor() { }

  ngOnInit(): void {
  }

}
