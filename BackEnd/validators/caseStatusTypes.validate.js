import GenericValidator from "./generic.validate.js";

export default class CaseStatusTypesValidator {
    static validateUserType(caseStatusType) {
        GenericValidator.validateNotEmpty(caseStatusType);
    }
}