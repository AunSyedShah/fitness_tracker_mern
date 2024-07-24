import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userAuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userProfile: {
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
});

const UserAuth = model('UserAuth', userAuthSchema);

export default UserAuth;
