import { model, Schema } from 'mongoose';

const userAuthSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    hashedPassword: { type: String, required: true }
})

const UserAuth = model("UserAuth", userAuthSchema, "UserAuth");

export default UserAuth;