import { DataMissingError, InvalidEmailError, InvalidIdNumberError, InvalidPhoneNumberError } from "../errors/dataValidation.error.js"

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ONLY_DIGITS_REGEX = /^\d+$/;

export default class GenericValidator {
    static validateNotEmpty(...data) {
        data.forEach(item => {
            if(item === "" || data === undefined || data === null) {
                throw new DataMissingError();
            }
        });
    }

    static validateEmail(email) {
        if(!EMAIL_REGEX.test(email.toLowerCase())) {
            throw new InvalidEmailError();
        }
    }

    static validatePhoneNumber(phoneNumber) {
        if(phoneNumber.length !== 10 || !ONLY_DIGITS_REGEX.test(phoneNumber)) {
            throw new InvalidPhoneNumberError();
        }
    }

    static validateIdNumber(idNumber) {
        if(!ONLY_DIGITS_REGEX.test(idNumber)) {
            throw new InvalidIdNumberError();
        }
    }
}