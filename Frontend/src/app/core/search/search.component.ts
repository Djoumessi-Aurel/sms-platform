import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message.models';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isContact:boolean= true;
  contacts:Contact[] = []
  messages:Message[] = []
  choices:any[]= [{content:"Messages",value:"message"},{content:"Contacts",value:"contact"}]
    constructor(private searchService:SearchService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const searchText = form.value['searchText'];
    const category = form.value['category'];
    if(category=="contact"){
        this.isContact = true;
        this.contacts = this.searchService.getContacts();
    }else {
      this.isContact = false;
      this.messages = this.searchService.getMessages();
    }
    console.log(this.contacts);
  }

}
