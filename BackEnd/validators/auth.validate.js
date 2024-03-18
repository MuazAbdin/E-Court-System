import validator from "validator";
import { ConfirmationPasswordDoesNotMatchError } from "../errors/userAuth.error.js";
import GenericValidator from "./generic.validate.js";

export default class AuthDataValidator {
  static validatePasswordConfirm(password, confirmPassword) {
    if (!validator.equals(password + "", confirmPassword + "")) {
      throw new ConfirmationPasswordDoesNotMatchError();
    }
  }

  static validateRegisterData(data) {
    Object.keys(data).forEach((key) =>
      GenericValidator.validateNotEmpty(data[key])
    );
    this.validatePasswordConfirm(data.password, data.confirmPassword);
    GenericValidator.validateIdNumber(data.idNumber);
    GenericValidator.validateEmail(data.email);
    GenericValidator.validatePhoneNumber(data.phoneNumber);
  }

  static validateLoginData(data) {
    Object.keys(data).forEach((key) =>
      GenericValidator.validateNotEmpty(data[key])
    );
    GenericValidator.validateIdNumber(data.idNumber);
  }

  static validateChangePasswordData(data) {
    Object.keys(data).forEach((key) =>
      GenericValidator.validateNotEmpty(data[key])
    );
    this.validatePasswordConfirm(data.password, data.confirmPassword);
  }
}
