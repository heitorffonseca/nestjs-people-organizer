import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
});

export { UserSchema };
