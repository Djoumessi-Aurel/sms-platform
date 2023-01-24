import { Time } from "@angular/common";

export class Message{
    constructor(
        public content:string,
        public hour: Time,
        public date: Date
    ){}
}