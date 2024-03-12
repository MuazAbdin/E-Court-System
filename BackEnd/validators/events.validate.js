import { DBConfig } from "../config.js";
import { InvalidEventTypeError } from "../errors/event.error.js";
import GenericValidator from "./generic.validate.js";

export default class EventValidator {
	static validateEventData(data) {
		GenericValidator.validateObjectId(data.caseId);
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key]));
		GenericValidator.validateDate(data.date);
		if(!DBConfig.EVENT_TYPES.includes(data.eventType)) {
			throw new InvalidEventTypeError();
		}
	}

	static validateUpdateEventData(data) {
		GenericValidator.validateObjectId(data.eventId);
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key]));
		GenericValidator.validateDate(data.date);
	}
}