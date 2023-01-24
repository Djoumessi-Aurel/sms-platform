import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NavComponent } from './nav/nav.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsListItemComponent } from './contacts-list-item/contacts-list-item.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { ConversationsListItemComponent } from './conversations-list-item/conversations-list-item.component';
import { SingleConversationComponent } from './single-conversation/single-conversation.component';
import { ConversationsViewComponent } from './conversations-view/conversations-view.component';
import { MessageComponent } from './message/message.component';
import { FormsModule } from '@angular/forms';

import { ContactService} from './services/contact.service';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './services/search.service';

import { ResultListItemMessageComponent } from './result-list-item-message/result-list-item-message.component';
import { ResultListItemContactComponent } from './result-list-item-contact/result-list-item-contact.component';


@NgModule({
  declarations: [
    CoreComponent,
    NavComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactsListItemComponent,
    ConversationsComponent,
    ConversationsListComponent,
    ConversationsListItemComponent,
    SingleConversationComponent,
    ConversationsViewComponent,
    MessageComponent,
    SettingsComponent,
    SearchComponent,
    ResultListItemMessageComponent,
    ResultListItemContactComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ],
  providers: [ContactService, SearchService]
})
export class CoreModule { }
