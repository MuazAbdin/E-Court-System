import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCasesFoundError = errorGenerator.noDataErrorGenerator("cases");

export const CaseDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Case");
