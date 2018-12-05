const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');
const { Department } = require('../models/department');
const { Activity } = require('../models/activity');


//see all the activities
router.get('/', (req, res) => {
    Activity.find().populate('departments').populate('participants').then((activities) => {
        res.send(activities);
    }).catch((err) => {
        res.send(err);
    });
  });

//create an activity and invite people randomly, and by department
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

//update an activity
router.put('/:id', (req, res) => {
    let body = req.body;
    console.log(body);
    let id = req.params.id;
    let participantsToBeRemoved = req.body.participantsToBeRemoved;
    let departmentsToBeRemoved = req.body.departmentsToBeRemoved;

    if(participantsToBeRemoved){
        Activity.findOneAndUpdate({ _id: id}, {$pull: {participants: {$in: participantsToBeRemoved}}}).then((activity) => {
            console.log(activity, "removed particpants");
        });

        Employee.updateMany({_id: participantsToBeRemoved}, {$pull: {activities: id}}).then((employees) => {
            console.log(employees, "removed employees");
        })
    }
    
    if(departmentsToBeRemoved){
        console.log(departmentsToBeRemoved);
        Activity.findOneAndUpdate({ _id: id}, {$pull: {departments: {$in: departmentsToBeRemoved}}}).then((activity) => {
            console.log(activity, "removed departments from activity");
        });
        Department.findByIdAndUpdate({ _id: departmentsToBeRemoved}, {$pull: {activities: id}}).then((departments) => {
            console.log(departments, "removed activity from departments");
        })
    }

    Activity.findByIdAndUpdate({ _id: id}, {$set: body},{ new: true, runValidators: true }).then((activity) => {
        if(!activity){
            res.send({
                notice: 'activity not found'
            })
        }
        res.send({
            activity,
            notice: 'updated activity successfully'
        })
         activity.save();
    });
});


//delete an event
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let participants = req.body.participants;
    let departments = req.body.department;

    Employee.updateMany({ _id: participants }, {$pull: {activities: {$in: id}}}).then((activity) => {
        Department.updateMany({ _id: departments }, {$pull: {activities: {$in: id}}}).then((activity) => {
            console.log(activity, "from department");
        })
    })
    .catch((err) => {
        console.log(err);
    })

    Activity.findByIdAndDelete(id).then((activity) => {
        res.send(activity);
    }).catch((err) =>{
        res.send(err);
    })    
})


module.exports = {
    activitiesController: router
}