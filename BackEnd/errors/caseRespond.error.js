import { StatusCodes } from "http-status-codes";
import errorGenerator from "../utils/errorGenerator.utils.js";

export const NoCaseRespondsFoundError = errorGenerator.noDataErrorGenerator("case respondant lawyer requests");

export const CaseRespondDoesNotExistError = errorGenerator.itemDoesNotExistErrorGenerator("case respondant lawyer request");

export const CaseDoesNotHaveARespondantPartyError = errorGenerator.createErrorClass("Case does not have a respondant party!", StatusCodes.NOT_FOUND);

export const RespondantPartyAlreadyHasALawyerError = errorGenerator.createErrorClass("Respondant party already has a lawyer!");
