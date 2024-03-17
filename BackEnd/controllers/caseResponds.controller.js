import { StatusCodes } from "http-status-codes";
import errorHandler from "../errors/errorHandler.js";
import Case from "../models/case.model";
import CaseRespond from "../models/caseRespond.model";
import GenericValidator from "../validators/generic.validate.js";
import { CaseDoesNotHaveARespondantPartyError, RespondantPartyAlreadyHasALawyerError } from "../errors/caseRespond.error.js";

class CaseRespondController {
    async createCaseRespond(req, res) {
        const userId = req.userId;
        const { caseId } = req.body;
        try {
            GenericValidator.validateObjectId(caseId);

            // make sure the case doesn't have a caseRespondant Lawyer
            const case_ = Case.findById(caseId).populate("parties");
            if(!parties[1]) {
                throw new CaseDoesNotHaveARespondantPartyError();
            }
            if(parties[1].lawyer !== null) {
                throw new RespondantPartyAlreadyHasALawyerError();
            }

            await CaseRespond.create({ lawyer: userId, case: caseId });
            res.sendStatus(StatusCodes.CREATED);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async getAllCaseRespond(req, res) {
        try {

        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async reviewCaseRespond(req, res) {
        try {

        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }
}

const caseRespondController = new CaseRespondController();
export default caseRespondController;