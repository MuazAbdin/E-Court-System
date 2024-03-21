import { DBConfig } from "../config.js";
import { InvalidCaseStatusError, NoPartiesProvidedError, PartiesMustBeAnArrayError, TooManyPartiesProvidedError } from "../errors/case.error.js";
import GenericValidator from "./generic.validate.js";

export default class CaseValidator {
    static validateCaseData(data) {
        if(!DBConfig.CASE_STATUS_TYPES.includes(data.status)) {
            throw new InvalidCaseStatusError();
        }
        if(!Array.isArray(data.parties)) {
            throw new PartiesMustBeAnArrayError();
        };
        if(data.parties.length === 0) {
            throw new NoPartiesProvidedError();
        }
        else if(data.parties.length > 2) {
            throw new TooManyPartiesProvidedError();
        }
        GenericValidator.validateObjectId(data.judge);
        GenericValidator.validateObjectId(data.court);
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
    }

    static validateFilaACaseData(data) {
        if(!Array.isArray(data.parties)) {
            throw new PartiesMustBeAnArrayError();
        };
        if(data.parties.length === 0) {
            throw new NoPartiesProvidedError();
        }
        else if(data.parties.length > 2) {
            throw new TooManyPartiesProvidedError();
        }
        GenericValidator.validateObjectId(data.court);
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
    }

    static validateResolvePendingCaseData(data) {
        GenericValidator.validateObjectId(data.caseId);
        GenericValidator.validateObjectId(data.judge);
        if(!DBConfig.CASE_STATUS_TYPES.includes(data.status)) {
            throw new InvalidCaseStatusError();
        }
    }

    static validateUpdateCaseData(data) {
        GenericValidator.validateObjectId(data.caseId);
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
    }

    static validateUpdateCaseStatusData(data) {
        GenericValidator.validateObjectId(data._id);
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        if(!DBConfig.CASE_STATUS_TYPES.includes(data.status)) {
            throw new InvalidCaseStatusError();
        }
    }
}