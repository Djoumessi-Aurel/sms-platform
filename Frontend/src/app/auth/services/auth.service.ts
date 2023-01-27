import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(private router: Router){}

    currentUser:any = null
    backendUrl: string = 'https://sms-platform-backend-production.up.railway.app/api'
    isAdmin:boolean = false;
    isAuth:boolean = false; //boolean for authentication state
    /*This is the service where authentication functons are defined */
    signUpUser(name: string, email: string, phone:string, password: string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                axios.post(this.backendUrl + '/auth/register', {name, email, phone, password})
                .then((response)=>{
                    resolve(response.data)
                })
                .catch((error)=>{
                    reject(error.response)
                })
            }
        );
        
    }
    signInUser(email:string, password:string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                axios.post(this.backendUrl + '/auth/login', {email, password})
                .then((response)=>{
                    resolve(response.data)
                    this.currentUser = response.data.result
                    this.currentUser.token = response.data.token
                    this.isAuth = true
                    // console.log("IsAuth=", this.isAuth, this.currentUser)
                })
                .catch((error)=>{
                    reject(error.response)
                })
            }
        );
    }
    backupPassword(email:string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                axios.post(this.backendUrl + '/auth/forgot-password', {email})
                .then((response)=>{
                    resolve(response.data)
                })
                .catch((error)=>{
                    reject(error.response)
                })
            }
        );
    }

    verifyToken(id:string, token:string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                axios.get(this.backendUrl + `/auth/reset-password/${id}/${token}`)
                .then((response)=>{
                    resolve(response.data)
                })
                .catch((error)=>{
                    reject(error.response)
                })
            }
        );
    }

    resetPassword(id:string, token:string, password:string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                axios.post(this.backendUrl + `/auth/reset-password/${id}/${token}`, {password})
                .then((response)=>{
                    resolve(response.data)
                })
                .catch((error)=>{
                    reject(error.response)
                })
            }
        );
    }

    signOut() {
        
        this.isAuth = false; this.currentUser = null
        
    }
}