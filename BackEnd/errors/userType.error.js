import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoUserTypesFoundError = errorGenerator.noDataErrorGenerator("user types");

export const UserTypeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("User type");
