class CasesController {
	createCase(req, res) {
		res.status(404).send("Work In Progress!");
	}

	getCases(req, res) {
		res.status(404).send("Work In Progress!");
	}
	async getCaseById(req, res) {
        const { id } = req.params;
        try {
            const case_ = Case.findById(id);
			if(!case_) {
				throw new CaseDoesNotExistError();
			}
            res.json(case_);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }
	// getCaseById(req, res) {
	// 	res.status(404).send("Work In Progress!");
	// }

	updateCase(req, res) {
		res.status(404).send("Work In Progress!");
	}

	updateCaseStatus(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const casesController = new CasesController();
export default casesController;
