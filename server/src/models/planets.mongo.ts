import mongoose, { model, Schema, Model, Document } from "mongoose";

interface planetTypes extends Document {
  name: string;
}

const planetSchema: Schema = new mongoose.Schema({
  keplerName: { type: String, required: true },
});
