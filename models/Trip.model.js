const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const tripSchema = new Schema (
  {
aircraftId: String,
// {type: Schema.Types.ObjectId, ref: "Aircraft"},
startTrip: String,
duration: {
    type: String,
    enum:["30", "60", "90", "120"]
}
  
  },
  {
    timestamps: true
  }
);
module.exports = model ("Trip", tripSchema);