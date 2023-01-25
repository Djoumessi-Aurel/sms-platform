
export class Contact{
    constructor(
        public _id: string,
        public name: string,
        public phone: string,
        public owner: string = '',
        public createdAt: string = '',
        public updatedAt: string = '',

    ){}
}