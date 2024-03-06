import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoUsersFoundError = errorGenerator.noDataErrorGenerator("users");

export const UserDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("User");
