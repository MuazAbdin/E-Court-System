import GenericValidator from "./generic.validate.js";

export default class DocumentsValidator {
	static validateDocumentData(data) {
		GenericValidator.validateObjectId(data.id);
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key])
		);
	}
}
