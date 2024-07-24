import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
    },
    userAuth: {
        type: Schema.Types.ObjectId,
        ref: 'UserAuth',
    },
});

const UserProfile = model('UserProfile', userProfileSchema);

export default UserProfile;
