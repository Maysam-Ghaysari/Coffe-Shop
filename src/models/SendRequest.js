import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  nameOffice: {
    type: String,
    required: false,
  },
});

const model =
  mongoose.models.SendRequest || mongoose.model("SendRequest", schema);
export default model;
