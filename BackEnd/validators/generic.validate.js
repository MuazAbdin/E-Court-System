import validator from "validator";
import { DataMissingError, InvalidEmailError, InvalidIdNumberError, InvalidPhoneNumberError } from "../errors/dataValidation.error.js"

export default class GenericValidator {
    static validateNotEmpty(...data) {
        data.forEach(item => {
            if(!item || validator.isEmpty(item + "")) {
                throw new DataMissingError();
            }
        });
    }

    static validateEmail(email) {
        if(!validator.isEmail(email.toLowerCase())) {
            throw new InvalidEmailError();
        }
    }

    static validatePhoneNumber(phoneNumber) {
        if(phoneNumber.length !== 10 || !validator.isNumeric(phoneNumber)) {
            throw new InvalidPhoneNumberError();
        }
    }

    static validateIdNumber(idNumber) {
        if(!validator.isNumeric(idNumber)) {
            throw new InvalidIdNumberError();
        }
    }
}