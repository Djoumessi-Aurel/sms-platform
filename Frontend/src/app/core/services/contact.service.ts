import { Injectable } from '@angular/core';
import { Contact} from '../../models/contact.model';
import { Subject } from 'rxjs';
import axios from 'axios';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSubject = new Subject<Contact[]>();
  private contacts: Contact[] = [];

  constructor(private authService: AuthService) { 
    this.refreshContacts().then((response) => console.log(response))
                          .catch((error) => console.log(error))
  }

  emitContacts() {
    this.contactSubject.next(this.contacts.slice());
  }

  numberOfContats(){
    return this.contacts.length
  }

  refreshContacts() {
    
    return new Promise((resolve, reject)=>{
      axios.get(this.authService.backendUrl + '/contact/' + this.authService.currentUser.email,
      {headers: {'Authorization': 'Basic ' + this.authService.currentUser.token}})
                .then((response)=>{//console.log('Getting contacts: OK')
                    this.contacts = response.data.docs
                    this.emitContacts()
                    resolve('Getting contacts: OK')
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
  }
  
  addContact(name:string, phone:string) {
    
    return new Promise((resolve, reject)=>{
      axios.post(this.authService.backendUrl + '/contact/create', {name, phone, ownerId: this.authService.currentUser._id},
      {headers: {'Authorization': 'Basic ' + this.authService.currentUser.token}})
                .then((response)=>{
                    this.contacts.push(response.data.content)
                    this.emitContacts()
                    resolve('Adding a contact: OK')
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
  }

  addManyContacts(contactsArray: any[]) {
    
    return new Promise((resolve, reject)=>{
      axios.post(this.authService.backendUrl + '/contact/createMany', {contactsArray},
      {headers: {'Authorization': 'Basic ' + this.authService.currentUser.token}})
                .then((response)=>{
                    this.contacts.push(...response.data.content)
                    this.emitContacts()
                    resolve('Importing contacts: OK')
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
  }

  deleteContact(id: string){
    
    return new Promise((resolve, reject)=>{
      axios.delete(this.authService.backendUrl + `/contact/delete/${id}`,
      {headers: {'Authorization': 'Basic ' + this.authService.currentUser.token}})
                .then((response)=>{
                    this.contacts = this.contacts.filter((value) => value._id !== id)
                    this.emitContacts()
                    resolve('Deleting a contact: OK')
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
  }

  updateContact(id: string, name:string, phone:string){
    
    return new Promise((resolve, reject)=>{
      axios.put(this.authService.backendUrl + '/contact/update', {name, phone, contactId: id},
      {headers: {'Authorization': 'Basic ' + this.authService.currentUser.token}})
                .then((response)=>{
                  let index = this.contacts.findIndex((value) => value._id === id)
                  this.contacts[index] = response.data.content
                  this.emitContacts()
                  resolve('Updating a contact: OK')
                })
                .catch((error)=>{
                    reject(error.response)
                })
    })
    
  }
  
}
