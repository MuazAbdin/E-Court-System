import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCasesFoundError = errorGenerator.noDataErrorGenerator("cases");

export const CaseDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("Case");

export const NoCaseStatusFoundError = errorGenerator.noDataErrorGenerator("Case status");
export const InvalidCaseStatusError = errorGenerator.invalidValueErrorGenerator("Case status");

export const NoPartiesProvidedError = errorGenerator.createErrorClass("There need to be at least one party in a case!", StatusCodes.BAD_REQUEST);
export const TooManyPartiesProvidedError = errorGenerator.createErrorClass("There can only be two parties in a case!", StatusCodes.BAD_REQUEST);
export const PartiesMustBeAnArrayError = errorGenerator.createErrorClass("Parties must be an array!", StatusCodes.BAD_REQUEST)
