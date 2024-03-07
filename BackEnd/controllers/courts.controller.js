import { CourtDoesNotExistError } from "../errors/court.error.js";
import errorHandler from "../errors/errorHandler.js";
import Court from "../models/court.model.js";
import CourtValidator from "../validators/courts.validate.js";

class CourtsController {
	async createCourt(req, res) {
		const { courtName, city, street, phoneNumber, email } = req.body;
		try {
			CourtValidator.validateCourtData(req.body);
			const court = await Court.create({ name: courtName, city, street, phoneNumber, email });
			res.json(court);
		}
		catch(error) {
			errorHandler.handleError(error);
		}
	}

	async getCourtById(req, res) {
		const { id } = req.params;
		try {
			const court = await Court.findById(id);
			res.json(court);
		} catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	async updateCourt(req, res) {
		const { id, name, phoneNumber, email } = req.body;
		try {
			CourtValidator.validateCourtData(req.body);
			const updatedCourt = await Court.findByIdAndUpdate(id, {$set: { name, phoneNumber, email }});
			if(this.updateCourt === null) {
				throw new CourtDoesNotExistError();
			}
			res.json(updatedCourt);
		}
		catch(error) {
			errorHandler.handleError(error);
		}
	}
}

const courtsController = new CourtsController();
export default courtsController;
