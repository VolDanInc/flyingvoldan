const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const aircraftSchema = new Schema (
  {

    name: String,
    description: String,
    price: Number,
    seats: Number,
  },
  {
    timestamps: true
  }
);
module.exports = model ("Aircraft", aircraftSchema);