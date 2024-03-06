import { model, Schema } from 'mongoose';
import dbUtils from '../utils/db.utils.js';
import { UserTypeAlreadyExistsError } from '../errors/userType.error.js';

const userTypeSchema = new Schema({
    userType: { type: String, required: true, unique: true, lowercase: true },
    deleted: { type: Boolean, default: false }
})

userTypeSchema.statics.getAll = dbUtils.createGetNonDeletedRecordsFunction();

userTypeSchema.statics.createNew = async function(userType) {
    const unDeletedUserType = await dbUtils.undeleteIfExists(this, { userType });
    if(unDeletedUserType) {
        return unDeletedUserType;
    }
    else {
        try {
            const newUserType = await this.create({ userType });
            newUserType.deleted = undefined;
            return newUserType;
        }
        catch(error) {
            throw new UserTypeAlreadyExistsError();
        }
    }
}

userTypeSchema.statics.softDelete = dbUtils.createSoftDeleteFunction();

const UserType = model("UserType", userTypeSchema, "UserType");

export default UserType;