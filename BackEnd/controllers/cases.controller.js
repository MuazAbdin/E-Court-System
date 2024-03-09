import CaseValidator from "../validators/cases.validate.js";

class CasesController {
	createCase(req, res) {
		const { courtName, city, street, phoneNumber, email } = req.body;
		try {
			CaseValidator.validateCaseData({ courtName, city, street, phoneNumber, email });
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	getCases(req, res) {
		res.status(404).send("Work In Progress!");
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
