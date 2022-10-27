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
        res.status(201).json(tripsFromDb)
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

//UPDATE: trips

router.post("/trips/:tripId", (req, res, next)=> {

  return Trip.findByIdAndUpdate(req.params.tripId, req.body, {new: true})
  .then(trip => {
      
      res.status(201).json( trip);
  })
  .catch( err => {
      console.log("error creating trips from DB", err);
      next(err);
    })
});

//DELETE: trips

router.delete("/trips/:tripId", (req, res, next) => {
const {tripId} = req.params;

  // if(mongoose.Types.ObjectId.isValid(aircraftId)){
  //     res.status(400).json({message: "Id is not valid"});
  //     return;
  // }

  Trip.findByIdAndRemove(tripId)
  .then(()=>{
      res.json({message: `The trip with ID:${tripId} is removed successfully`})
  })
  .catch( err => {
      console.log("error deleting trips from DB", err);
      next(err);
    })
})


module.exports = router