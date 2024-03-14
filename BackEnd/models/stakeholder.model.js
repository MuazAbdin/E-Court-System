import { model, Schema } from 'mongoose';
import { StakeholderDoesNotExistError } from '../errors/stakeholders.error.js';
import dbUtils from '../utils/db.utils.js';
import { DBConfig } from '../config.js';

const stakeholderSchema = new Schema({
    type: { type: String, required: true, enum: DBConfig.STAKEHOLDER_TYPES},
    party: { type: Schema.Types.ObjectId, ref: 'Party', required: true },
    idNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    deleted: { type: Boolean }
})

stakeholderSchema.statics.softDelete = dbUtils.createSoftDeleteFunction(StakeholderDoesNotExistError);

const Stakeholder = model("Stakeholder", stakeholderSchema, "Stakeholder");

export default Stakeholder;