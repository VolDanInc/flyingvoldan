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

router.post("/aircraft", (req, res, next)=> {

    const {name, description, price, seats } = req.body;

    return Aircraft.create({ name, description, price, seats })
    .then(aircraft => {
        // const {aircraftId, startTrip, duration} = 
        res.status(201).json({ aircraft: aircraft });
    })
    .catch( err => {
        console.log("error creating aircrafts from DB", err);
        next(err);
      })
});

router.post("/aircraft/:aircraftId", (req, res, next)=> {

    const airId = req.body.aircraftId;

    return Aircraft.findByIdAndUpdate(airId, req.body)
    .then(aircraft => {
        // const {aircraftId, startTrip, duration} = 
        res.status(201).json({ aircraft: aircraft });
    })
    .catch( err => {
        console.log("error creating aircrafts from DB", err);
        next(err);
      })
});

module.exports = router