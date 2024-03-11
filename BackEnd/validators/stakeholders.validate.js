import GenericValidator from "./generic.validate.js";

export default class StakeholderValidator {
	static validateStakeholderData(data) {
		GenericValidator.validateObjectId(data.partyId);
		StakeholderValidator.validateStakeholderDataNoPartyId(data);
	}
	
	static validateStakeholderDataNoPartyId(data) {
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key]));
		GenericValidator.validateEmail(data.email);
		GenericValidator.validatePhoneNumber(data.phoneNumber);
		GenericValidator.validateIdNumber(data.idNumber);
	}
}


