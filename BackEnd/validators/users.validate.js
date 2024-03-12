import { dbConfig } from "../config.js";
import { InvalidUserTypeError } from "../errors/user.error.js";
import GenericValidator from "./generic.validate.js";

export default class UserValidator {
	static validateUserData(data) {
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key]));
		GenericValidator.validateEmail(data.email);
		GenericValidator.validatePhoneNumber(data.phoneNumber);
		GenericValidator.validateIdNumber(data.idNumber);
		if(!dbConfig.USER_TYPES.includes(data.userType)) {
			throw new InvalidUserTypeError();
		}
	}

	static validateUpdateUserData(data) {
		GenericValidator.validateObjectId(data._id);
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key]));
		GenericValidator.validatePhoneNumber(data.phoneNumber);
	}
	
}