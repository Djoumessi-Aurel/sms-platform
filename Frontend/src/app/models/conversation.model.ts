import { Contact } from "./contact.model";
import { Message } from "./message.models";
import { User } from "./user.model";

export class Conversation{
    constructor(
        public receiver:Contact,
        public sender: User,
        public messages:Message[]
    ){}
}