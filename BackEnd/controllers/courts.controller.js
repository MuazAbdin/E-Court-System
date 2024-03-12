import { CourtDoesNotExistError } from "../errors/court.error.js";
import errorHandler from "../errors/errorHandler.js";
import Court from "../models/court.model.js";
import CourtValidator from "../validators/courts.validate.js";
import GenericValidator from "../validators/generic.validate.js";

class CourtsController {
	async createCourt(req, res) {
		const { courtName, city, street, phoneNumber, email } = req.body;
		try {
			CourtValidator.validateCourtData({ courtName, city, street, phoneNumber, email });
			const court = await Court.create({ name: courtName, city, street, phoneNumber, email });
			res.json(court);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getCourtById(req, res) {
		const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id);
			const court = await Court.findById(id);
			if(court === null) {
				throw new CourtDoesNotExistError();
			}
			res.json(court);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async updateCourt(req, res) {
		const { id, name, phoneNumber, email } = req.body;
		try {
			GenericValidator.validateObjectId(id);
			CourtValidator.validateCourtData({ name, phoneNumber, email });
			const updatedCourt = await Court.findByIdAndUpdate(id, {$set: { name, phoneNumber, email }}, { new: true });
			if(updatedCourt === null) {
				throw new CourtDoesNotExistError();
			}
			res.json(updatedCourt);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async addJudge(req, res) {
		const { _id, judge } = req.body
	
		try{
			GenericValidator.validateObjectId(_id)
		    GenericValidator.validateObjectId(judge)
			const updatedJudges = await Court.findByIdAndUpdate({_id},{ $push: { judges: judge } }, {new: true} );
			if(updatedJudges === null) {
				throw new CourtDoesNotExistError();
			}
			res.json(updatedJudges);
		} catch (error) {
			errorHandler.handleError(res, error);
		}

	}

	async removeJudge(req, res) {
		const { _id, judge } = req.body
		try{
			GenericValidator.validateObjectId(_id)
		    GenericValidator.validateObjectId(judge)
			const updatedJudges = await Court.findByIdAndUpdate(_id,{ $pull:{ judges:judge } }, {new: true} );
			if(updatedJudges === null) {
				throw new CourtDoesNotExistError();
			}
			res.json(updatedJudges);
		} catch (error) {
			errorHandler.handleError(res, error);
		}
	}
}

const courtsController = new CourtsController();
export default courtsController;
