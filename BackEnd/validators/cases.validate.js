import { NoPartiesProvidedError, TooManyPartiesProvidedError } from "../errors/case.error.js";
import GenericValidator from "./generic.validate.js";

export default class CaseValidator {
    static validateCaseData(data) {
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        GenericValidator.validateEmail(data.email);
        GenericValidator.validatePhoneNumber(data.phoneNumber);
        if(data.parties.length === 0) {
            throw new NoPartiesProvidedError();
        }
        else if(data.parties.length > 2) {
            throw new TooManyPartiesProvidedError();
        }
    }
}