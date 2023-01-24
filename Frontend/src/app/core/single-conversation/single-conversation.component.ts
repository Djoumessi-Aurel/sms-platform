import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-conversation',
  templateUrl: './single-conversation.component.html',
  styleUrls: ['./single-conversation.component.scss']
})
export class SingleConversationComponent implements OnInit {
  id:string='';
  nomContact:string='John DOE';
  messages = ["whats up Fella?","Are u okay?","ETA: 5mins", "You weirdo !", "I'm freaking awesome, they gonna like me obviously !", "ARE YOU IGNORING ME ?!", "Fine, i'm sorry", "will break your neck if you don't answer me RIGHT NOW!","I'm freaking awesome, they gonna like me obviously !", "ARE YOU IGNORING ME ?!", "Fine, i'm sorry", "will break your neck if you don't answer me RIGHT NOW!"]
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
  onSubmit(form: NgForm) {
    const message = form.value['message'];
    console.log(message);
    form.resetForm();
  }

}
