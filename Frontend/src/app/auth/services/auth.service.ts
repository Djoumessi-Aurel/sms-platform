import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import axios from 'axios';
import { LocalService } from './local.service';

@Injectable()
export class AuthService {

    currentUser:any = null
    backendUrl: string = 'http://localhost:8080/api'
    // backendUrl: string = 'https://sms-platform-backend-production.up.railway.app/api'
    isAdmin:boolean = false;
    private isAuth:boolean = false; //boolean for authentication state
    isAuthSubject = new Subject<boolean>();
    currentUserSubject = new Subject<any>();
    TOKEN_KEY: string = 'key-sms-platform-key-online'

    constructor(private localService: LocalService){
        this.signInWithToken().then((response)=>{
            // this.emitUserInfos() //Already done in signInWithToken method
            // console.log(response)
        })
        .catch((error)=>{console.log(error)})
    }

    getIsAuth(){
        if(!this.localService.getData(this.TOKEN_KEY)) this.signOut()
        return this.isAuth
    }

    emitUserInfos() {
        this.isAuthSubject.next(this.isAuth)
        this.currentUserSubject.next(this.currentUser)
      }

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
                    this.emitUserInfos()
                    this.localService.saveData(this.TOKEN_KEY, response.data.token) //saving token into local storage
                    // console.log("IsAuth=", this.isAuth, this.currentUser)
                })
                .catch((error)=>{
                    reject(error.response)
                })
            }
        );
    }

    signInWithToken(){
        return new Promise( //asynchronous function
            (resolve, reject) => {

                if(!this.localService.getData(this.TOKEN_KEY)){ reject('User not signed in.'); this.localService.removeData(this.TOKEN_KEY); }

                axios.post(this.backendUrl + '/auth/login-with-token', {token: this.localService.getData(this.TOKEN_KEY)})
                .then((response)=>{
                    this.currentUser = response.data
                    this.currentUser.token = this.localService.getData(this.TOKEN_KEY)
                    this.isAuth = true
                    this.emitUserInfos()
                    resolve(response.data)
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
        this.localService.removeData(this.TOKEN_KEY) //removing the token from the local storage
        this.isAuth = false; this.currentUser = null
        this.emitUserInfos()
    }
}