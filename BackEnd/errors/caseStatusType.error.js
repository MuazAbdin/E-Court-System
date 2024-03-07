import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCaseStatusTypesFoundError = errorGenerator.noDataErrorGenerator("case status types");

export const CaseStatusTypeDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Case status type");

export const InvalidCaseStatusType = errorGenerator.invalidValueErrorGenerator("case status type")

export const CaseStatusTypeAlreadyExistsError = errorGenerator.createErrorClass("Case status type already exists!", StatusCodes.CONFLICT)