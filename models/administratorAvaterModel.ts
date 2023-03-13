import { Schema, model } from "mongoose";

interface AdministratorAvater {}

const administratorAvaterSchema = new Schema<AdministratorAvater>({
  fileId: String,
});

const administratorAvaterModel = model<AdministratorAvater>(
  "AdministratorAvater",
  administratorAvaterSchema
);

export default administratorAvaterModel;
