const express = require("express");
const router = express.Router();
const Aircraft = require("../models/Aircraft.model");

//READ: list of all the aircrafts

router.get("/aircraft", (req, res, next)=> {
    Aircraft.find()
   
    .then(aircrafts => {
        // const {aircraftId, startTrip, duration} = 
        res.status(201).json(req.body)
    })
    .catch( err => {
        console.log("error getting aircrafts from DB", err);
        next(err);
      })
});

module.exports = router