import GenericValidator from "./generic.validate.js";

export default class CourtValidator {
    static validateCourtData(data) {
        GenericValidator.validateNotEmpty(
            data.courtName,
            data.city,
            data.street, 
            data.phoneNumber,
            data.email
        )
        GenericValidator.validateEmail(data.email);
        GenericValidator.validatePhoneNumber(data.phoneNumber);
    }
}