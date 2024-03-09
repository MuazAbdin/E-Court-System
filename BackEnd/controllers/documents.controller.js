import DocumentValidator from "../validators/document.validate";

class DocumentsController {
	createDocument(req, res) {
		const { caseId, title, uploadedBy } = req.body;
		try {
			DocumentValidator.validateDocumentData({ caseId, title, uploadedBy })
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	getDocumentById(req, res) {
		res.status(404).send("Work In Progress!");
	}

	getDocumentByPartyId(req, res) {
		res.status(404).send("Work In Progress!");
	}

	getDocumentByCaseId(req, res) {
		res.status(404).send("Work In Progress!");
	}

	getDocumentByUserId(req, res) {
		res.status(404).send("Work In Progress!");
	}

	updateDocumentTitle(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const documentsController = new DocumentsController();
export default documentsController;
