import errorHandler from "../errors/errorHandler.js";
import Case from "../models/case.model.js";
import { InvalidCaseStatusError, NoCasesFoundError } from "../errors/case.error.js";
import CaseValidator from "../validators/case.validate.js";
import GenericValidator from "../validators/generic.validate.js";

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

	updateCase(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async updateCaseStatus(req, res) {	
			const { _id, status } = req.body
		try{
			GenericValidator.validateObjectId(_id);
			CaseValidator.validateCaseData({ status });
			const updatedCaseStatus = await Case.findByIdAndUpdate(_id, {$set: { status }}, { new: true });
			if(updatedCaseStatus === null) {
				throw new CaseDoesNotExistError();
			}
			res.json(updatedCaseStatus);
		} catch(error) {
			if(error instanceof mongoose.Error.ValidationError) {
				if(error.errors.status) {
					return errorHandler.handleError(res, new InvalidCaseStatusError());
				}
			}
			errorHandler.handleError(res, error);
		}
	}
}

const casesController = new CasesController();
export default casesController;
