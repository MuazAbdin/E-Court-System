import GenericValidator from "./generic.validate.js";

export default class CaseStatusTypesValidator {
    static validateCaseStatusType(caseStatusType) {
        GenericValidator.validateNotEmpty(caseStatusType);
    }
}