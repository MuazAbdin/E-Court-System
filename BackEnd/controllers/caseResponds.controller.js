import { StatusCodes } from "http-status-codes";
import errorHandler from "../errors/errorHandler.js";
import Case from "../models/case.model.js";
import CaseRespond from "../models/caseRespond.model.js";
import GenericValidator from "../validators/generic.validate.js";
import { CaseDoesNotHaveARespondentPartyError, CaseRespondDoesNotExistError, NoCaseRespondsFoundError, RespondentPartyAlreadyHasALawyerError } from "../errors/caseRespond.error.js";
import Party from "../models/party.model.js";
import { PartyDoesNotExistError } from "../errors/party.error.js";
import { CaseDoesNotExistError } from "../errors/case.error.js";

class CaseRespondController {
    async createCaseRespond(req, res) {
        const userId = req.userId;
        const { caseNumber } = req.body;
        try {
            GenericValidator.validateNotEmpty([ caseNumber ]);

            const case_ = await Case.findOne({ caseNumber }).populate("parties").exec();
            if(case_ === null) {
                throw new CaseDoesNotExistError();
            }
            if(!case_.parties[1]) {
                throw new CaseDoesNotHaveARespondentPartyError();
            }
            if(case_.parties[1].lawyer !== null) {
                throw new RespondentPartyAlreadyHasALawyerError();
            }

            await CaseRespond.create({ lawyer: userId, case: case_._id });
            res.sendStatus(StatusCodes.CREATED);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async getAllCaseRespond(req, res) {
        try {
            const caseResponds = await CaseRespond.find({}).populate("lawyer case").exec();
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
        const { approve, caseRespondId } = req.body;
        try {
            GenericValidator.validateObjectId(caseRespondId);
            const caseRespond = await CaseRespond.findById(caseRespondId)
                .populate({ path: "case", populate: { path: "parties"}}).exec();
            if(caseRespond === null) {
                throw new CaseRespondDoesNotExistError();
            }

            if(approve !== "false") {
                if(caseRespond.case === null) {
                    throw new CaseDoesNotExistError();
                }
                if(!caseRespond.case.parties[1]) {
                    throw new CaseDoesNotHaveARespondentPartyError();
                }
                if(caseRespond.case.parties[1].lawyer !== null) {
                    throw new RespondentPartyAlreadyHasALawyerError();
                }
    
                const party = await Party.findByIdAndUpdate(caseRespond.case.parties[1]._id, 
                    { $set: { lawyer: caseRespond.lawyer } });
                if(party === null) {
                    throw new PartyDoesNotExistError();
                }
                await CaseRespond.deleteMany({ case: caseRespond.case._id });
            }
            else {
                await CaseRespond.findByIdAndDelete(caseRespondId);
            }

            res.sendStatus(StatusCodes.NO_CONTENT);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }
}

const caseRespondController = new CaseRespondController();
export default caseRespondController;