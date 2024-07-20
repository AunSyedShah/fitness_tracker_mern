import { Schema, model } from "mongoose";

// name, email, profile picture
const userProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profile_picture: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true
    }
});

// export the model
const UserProfile = model('UserProfile', userProfileSchema);
export default UserProfile;