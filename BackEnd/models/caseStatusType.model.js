import { model, Schema } from 'mongoose';

const caseStatusTypeSchema = new Schema({
    status: { type: String, required: true, unique: true, lowercase: true }
})

const CaseStatusType = model("CaseStatusType", caseStatusTypeSchema, "CaseStatusType");

export default CaseStatusType;