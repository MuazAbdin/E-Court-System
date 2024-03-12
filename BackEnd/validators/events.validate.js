import GenericValidator from "./generic.validate.js";

export default class EventValidator {
	static validateEventData(data) {
		GenericValidator.validateObjectId(data.eventId);
		Object.keys(data).forEach((key) =>
			GenericValidator.validateNotEmpty(data[key]));
		// TODO add date validation
	}
}