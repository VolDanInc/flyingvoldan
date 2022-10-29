const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip.model");
//const isAuthenticated = require("../middleware/jwt.middleware");
const mongoose = require('mongoose');
//READ: list of all the trips

router.get("/trips/user/:userId", (req, res, next) => {
  const userId = req.params.userId;
  //console.log(userId);
  Trip.find()
    //.populate("aircraft")
    .then(tripsFromDb => {
      //console.log(tripsFromDb);
      console.log(tripsFromDb[0].userId);
      console.log(userId);
      const individualTrips = tripsFromDb.filter((trip) => {
        return trip.userId === userId;
      })
      //console.log(individualTrips);
      res.status(201).json(individualTrips)
    })
    .catch(err => {
      console.log("error getting trips from DB", err);
      next(err);
    })
});



//CREATE: process form
router.post("/trips", (req, res, next) => {

  const tripDetails = {
    aircraftId: req.body.aircraftId,
    userId: req.body.userId,
    startTrip: req.body.startTrip,
    startTripNum: req.body.startTripNum,
    review: req.body.review,
    reviewStars: req.body.reviewStars,
    duration: req.body.duration
  }

  return Trip.create(tripDetails)
    .then(tripDetails => {
      //console.log("Enum error creating new trip ......."+ tripDetails);
      res.status(201).json(req.body)
    })
    .catch(err => {
      console.log("error creating new trip in DB", err);
      next(err);
    })

})

// GET /trips/:tripId -  Retrieves a specific trip by id
router.get("/trips/:tripId", (req, res, next) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }


  Trip.findById(tripId)
    //.populate('aircrafts')
    .then(trip => res.json(trip))
    .catch(err => {
      console.log("error getting trip details...", err);
      res.status(500).json({
        message: "error getting trip details...",
        error: err
      })
    });
});

//UPDATE: trips

router.put("/trips/:tripId", (req, res, next) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Trip.findByIdAndUpdate(tripId, req.body, { new: true })
    .then(trip => {

      res.status(201).json(trip);
    })
    .catch(err => {
      console.log("error creating trips from DB", err);
      next(err);
    })
});

//DELETE: trips

router.delete("/trips/:tripId", (req, res, next) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Trip.findByIdAndRemove(tripId)
    .then(() => {
      res.json({ message: `The trip with ID:${tripId} is removed successfully` })
    })
    .catch(err => {
      console.log("error deleting trips from DB", err);
      next(err);
    })
})


module.exports = router