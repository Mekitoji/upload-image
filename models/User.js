import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);
export default User;

