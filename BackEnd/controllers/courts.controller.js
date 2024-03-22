import { CourtDoesNotExistError, NoCourtsFoundError } from "../errors/court.error.js";
import errorHandler from "../errors/errorHandler.js";
import Court from "../models/court.model.js";
import CourtValidator from "../validators/courts.validate.js";
import GenericValidator from "../validators/generic.validate.js";

class CourtsController {
	async createCourt(req, res) {
		const { courtName, city, street, mobile: phoneNumber, email, judges } = req.body;
		try {
			CourtValidator.validateCourtData({ courtName, city, street, phoneNumber, email });
			if(Array.isArray(judges)) {
				for(const judge of judges) {
					GenericValidator.validateObjectId(judge);
				}
			}

			const court = await Court.create({ name: courtName, city, street, phoneNumber, email,
				judges: Array.isArray(judges) ? judges : [] });
			res.json(court);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async getAllCourts(req, res) {
		try {
			const courts = await Court.getAllCourtsWithJudgeName();
			if(courts.length === 0) {
				throw new NoCourtsFoundError();
			}
			res.json(courts);
		}
		catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getCourtById(req, res) {
		const { id } = req.params;
		try {
			GenericValidator.validateObjectId(id);
			const court = await Court.getCourtByIdWithJudgeName(id);
			if(court === null) {
				throw new CourtDoesNotExistError();
			}
			res.json(court);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async updateCourt(req, res) {
		const { id, courtName: name, mobile: phoneNumber, email, city, street } = req.body;
		try {
			GenericValidator.validateObjectId(id);
			CourtValidator.validateCourtData({ name, phoneNumber, email, city, street });
			const updatedCourt = await Court.findByIdAndUpdate(id, {$set: { name, phoneNumber, email, city, street }}, { new: true });
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
		try {
			GenericValidator.validateObjectId(_id)
		    GenericValidator.validateObjectId(judge)
			const updatedJudges = await Court.findByIdAndUpdate(_id, { $push: { judges: judge } }, {new: true} );
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
			const updatedJudges = await Court.findByIdAndUpdate(_id, { $pull:{ judges:judge } }, {new: true} );
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
