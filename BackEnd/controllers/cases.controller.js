import { InvalidCaseStatusError, NoCasesFoundError } from "../errors/case.error.js";
import errorHandler from "../errors/errorHandler.js";
import CaseValidator from "../validators/cases.validate.js";
import Case from "../models/case.model.js";

class CasesController {
	createCase(req, res) {
		const { title, description, status, court, judge, parties } = req.body;
		try {
			CaseValidator.validateCaseData({ title, description, status, court, judge, parties });

			// create case
			const newCase = Case.create(title, description, status, court, judge);
			// create parties
			const newParties = [];
			for(const party of parties) {
				// validate party
			}
			// add parties to case & create case
			newCase.parties = parties;
			newCase.save();
			// create parties
			for(const party of newParties) {
				party.save();
			}

			res.json(newCase);
		}
		catch(error) {
			if(error instanceof mongoose.Error.ValidationError) {
				if(error.errors.status) {
					return errorHandler.handleError(res, new InvalidCaseStatusError());
				}
			}
			errorHandler.handleError(res, error);
		}
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

	updateCaseStatus(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const casesController = new CasesController();
export default casesController;
