import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoEventsFoundError = errorGenerator.noDataErrorGenerator("events");

export const EventDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Event");

export const NoEventTypesFoundError = errorGenerator.noDataErrorGenerator("event types");
export const InvalidEventTypeError = errorGenerator.invalidValueErrorGenerator("event type")
