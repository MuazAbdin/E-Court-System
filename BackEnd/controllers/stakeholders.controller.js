import errorHandler from "../errors/errorHandler.js";
import { InvalidStakeholderTypeError, NoStakeholdersFoundError, StakeholderDoesNotExistError } from "../errors/stakeholders.error.js";
import Stakeholder from "../models/stakeholder.model.js";
import StakeholderValidator from "../validators/stakeholders.validate.js";
import GenericValidator from "../validators/generic.validate.js";
import mongoose from "mongoose";
import { DBConfig } from "../config.js";
import Party from "../models/party.model.js";


class StakeholdersController {
	
	async createStakeholder(req, res) {
		const { type, partyId, idNumber, firstName, lastName, email, phoneNumber, city, street } = req.body;
		try {
			StakeholderValidator.validateStakeholderData({ partyId, idNumber, firstName, lastName, email, phoneNumber, city, street });
			if(type === DBConfig.STAKEHOLDER_TYPES[0]) {
				throw new InvalidStakeholderTypeError
			}
			const stakeholder = await Stakeholder.create({ type, party: partyId, idNumber, firstName, lastName, email, phoneNumber, city, street });
			await Party.findByIdAndUpdate(partyId, { $push: { stakeholders: stakeholder } });
			res.json(stakeholder);
		}
		catch(error) {
			if(error instanceof mongoose.Error.ValidationError) {
				if(error.errors.type) {
					return errorHandler.handleError(res, new InvalidStakeholderTypeError());
				}
			}
			errorHandler.handleError(res, error);
		}
	}

	async getStakeholderById(req, res) {
		const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id)
			const stakeholder = await Stakeholder.findById(id);
			if(stakeholder === null){
				throw new StakeholderDoesNotExistError()
			}
			res.json(stakeholder);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getStakeholderByPartyId(req, res) {
		const { partyId } = req.params;
		try {
			GenericValidator.validateObjectId(partyId)
			const stakeholders = await Stakeholder.find({ party: partyId });               
			if( stakeholders.length === 0){
				throw new NoStakeholdersFoundError()
			}
			res.json(stakeholders);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	} 

	async updateStakeholder(req, res) {
		const { _id, idNumber, firstName, lastName, email, phoneNumber, city, street } = req.body
		try {
			GenericValidator.validateObjectId(_id);
			StakeholderValidator.validateStakeholderData({ idNumber, firstName, lastName, email, phoneNumber, city, street  });
			const updatedStakeholder = await Stakeholder.findByIdAndUpdate(_id, {$set: { idNumber, firstName, lastName, email, phoneNumber, city, street  }}, { new: true });
			if(updatedStakeholder === null) {
				throw new StakeholderDoesNotExistError();
			}
			res.json(updatedStakeholder);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async deleteStakeholder(req, res) {
		const { stakeholderId } = req.body;
		try {
			GenericValidator.validateObjectId(stakeholderId);
			await Stakeholder.softDelete(stakeholderId);
			res.sendStatus(204);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const stakeholdersController = new StakeholdersController();
export default stakeholdersController;
