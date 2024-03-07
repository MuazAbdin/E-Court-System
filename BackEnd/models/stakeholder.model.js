import { model, Schema } from 'mongoose';
import { StakeholderDoesNotExistError } from '../errors/stakeholders.error.js';
import dbUtils from '../utils/db.utils.js';

const stakeholderSchema = new Schema({
    party: { type: Schema.Types.ObjectId, ref: 'Party', required: true },
    idNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true }
})

stakeholderSchema.statics.softDelete = dbUtils.createSoftDeleteFunction(StakeholderDoesNotExistError);

const Stakeholder = model("Stakeholder", stakeholderSchema, "Stakeholder");

export default Stakeholder;