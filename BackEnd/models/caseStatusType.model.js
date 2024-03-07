import { model, Schema } from 'mongoose';
import { CaseStatusTypeAlreadyExistsError } from '../errors/caseStatusType.error.js';
import dbUtils from '../utils/db.utils.js';

const caseStatusTypeSchema = new Schema({
    status: { type: String, required: true, unique: true, lowercase: true },
    deleted: { type: Boolean, default: false }
})

caseStatusTypeSchema.statics.getAll = dbUtils.createGetNonDeletedRecordsFunction();

caseStatusTypeSchema.statics.createNew = async function(status) {
    const unDeletedUserType = await dbUtils.undeleteIfExists(this, { status });
    if(unDeletedUserType) {
        return unDeletedUserType;
    }
    else {
        try {
            const newCaseStatusType = await this.create({ status });
            newCaseStatusType.deleted = undefined;
            return newCaseStatusType;
        }
        catch(error) {
            throw new CaseStatusTypeAlreadyExistsError();
        }
    }
}

caseStatusTypeSchema.statics.softDelete = dbUtils.createSoftDeleteFunction();

const CaseStatusType = model("CaseStatusType", caseStatusTypeSchema, "CaseStatusType");

export default CaseStatusType;