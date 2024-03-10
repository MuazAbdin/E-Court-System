import Document from "../models/document.model.js"
import { DocumentDoesNotExistError, NoDocumentsFoundError } from "../errors/document.error.js";
import errorHandler from "../errors/errorHandler.js";
import DocumentsValidator from "../validators/documents.validate.js";
import GenericValidator from "../validators/generic.validate.js";

class DocumentsController {
	createDocument(req, res) {}

	getDocumentById(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getDocumentByPartyId(req, res) {
			const { partyId } = req.params;
		try {
			GenericValidator.validateObjectId(partyId)
			const document = await Document.find({ party: partyId });               
			if( document.length === 0){
				throw new NoDocumentsFoundError()
			}
			res.json(document);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	getDocumentByCaseId(req, res) {
		res.status(404).send("Work In Progress!");
	}

	getDocumentByUserId(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async updateDocumentTitle(req, res) {
		const { id, title } = req.body;
		try {
			DocumentsValidator.validateDocumentData({ id, title });
			const updatedDocument = await Document.findByIdAndUpdate(id, {$set: { title }});
			if(updatedDocument === null) {
				throw new DocumentDoesNotExistError();
			}
			res.json(updatedDocument);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const documentsController = new DocumentsController();
export default documentsController;
