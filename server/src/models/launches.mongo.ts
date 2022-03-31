// to create the schema

import mongoose, { model, Schema, Model, Document } from "mongoose";
// where the schema will be stored

interface launchesTypes extends Document {
  flightNumber: string;
  launchDate: Date;
  mission: string;
  rocket: string;
  target: string;
  customers: string[];
  upcoming: Boolean;
  sucess: Boolean;
}

const launchesSchema: Schema = new mongoose.Schema({
  flightNumber: { type: Date, required: true },
  launchDate: { type: String, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String, required: true },
  customers: [String],
  upcoming: { type: Boolean, required: true },
  sucess: { type: Boolean, default:true, required: true },
});


export default mongoose.model('launch', launchesSchema )