import GenericValidator from "./generic.validate.js";

export default class UserValidator {
	static validateUserData(data) {
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key])
		);
		GenericValidator.validatePhoneNumber(data.phoneNumber);
	}
}