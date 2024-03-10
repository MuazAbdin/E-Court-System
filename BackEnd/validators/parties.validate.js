import GenericValidator from "./generic.validate.js";

export default class PartyValidator {
    static validatePartyData(data) {
        GenericValidator.validateObjectId(data.lawyer);
        GenericValidator.validateObjectId(data.caseId);
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        
        
    }
}