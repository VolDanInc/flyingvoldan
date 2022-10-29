const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const aircraftSchema = new Schema (
  {
    img: String,
    name: String,
    description: String,
    price: Number,
    seats: Number,
    timetable: []
  },
  {
    timestamps: true
  }
);
module.exports = model ("Aircraft", aircraftSchema);