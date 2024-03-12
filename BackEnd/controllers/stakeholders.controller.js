import errorHandler from "../errors/errorHandler.js";
import { NoStakeholdersFoundError, StakeholderDoesNotExistError } from "../errors/stakeholders.error.js";
import Stakeholder from "../models/stakeholder.model.js";
import StackholderValidator from "../validators/stackholders.validate.js";
import GenericValidator from "../validators/generic.validate.js";


class StakeholdersController {
	
	async createStakeholder(req, res) {
		    const { partyId, idNumber, firstName, lastName, email, phone: phoneNumber, city, street } = req.body;
		try {
			GenericValidator.validateObjectId(partyId);
			StackholderValidator.validateStackholderData({ partyId, idNumber, firstName, lastName, email, phoneNumber, city, street });
			const stackholder = await Stakeholder.create({ partyId, idNumber, firstName, lastName, email, phoneNumber, city, street });
			res.json(stackholder);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getStakeholderById(req, res) {
		const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id)
			const stackholdler = await Stakeholder.findById(id);
			if(stackholdler === null){
				throw new StakeholderDoesNotExistError()
			}
			res.json(stackholdler);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getStakeholderByPartyId(req, res) {
		const { partyId } = req.params;
		try {
			GenericValidator.validateObjectId(partyId)
			const stackholdlers = await Stakeholder.find({ party: partyId });               
			if( stackholdlers.length === 0){
				throw new NoStakeholdersFoundError()
			}
			res.json(stackholdlers);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	} 

	async updateStakeholder(req, res) {
		const { _id, idNumber, firstName, lastName, email, phoneNumber, city, street } = req.body
		try {
			GenericValidator.validateObjectId(_id);
			StackholderValidator.validateStackholderData({ idNumber, firstName, lastName, email, phoneNumber, city, street  });
			const updatedStackholder = await Stakeholder.findByIdAndUpdate(_id, {$set: { idNumber, firstName, lastName, email, phoneNumber, city, street  }}, { new: true });
			if(updatedStackholder === null) {
				throw new StakeholderDoesNotExistError();
			}
			res.json(updatedStackholder);
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
