import mongoose from 'mongoose';
import { db, uri } from '../config';

mongoose.connect(uri);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error);
mongoose.connection.on('open', () => console.log(`Connected to ${db}!`));
