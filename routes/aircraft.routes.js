const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Aircraft = require("../models/Aircraft.model");

//READ: list of all the aircrafts

router.get("/aircrafts", (req, res, next)=> {
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

//CREATE: aircrafts

router.post("/aircrafts", (req, res, next)=> {

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

//UPDATE: aircrafts

router.post("/aircrafts/:aircraftId", (req, res, next)=> {

    return Aircraft.findByIdAndUpdate(req.params.aircraftId, req.body, {new: true})
    .then(aircraft => {
        
        res.status(201).json( aircraft);
    })
    .catch( err => {
        console.log("error creating aircrafts from DB", err);
        next(err);
      })
});

//DELETE: aircrafts

router.delete("/aircrafts/:aircraftId", (req, res, next) => {
const {aircraftId} = req.params;

    // if(mongoose.Types.ObjectId.isValid(aircraftId)){
    //     res.status(400).json({message: "Id is not valid"});
    //     return;
    // }

    Aircraft.findByIdAndRemove(aircraftId)
    .then(()=>{
        res.json({message: `The aircraft with ID: ${aircraftId} is removed successfully`})
    })
    .catch( err => {
        console.log("error deleting aircrafts from DB", err);
        next(err);
      })
})

module.exports = router