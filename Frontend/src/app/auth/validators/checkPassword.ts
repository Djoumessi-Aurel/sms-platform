import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

//Custom validator for password confirmation
const checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors|null =>{
    let password = group.get('password')?.value;
    let passwordConfirmation = group.get('passwordConfirmation')?.value;
    if (passwordConfirmation === ""){ //don't verify if the input password confirmation is empty
        return null;
    }
    return password === passwordConfirmation ? null : {notSame:true};
    
    

}
export default checkPassword;