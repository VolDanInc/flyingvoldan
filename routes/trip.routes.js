const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip.model");

//READ: list of all the trips

router.get("/trips", (req, res, next)=> {
    Trip.find()
    .populate("aircraft")
    .then(tripsFromDb => {
        // const {aircraftId, startTrip, duration} = 
        res.status(201).json(req.body)
    })
    .catch( err => {
        console.log("error getting trips from DB", err);
        next(err);
      })
});

module.exports = router