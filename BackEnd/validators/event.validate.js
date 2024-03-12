import GenericValidator from "./generic.validate.js";

export default class EventValidator {
    static validateEventData(data) {
        Object.keys(data).forEach(key => 
            GenericValidator.validateNotEmpty(data[key]));
        GenericValidator.validateDate(data.date);
    }
}