import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService} from '../services/contact.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  filterText:string = ''
  sortDirection: string = '1' // 1 for alphabetic and 2 for anti-alphabetic
  isImporting: boolean = false
  constructor(private contactService:ContactService, private authService: AuthService) { }

  get numberOfContats(){
    return this.contactService.numberOfContats()
  }

  ngOnInit(): void {
  }

  addContact(number:string, name:string, photo:string): Contact{
    return new Contact(number, name,photo);
  }

  onDeleteContact(contact: Contact):void{

  }

  onModifyContacts(contact: Contact):void{

  }
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const phone = form.value['phone'];
    this.contactService.addContact(name, phone);
    form.resetForm();
  }

  processFile(event: Event){

    this.isImporting = true
    const element = event.currentTarget as HTMLInputElement;
    try {
        let fileList: FileList | null = element.files;

        if (fileList) {
          const fileItem = fileList[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            const text: string | ArrayBuffer | null = e.target!.result;
            if(text){
              const data = this.csvToArray(text);
              if(!data) return;
              this.addOwner(data)

              //Add the imported contacts in database
              this.contactService.addManyContacts(data)
              .then(()=>{this.isImporting = false; alert('Contacts successfully imported')})
              // console.log(data);
            }
          };
          
          reader.readAsText(fileItem);
        }
    } catch (error: any) {
      console.log(error.name, error.message)
    }

    element.value = ''
    this.isImporting = false
  }

  csvToArray(str: any, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    let headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    headers = this.cleanStringArray(headers)

    //If the structure is not correct, stop operation
    if(headers.length!==2 || headers[0]!='name' || headers[1]!='phone'){
      alert('The structure of this file is not valid. We cannot import it.')
      return;
    }

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    let rows = str.slice(str.indexOf("\n") + 1).split("\n");
    rows = this.cleanStringArray(rows)

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map( (row: any) => {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object: any, header: any, index: any) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  cleanString(str: string){
    return str.replace("\r", "").replace("\n", "").replace("\r\n", "")
  }

  cleanStringArray(tab: string[]){
    let result = []
    for(let str of tab){
      result.push(this.cleanString(str))
    }
    return result
  }

  addOwner(tab: any[]){ //Add the "owner" attribute to every element of the array. It represents the id of the current user.
    for(let str of tab){
      str.owner = this.authService.currentUser._id
    }
  }

}
