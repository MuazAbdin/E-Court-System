import { model, Schema } from 'mongoose';

const eventTypeSchema = new Schema({
    eventType: { type: String, required: true, unique: true, lowercase: true }
})

const EventType = model("EventType", eventTypeSchema, "EventType");

export default EventType;