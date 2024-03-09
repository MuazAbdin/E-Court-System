import errorHandler from "../errors/errorHandler.js";
import DocumentsValidator from "../validators/documents.validate.js";

class DocumentsController {
	createDocument(req, res) {}

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

	async updateDocumentTitle(req, res) {
		const { _id, title } = req.body
		try {
			GenericValidator.validateObjectId(_id);
			DocumentsValidator.validateDocumentData({ title });
			const updatedDocument = await Stakeholder.findByIdAndUpdate(_id, {$set: { title }});
			if(updatedDocument === null) {
				throw new StakeholderDoesNotExistError();
			}
			res.json("document updated successfully");
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const documentsController = new DocumentsController();
export default documentsController;
