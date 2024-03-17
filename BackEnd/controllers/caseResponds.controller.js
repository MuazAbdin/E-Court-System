import { StatusCodes } from "http-status-codes";
import errorHandler from "../errors/errorHandler.js";
import Case from "../models/case.model";
import CaseRespond from "../models/caseRespond.model";
import GenericValidator from "../validators/generic.validate.js";
import { CaseDoesNotHaveARespondantPartyError, CaseRespondDoesNotExistError, NoCaseRespondsFoundError, RespondantPartyAlreadyHasALawyerError } from "../errors/caseRespond.error.js";
import Party from "../models/party.model.js";
import { PartyDoesNotExistError } from "../errors/party.error.js";
import { CaseDoesNotExistError } from "../errors/case.error.js";

class CaseRespondController {
    async createCaseRespond(req, res) {
        const userId = req.userId;
        const { caseId } = req.body;
        try {
            GenericValidator.validateObjectId(caseId);

            const case_ = await Case.findById(caseId).populate("parties").exec();
            if(case_ === null) {
                throw new CaseDoesNotExistError();
            }
            if(!case_.parties[1]) {
                throw new CaseDoesNotHaveARespondantPartyError();
            }
            if(case_.parties[1].lawyer !== null) {
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
            const caseResponds = await Case.find({}).populate("lawyer case");
            if(caseResponds.length === 0) {
                throw new NoCaseRespondsFoundError();
            }
            res.json(caseResponds);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async reviewCaseRespond(req, res) {
        const { approve, respondId } = req.body;
        try {
            GenericValidator.validateObjectId(respondId);

            if(approve) {
                const caseRespond = await CaseRespond.findById(respondId)
                    .populate({ path: "case", populate: { path: "parties"}}).exec();
                if(caseRespond === null) {
                    throw new CaseRespondDoesNotExistError();
                }
                if(caseRespond.case === null) {
                    throw new CaseDoesNotExistError();
                }
                if(!caseRespond.case.parties[1]) {
                    throw new CaseDoesNotHaveARespondantPartyError();
                }
                if(caseRespond.case.parties[1].lawyer !== null) {
                    throw new RespondantPartyAlreadyHasALawyerError();
                }
    
                const party = await Party.findByIdAndUpdate(caseRespond.parties[1]._id, 
                    { $set: { lawyer: caseRespond.lawyer } });
                if(party === null) {
                    throw new PartyDoesNotExistError();
                }
            }

            await CaseRespond.findByIdAndDelete(respondId);
            res.sendStatus(StatusCodes.NO_CONTENT);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }
}

const caseRespondController = new CaseRespondController();
export default caseRespondController;