import GenericValidator from "./generic.validate.js";

export default class DocumentsValidator {
	static validateDocumentData(data) {
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key])
		);
	}
}


