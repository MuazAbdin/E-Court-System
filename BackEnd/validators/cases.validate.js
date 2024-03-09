import GenericValidator from "./generic.validate.js";

export default class CaseValidator {
    static validateCaseData(data) {
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        GenericValidator.validateEmail(data.email);
        GenericValidator.validatePhoneNumber(data.phoneNumber);
    }
}