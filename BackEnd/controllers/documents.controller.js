import Document from "../models/document.model.js"
import { DocumentDoesNotExistError, NoDocumentFileWasUploadedError, NoDocumentsFoundError } from "../errors/document.error.js";
import errorHandler from "../errors/errorHandler.js";
import DocumentsValidator from "../validators/documents.validate.js";
import GenericValidator from "../validators/generic.validate.js";
import firebaseFilesManager from "../services/firebase.service.js";
import stream from 'stream';
import Party from "../models/party.model.js";
import { PartyDoesNotExistError } from "../errors/party.error.js";
import { decode } from "base64-arraybuffer";

class DocumentsController {
    async createDocument(req, res) {
		const { caseId, title, law, subject, requirement, honoringParty, fileData } = req.body
		const uploadedBy = req.userId;
		try {
			DocumentsValidator.validateDocumentData({ caseId, title, uploadedBy, law, subject, requirement, honoringParty });
			if (!fileData) {
				throw new NoDocumentFileWasUploadedError();
			}

			fileData.buffer = decode(fileData.buffer);

			const party = await Party.findOne({ lawyer: uploadedBy, case: caseId });
			if(party === null) {
				throw new PartyDoesNotExistError();
			}

			const file = {
				type: fileData.mimetype,
				buffer: fileData.buffer
			}
			const fileName = fileData.originalname;
			const fileLocation = await firebaseFilesManager.uploadFile(file);
			
			const document = await Document.create({ case: caseId, party: party._id, title, uploadedBy , fileLocation, fileName, law, subject, requirement, honoringParty });
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
			const documents = await Document.find({ case: id }).populate("party").exec();               
			if( documents.length === 0){
				// throw new NoDocumentsFoundError()
				return res.json([])
			}
			res.json(documents);
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

	async downloadDocument(req, res) {
		const { documentId } = req.params;
		try {
			const document = await Document.findById(documentId);
			if(document === null) {
				throw new DocumentDoesNotExistError();
			}
			const fileContents = await firebaseFilesManager.downloadFile(document.fileLocation);

			const readStream = new stream.PassThrough();
			readStream.end(fileContents);

			res.set('Content-disposition', 'attachment; filename=' + document.fileName);
			readStream.pipe(res);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const documentsController = new DocumentsController();
export default documentsController;
