import GenericValidator from "./generic.validate.js";

export default class EventTypesValidator {
    static validateEventType(eventType) {
        GenericValidator.validateNotEmpty(eventType);
    }
}