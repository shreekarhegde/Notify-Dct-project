const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');
const { Department } = require('../models/department');
const { Event } = require('../models/event');


//create an event and invite people randomly
router.post('/', (req, res) => {
    let body = req.body;
    let event = new Event(body);
    event.save().then((event) => {
        res.send({
            event,
            notice: "successfully created event"
        });
    }).catch((err) => {
        res.send(err);
    });
});

//create event and invite people by department
//after saving the event on line 25, response will be a promise event which will have _id. Find department using req.params.id and to its members, push event._id(line no 29)
//department.members will be an array on which map is used to push eventId to respecive events field of employee(line no 30)
router.post('/:id', (req, res) => {
    let body = req.body;
    let event = new Event(body);
    event.save().then((event) => {    
        Department.findByIdAndUpdate(req.params.id, {$push: {"events": event._id}}).then((department) => {
            department.members.map(member => {    
                Employee.findByIdAndUpdate(member, {$push: {"events": event._id}}).then((member) => {
                    res.send(member);
                });
            }).catch((err) => {
                res.send(err);
            });
        });
        res.send({
            event,
            notice: "sucessfully created event"
        });
    }).catch((err) => {
        res.send(err);
    });
});


//see all the events
router.get('/', (req, res) => {
  Event.find() .then((events) => {
      res.send(events);
  }).catch((err) => {
      res.send(err);
  });
});


//see the events related to particular department
router.get('/:id', (req, res) => {
    Department.findById(req.params.id).then((events) => {
        res.send(events.events);
    }).catch((err) => {
        res.send(err);
    });
  });



module.exports = {
    eventsController: router
}