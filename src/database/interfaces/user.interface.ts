import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface UserInterface extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly name: string;
  readonly email: string;
}
