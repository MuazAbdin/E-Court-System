import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    idNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, required: true,  enum: dbConfig.USER_TYPES },
       
    email: { type: String, required: true, unique: true, lowercase: true},
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true } ,
    street: { type: String, required: true },
    licenseNumber: { type: String, default: null },
    documents: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
        default: []
    }
})

const User = model("User", userSchema, "User");

export default User;