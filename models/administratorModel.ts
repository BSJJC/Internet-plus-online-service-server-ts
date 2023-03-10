import mongoose, { Schema, model } from "mongoose";

interface Administrator {
  name: string;
  email: string;
  password: string;
}

const administratorSchema = new Schema<Administrator>({
  name: {
    type: String,
    required: [true, "Pleace add a name"],
  },
  email: {
    type: String,
    required: [true, "Pleace add an emial"],
  },
  password: {
    type: String,
    required: [true, "Pleace add a password"],
  },
});

const administratorModel = model<Administrator>(
  "Administrator",
  administratorSchema
);

export default administratorModel;
