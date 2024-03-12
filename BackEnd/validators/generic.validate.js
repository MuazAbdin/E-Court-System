import validator from "validator";
import { DataMissingError, InvalidDateError, InvalidEmailError, InvalidIdNumberError, InvalidObjectIdError, InvalidPhoneNumberError } from "../errors/dataValidation.error.js"
import { Types } from "mongoose";

export default class GenericValidator {
    static validateNotEmpty(...data) {
        data.forEach((item) => {
            if (!item || validator.isEmpty(item + "")) {
                throw new DataMissingError();
            }
        });
    }

    static validateEmail(email) {
        if (!validator.isEmail(email.toLowerCase())) {
            throw new InvalidEmailError();
        }
    }

    static validatePhoneNumber(phoneNumber) {
        if (!/05\d{8}/.test(phoneNumber + "")) {
            throw new InvalidPhoneNumberError();
        }
    }

    static validateIdNumber(idNumber) {
        if (!validator.isNumeric(idNumber + "")) {
            throw new InvalidIdNumberError();
        }
    }

    static validateObjectId(id) {
        if (!Types.ObjectId.isValid(id)) {
            throw new InvalidObjectIdError();
        }
    }

    static validateDate(date) {
        if((new Date(date) === "Invalid Date") || isNaN(new Date(date))) {
            throw new InvalidDateError();
        }
    }
}
