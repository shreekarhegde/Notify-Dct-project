const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');
const { Department } = require('../models/department');
const { Activity } = require('../models/activity');

//see all the events
router.get('/', (req, res) => {
    Activity.find().populate('department').then((activities) => {
        res.send(activities);
    }).catch((err) => {
        res.send(err);
    });
  });

//create an event and invite people randomly
router.post('/', (req, res) => {
    let body = req.body;
    let activity = new Activity(body);
    activity.save().then((activity) => {
        res.send({
            activity,
            notice: "successfully created activity"
        });
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = {
    activitiesController: router
}