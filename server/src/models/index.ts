import mongoose, { ConnectionOptions } from 'mongoose';
import { MONGODB_URI } from '../services/secrets';
// import { dataGeneration } from '../mocks/data';
import User from './User';
import Storage from './Storage';
import Food from './Food';

export * from './User';
export * from './Storage';
export * from './Food';

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGODB_URI ?? '', options)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('MongoDB connection error. ' + err));

export default {
  User,
  Storage,
  Food,
};
