import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCaseStatusTypesFoundError = errorGenerator.noDataErrorGenerator("case status types");

export const CaseStatusTypeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Case status type");

export const InvalidCaseStatusType = errorGenerator.invalidValueErrorGenerator("case status type")
