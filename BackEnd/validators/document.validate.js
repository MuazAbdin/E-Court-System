import GenericValidator from "./generic.validate.js";

export default class DocumentValidator {
    static validateDocumentData(data) {
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        GenericValidator.validateObjectId(data.caseId);
        GenericValidator.validateObjectId(data.caseId);
    }
}