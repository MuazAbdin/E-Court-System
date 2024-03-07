import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoPartiesFoundError = errorGenerator.noDataErrorGenerator("parties");

export const PartyDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Party");
