import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String },
  email: { type: String, unique:true },
  mobileNumber: { type: String , unique:true},
  password: { type: String },
  title: { type: String },
  dob: { type: String },
  currentAddress: { type: String },
  livedDuration: { type: Number },
  aboutYou: { type: String },
  employmentStatus: { type: String },
  additionalSavings: { type: Number },
});

const User = model("User", UserSchema);

export default User;
