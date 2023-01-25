import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { SingleConversationComponent } from './single-conversation/single-conversation.component';
import { ConversationsViewComponent } from './conversations-view/conversations-view.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component'


const routes: Routes = [
  { path: '', component: CoreComponent,
    children:[
      {path:'', redirectTo:'contacts'},
      { path: 'contacts', component: ContactsComponent },
      { path: 'search', component:SearchComponent},
      { path: 'conversations', component: ConversationsViewComponent, 
        children:[
          {path:'', component:ConversationsComponent},
          {path:':id', component:SingleConversationComponent}] 
      },
      {path:'infos', component: SettingsComponent}
    ]
  } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
