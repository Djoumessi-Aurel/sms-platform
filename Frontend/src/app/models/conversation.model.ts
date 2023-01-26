import { Message } from "./message.models";
import { AuthService } from "../auth/services/auth.service";

export class Conversation{

    constructor(
        // public receiver:Contact,
        public receiver: string, //The phone number of the receiver
        public messages:Message[] //The list of message of the conversation
    ){ }

    getLastMessage(){
        return this.messages[this.messages.length]
    }
}
