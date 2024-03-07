import { StatusCodes } from "http-status-codes";
import errorHandler from "../errors/errorHandler.js";
import { EventTypeDoesNotExistError, NoEventTypesFoundError } from "../errors/eventType.error.js";
import EventType from "../models/eventType.model.js";
import EventTypesValidator from "../validators/eventTypes.validate.js";

class EventTypesController {
	async createEventType(req, res) {
        const { eventType } = req.body;
        try {
            EventTypesValidator.validateEventType(eventType);
            const newEventType = await EventType.createNew(eventType);
            res.send(newEventType);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
	}

	async getAllEventType(req, res) {
        try {
            const eventTypes = await EventType.getAll();
            if(eventTypes.length === 0) {
                throw new NoEventTypesFoundError();
            }
            res.send(eventTypes);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
	}

	async updateEventType(req, res) {
        const { id, eventType } = req.body;
        try {
            const updatedEventType = await EventType.findByIdAndUpdate(id, { eventType }, { new: true});
            if(updatedEventType === null) {
                throw new EventTypeDoesNotExistError();
            }
            updatedEventType.deleted = undefined;
            res.send(updatedEventType);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
	}

	async deleteEventType(req, res) {
        const { id } = req.body;
        try {
            const updatedEventType = EventType.softDelete(id);
            if(updatedEventType === null) {
                throw new EventTypeDoesNotExistError();
            }
            res.sendStatus(StatusCodes.NO_CONTENT);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
	}
}

const eventTypesController = new EventTypesController();
export default eventTypesController;
