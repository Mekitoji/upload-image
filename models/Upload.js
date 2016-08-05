import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const UploadSchema = new Schema({
  uploadedAt: Date,
  path: String,
  comment: String,
});

const Upload = mongoose.model('Upload', UploadSchema);
export default Upload;
