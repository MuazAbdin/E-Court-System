import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { dbConfig } from '../config.js'

const caseSchema = new Schema({
    caseNumber: { type: Number, required: true, unique: true, default: getCaseNumber },
    status: { type: String, required: true, enum: dbConfig.CASE_STATUS_TYPES },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: Schema.Types.ObjectId, ref: "Court", required: true },
    judges: { 
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    creationDate: { type: Date, required: true, default: Date.now },
    lastUpdateDate: { type: Date, required: true, default: null },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
        default: []
     },
    parties: {
        type: [{ type: Schema.Types.ObjectId, ref: "Party" }],
        default: []
     }
})

caseSchema.statics.caseNumberCounter = 1;

const Case = model("Case", caseSchema, "Case");
dbUtils.setFieldCounter(Case, "caseNumber", "caseNumberCounter", 1);

function getCaseNumber() {
    return dbUtils.getCounterAndIncrement(Case, "caseNumberCounter");
}

export default Case;