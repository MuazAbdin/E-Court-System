import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { DBConfig } from '../config.js'

const caseSchema = new Schema({
    caseNumber: { type: Number, required: true, unique: true, default: getCaseNumber },
    status: { type: String, required: true, enum: DBConfig.CASE_STATUS_TYPES },
    title: { type: String, required: true },
    description: { type: String, required: true },
    court: { type: Schema.Types.ObjectId, ref: "Court", required: true },
    judge: { type: Schema.Types.ObjectId, ref: "User" },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
        default: []
     },
    parties: {
        type: [{ type: Schema.Types.ObjectId, ref: "Party" }],
        default: []
     }
}, { timestamps: true })

caseSchema.statics.caseNumberCounter = 1;
caseSchema.statics.query = function(query) {
    if(query) {
        return Case.find({
        $or: [
                { caseNumber: { $regex: query, $options: "i"} },
                { title: { $regex: query, $options: "i"} },
              ],
        })
    }
    else {
        return Case.find({});
    }
}

const Case = model("Case", caseSchema, "Case");
dbUtils.setFieldCounter(Case, "caseNumber", "caseNumberCounter", 1);

function getCaseNumber() {
    return dbUtils.getCounterAndIncrement(Case, "caseNumberCounter") + "";
}

export default Case;