import GenericValidator from "./generic.validate.js";

export default class UserTypesValidator {
    static validateUserType(userType) {
        GenericValidator.validateNotEmpty(userType);
    }
}