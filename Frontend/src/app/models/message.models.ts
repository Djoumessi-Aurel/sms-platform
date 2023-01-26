import { Time } from "@angular/common";

export class Message{
    constructor(
        public content:string,
        public hour: Time = {hours: 0, minutes: 0},
        public date: Date = new Date()
    ){}
}