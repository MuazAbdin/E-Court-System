import { CaseDoesNotExistError, TooManyPartiesProvidedError } from "../errors/case.error.js";
import Case from "../models/case.model.js";
import GenericValidator from "./generic.validate.js";
import StakeholderValidator from "./stakeholders.validate.js";

export default class PartyValidator {
    static async validatePartyData(data) {
        GenericValidator.validateObjectId(data.caseId);
        const case_ = await Case.findById(data.caseId);
        if(case_ === null) {
            throw new CaseDoesNotExistError();
        }
        if(case_.parties.length === 2) {
            throw new TooManyPartiesProvidedError();
        }
        GenericValidator.validateObjectId(data.lawyer);
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        StakeholderValidator.validateStakeholderDataNoPartyId(data.client);      
    }

    static validateCaseCreatePartyData(data) {
        GenericValidator.validateObjectId(data.lawyer);
        PartyValidator.validateFileACasePartyData(data);
    }

    static validateFileACasePartyData(data) {
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        StakeholderValidator.validateStakeholderDataNoPartyId(data.client);      
    }

    static validateUpdatePartyData(data) {
        GenericValidator.validateObjectId(data.partyId);
        GenericValidator.validateObjectId(data.lawyer);
    }
}