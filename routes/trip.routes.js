const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip.model");
//const isAuthenticated = require("../middleware/jwt.middleware");

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

  
  
  //CREATE: process form
  router.post("/trips",  (req, res, next) => {
    
    const tripDetails = {
      aircraftId: req.body.aircraftId,
      startTrip: req.body.startTrip,
      duration: req.body.duration
    }
  
    return Trip.create(tripDetails)
      .then(tripDetails => {
        res.status(201).json(req.body)
      })
      .catch(err => {
        console.log("error creating new trip in DB", err);
        next(err);
      })
  
  })

module.exports = router