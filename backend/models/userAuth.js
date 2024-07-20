import { Schema, model } from "mongoose";

// username and password, required true, username unique, trim true
const userAuthSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// export the model
const UserAuth = model('UserAuth', userAuthSchema);
export default UserAuth; 