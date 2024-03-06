import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoEvebtsFoundError = errorGenerator.noDataErrorGenerator("events");

export const EventDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Event");
