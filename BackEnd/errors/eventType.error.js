import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoEventTypesFoundError = errorGenerator.noDataErrorGenerator("event types");

export const EventTypeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Event type");

export const InvalidEventType = errorGenerator.invalidValueErrorGenerator("event type")
