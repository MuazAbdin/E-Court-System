import errorHandler from "../errors/errorHandler.js";
import { NoStakeholdersFoundError, StakeholderDoesNotExistError } from "../errors/stakeholders.error.js";
import Stakeholder from "../models/stakeholder.model.js";
import GenericValidator from "../validators/generic.validate.js";
import StackholderValidator from "../validators/stackholder.validate.js";

class StakeholdersController {
	createStakeholder(req, res) {
		res.status(404).send("Work In Progress!");
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
