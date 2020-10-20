import mongoose, { Document, Types, Schema } from 'mongoose';

export interface StorageModel extends Document {
  id: string;
  user: Types.ObjectId;
  name: string;
}

const storageSchema = new Schema<StorageModel>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Storage = mongoose.model<StorageModel>('Storage', storageSchema);

export default Storage;
