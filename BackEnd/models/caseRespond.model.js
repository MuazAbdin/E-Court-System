import mongoose, { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { DBConfig } from '../config.js'

const caseRespondSchema = new Schema({
    lawyer: { type: mongoose.Types.ObjectId, ref: "User" },
    case: { type: mongoose.Types.ObjectId, ref: "Case" },
})

const CaseRespond = model("CaseRespond", caseRespondSchema, "CaseRespond");
export default CaseRespond;