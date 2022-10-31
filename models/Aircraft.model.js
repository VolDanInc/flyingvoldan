const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const aircraftSchema = new Schema (
  {
    name: String,
    img: String,
    description: String,
    price: Number,
    seats: Number,
    timetable: [],
    isBusy: []
  },
  {
    timestamps: true
  }
);
module.exports = model ("Aircraft", aircraftSchema);