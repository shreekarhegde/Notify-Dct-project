const express = require('express');
const router = express.Router();
const { Group } = require('../models/group');
const {Activity} = require('../Models/activity')
const { Employee } = require('../models/employee');
const { Department } = require('../models/department');

//see list of groups
router.get('/', (req,res) => {
    Group.find().populate('members').populate('activities').then((groups) => {
        res.send(groups);
    }).catch((err) => {
        res.send(err);
    });
});

//add a group
router.post('/', (req, res) => {
    let body = req.body;
    let group = new Group(body);
    group.save().then((group) => {
        res.send({
            group,
            notice: 'successfully added group'
        });
    }).catch((err) => {
        res.send(err);
    });
});

//update a group
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Group.findOneAndUpdate({groupName: req.body.groupName}, {$pull:{members: {$in: req.body.selectedMembers}}}).then((res) => {
        Employee.updateMany({_id: req.body.selectedMembers},{ $unset: {'bio.department': ""}}).then((res) => {
            console.log(res);
        })
    });

    Group.findOneAndUpdate({ _id: id}, { $set: body }, { new: true, runValidators: true }).populate('members').then((group) => {
        if(!group){
            res.send({
                notice: 'group not found'
            });
        }
        res.send({
            group,
            notice: 'Successfully updated group'
        });
        group.save();
    });
});

//find group by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Group.findById(id).populate('members').populate('activities').then((group) => {
        res.send(group);
    });
});

//find group by name  localhost:3000/group?name
router.get('/name', (req, res) => {
    let name = req.query.names;
    Group.find({ groupName: name}).then((group) => {
        res.send(group);
    }).catch((err) => {
        res.send(err);
    });
});

//delete a group
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Group.findByIdAndRemove(id).then((group) => {
        if(group) {
            res.send(group);
        } else {
            res.send({
                notice: 'group not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    })
})


module.exports = {
    groupsController:router
}