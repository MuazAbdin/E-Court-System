import errorHandler from "../errors/errorHandler.js";
import { EventDoesNotExistError, NoEventsFoundError } from "../errors/event.error.js";
import Event from "../models/event.model.js";

class EventsController {
	createEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}

	async getEventsByCaseId(req, res) {
		const { caseId } = req.params;
		try {
			const events = await Event.find({ case: caseId });
			if(events === null){
				throw new NoEventsFoundError()
			}
			res.json(events);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	async getEventById(req, res) {
		const { id } = req.params;
		try {
			const event = await Event.findById(id);
			if( event === null){
				throw new EventDoesNotExistError()
			}
			res.json(event);
		} catch(error) {
			return errorHandler.handleError(res, error)
		}
	}

	updateEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}

	deleteEvent(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const eventsController = new EventsController();
export default eventsController;
