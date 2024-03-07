import GenericValidator from "./generic.validate.js";

export default class StackHolderValidator {
	static validateStackHolderData(data) {
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key])
		);
		GenericValidator.validateEmail(data.email);
		GenericValidator.validatePhoneNumber(data.phoneNumber);
		GenericValidator.validateIdNumber(data.idNumber);
	}
}

// async createStackHolder(req, res) {
// 		    const { idNumber, firstName, lastName, email, phoneNumber, city, street } = req.body;
// 		try {
// 			StackHolderValidator.validateStackHolderData(req.body);

// 			const court = await StackHolder.create({ name: courtName, city, street, phoneNumber, email });
// 			res.json(court);
// 		}
// 		catch(error) {
// 			errorHandler.handleError(res, error);
// 		}
// 	}
