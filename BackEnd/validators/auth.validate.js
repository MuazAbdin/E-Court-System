import { ConfirmationPasswordDoesNotMatchError } from "../errors/userAuth.error.js";
import GenericValidator from "./generic.validate.js";

export default class AuthDataValidator {
    static validatePassword(password, confirmPassword) {
        if(password !== confirmPassword) {
            throw new ConfirmationPasswordDoesNotMatchError();
        }
    }

    static validateRegisterData(data) {
        GenericValidator.validateNotEmpty(
            data.idNumber, 
            data.firstName,
            data.lastName,
            data.userType,
            data.email,
            data.phoneNumber,
            data.city,
            data.street
        );
        GenericValidator.validateIdNumber(data.idNumber);
        GenericValidator.validateEmail(data.email);
        GenericValidator.validatePhoneNumber(data.phoneNumber);
    }

    static validateLoginData(data) {
        GenericValidator.validateNotEmpty(
            data.email,
            data.password
        );
        GenericValidator.validateEmail(data.email);
    }
}