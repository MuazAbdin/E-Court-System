import Document from "../models/document.model.js"
import { DocumentDoesNotExistError, NoDocumentFileWasUploadedError, NoDocumentsFoundError } from "../errors/document.error.js";
import errorHandler from "../errors/errorHandler.js";
import DocumentsValidator from "../validators/documents.validate.js";
import GenericValidator from "../validators/generic.validate.js";
import firebaseFilesManager from "../services/firebase.service.js";

class DocumentsController {
    async createDocument(req, res) {
		const { caseId, partyId, title, uploadedBy, law, subject, requirement, honoringParty } = req.body
		try {
			if(!req.file) {
				throw new NoDocumentFileWasUploadedError();
			}
			const file = {
				type: req.file.mimetype,
				buffer: req.file.buffer
			}
			const fileName = req.file.originalname;
			const fileLocation = await firebaseFilesManager.uploadFile(file);

			DocumentsValidator.validateDocumentData({ caseId, partyId, title, uploadedBy, law, subject, requirement, honoringParty });
			const document = await Document.create({ case: caseId, party: partyId, title, uploadedBy , fileLocation, fileName, law, subject, requirement, honoringParty });
			res.json(document);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getDocumentById(req, res) {
		const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id);
			const document = await Document.findById(id);
			if(document === null) {
				throw new DocumentDoesNotExistError();
			}
			res.json(document);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getDocumentByPartyId(req, res) {
			const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id)
			const document = await Document.find({ party: id });               
			if( document.length === 0){
				throw new NoDocumentsFoundError()
			}
			res.json(document);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getDocumentByCaseId(req, res) {
		const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id)
			const document = await Document.find({ case: id });               
			if( document.length === 0){
				throw new NoDocumentsFoundError()
			}
			res.json(document);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getDocumentByUserId(req, res) {
			const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id)
			const document = await Document.find({ uploadedBy: id });               
			if( document.length === 0){
				throw new NoDocumentsFoundError()
			}
			res.json(document);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async updateDocumentTitle(req, res) {
		const { id, title } = req.body;
		try {
			DocumentsValidator.validateUpdateDocumentData({ id, title });
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
