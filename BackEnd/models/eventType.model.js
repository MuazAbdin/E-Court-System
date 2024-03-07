import { model, Schema } from 'mongoose';
import { EventTypeAlreadyExistsError, EventTypeDoesNotExistError } from '../errors/eventType.error.js';
import dbUtils from '../utils/db.utils.js';

const eventTypeSchema = new Schema({
    eventType: { type: String, required: true, unique: true, lowercase: true },
    deleted: { type: Boolean, default: false }
})

eventTypeSchema.statics.getAll = dbUtils.createGetNonDeletedRecordsFunction();

eventTypeSchema.statics.createNew = async function(eventType) {
    const unDeletedEventType = await dbUtils.undeleteIfExists(this, { eventType });
    if(unDeletedEventType) {
        return unDeletedEventType;
    }
    else {
        try {
            const newEventType = await this.create({ eventType });
            newEventType.deleted = undefined;
            return newEventType;
        }
        catch(error) {
            throw new EventTypeAlreadyExistsError();
        }
    }
}

eventTypeSchema.statics.softDelete = dbUtils.createSoftDeleteFunction();

const EventType = model("EventType", eventTypeSchema, "EventType");

export default EventType;