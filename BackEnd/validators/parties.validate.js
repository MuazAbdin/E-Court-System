import GenericValidator from "./generic.validate.js";

export default class PartyValidator {
    static validatePartyData(data) {
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        GenericValidator.validateObjectId(data.lawyer);
        GenericValidator.validateObjectId(data.caseId);
    }
}