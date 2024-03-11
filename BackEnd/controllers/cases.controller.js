import errorHandler from "../errors/errorHandler.js";
import Case from "../models/case.model.js";
import { CaseDoesNotExistError, InvalidCaseStatusError, NoCasesFoundError } from "../errors/case.error.js";
import GenericValidator from "../validators/generic.validate.js";
import CaseValidator from "../validators/case.validate.js";

class CasesController {
	createCase(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getCases(req, res) {
		const { query } = req.query;
		try {
			const cases = await Case.query(query);
			if(cases.length === 0) {
				throw new NoCasesFoundError();
			}
			res.json(cases);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
	}


	getCaseById(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async updateCase(req, res) {
		const { caseId, title, description, status, court, judge } = req.body
		try{
			GenericValidator.validateObjectId(caseId);
			CaseValidator.validateCaseData({ title, description, status, court, judge });
			const updatedCase = await Case.findByIdAndUpdate(caseId, {$set: { title, description, status, court, judge }}, { new: true });
			if(updatedCase === null) {
				throw new CaseDoesNotExistError();
			}
			res.json(updatedCase);
		} catch(error) {
			if(error instanceof mongoose.Error.ValidationError) {
				if(error.errors.status) {
					return errorHandler.handleError(res, new InvalidCaseStatusError());
				}
			}
			errorHandler.handleError(res, error);
		}
	}

	updateCaseStatus(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const casesController = new CasesController();
export default casesController;
