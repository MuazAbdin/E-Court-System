import { NoPartiesProvidedError, TooManyPartiesProvidedError } from "../errors/case.error.js";
import GenericValidator from "./generic.validate.js";

export default class CaseValidator {
    static validateCaseData(data) {
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
}