import { model, Schema } from 'mongoose';
import authUtils from '../utils/auth.utils.js';

const userAuthSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    hashedPassword: { type: String, required: true, set: authUtils.hashPassword }
})

const UserAuth = model("UserAuth", userAuthSchema, "UserAuth");

export default UserAuth;