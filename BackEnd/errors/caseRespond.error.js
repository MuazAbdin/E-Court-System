import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCaseRespondsFoundError = errorGenerator.noDataErrorGenerator("case respondent lawyer requests");

export const CaseRespondDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("case respondaet lawyer request");

export const CaseDoesNotHaveARespondentPartyError = errorGenerator.createErrorClass("Case does not have a respondent party!", StatusCodes.NOT_FOUND);

export const RespondentPartyAlreadyHasALawyerError = errorGenerator.createErrorClass("Respondent party already has a lawyer!", StatusCodes.CONFLICT);
