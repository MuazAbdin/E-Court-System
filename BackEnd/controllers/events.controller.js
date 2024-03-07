import errorHandler from "../errors/errorHandler.js";
import Event from "../models/event.model.js";
import GenericValidator from "../validators/generic.validate.js";

class EventsController {
	createEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getEventsByCaseId(req, res) {
		const { caseId } = req.params;
		try {
			const events = await Event.find({ case: caseId });
			res.json(events);
		} catch(error) {
			res.sendStatus(500);
		}
	}

	async getEventById(req, res) {
		const { id } = req.params;
		try {
			const event = await Event.findById(id);
			res.json(event);
		} catch(error) {
			res.sendStatus(500);
		}
	}

	updateEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async deleteEvent(req, res) {
		const { eventId } = req.body;
		try {
			GenericValidator.validateObjectId(eventId);
			await Event.softDelete(eventId);
			res.sendStatus(204);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}
}

const eventsController = new EventsController();
export default eventsController;
