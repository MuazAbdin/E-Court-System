import { model, Schema } from 'mongoose';

const userTypeSchema = new Schema({
    userType: { type: String, required: true, unique: true, lowercase: true }
})

const UserType = model("UserType", userTypeSchema, "UserType");

export default UserType;