const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripSchema = new Schema(
  {
    aircraftId: { type: Schema.Types.ObjectId, ref: "Aircraft" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    startTrip: String,
    startTripNum: Number,
    review: String,
    reviewStars: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      default: "5"
    },
    duration: {
      type: String,
      enum: ["30", "60", "90", "120"]
    },
    peoplesNum: Number,
    tripScore: Number,
    tripStatus: String
  },
  {
    timestamps: true
  }
);
module.exports = model("Trip", tripSchema);