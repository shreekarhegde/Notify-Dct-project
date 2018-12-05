const express = require('express');
const router = express.Router();
const { Department } = require('../models/department');
const { Employee } = require('../models/employee');
const _= require('lodash');

//see all of departments
router.get('/', (req, res) => {
   Department.find().populate('members').populate('activities').then((departments) => {
       res.send(departments);
   }).catch((err) => {
       res.send(err);
   }); 
});

//add a department
router.post('/', (req, res) => {
    let body = req.body;
    let department = new Department(body);
    department.save().then((department) => {
        res.send({
            department,
            notice: 'successfully added department'
        });
    }).catch((err) => {
        res.send(err);
    });
});


//update a department
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Department.findOneAndUpdate({departmentName: req.body.departmentName}, {$pull:{members: {$in: req.body.selectedMembers}}}).then((res) => {
        Employee.updateMany({_id: req.body.selectedMembers},{ $unset: {'bio.department': ""}}).then((res) => {
            console.log(res);
        })
    });

    Department.findOneAndUpdate({ _id: id}, { $set: body }, { new: true, runValidators: true }).populate('members').then((department) => {
        if(!department){
            res.send({
                notice: 'department not found'
            });
        }
        res.send({
            department,
            notice: 'Successfully updated department'
        });
        department.save();
    });
});

//find department by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Department.findById(id).populate('members').populate('activities').then((department) => {
        res.send(department);
    });
});

//find department by name  localhost:3000/departments?name
router.get('/name', (req, res) => {
    let name = req.query.names;
    Department.find({ departmentName: name}).then((department) => {
        res.send(department);
    }).catch((err) => {
        res.send(err);
    });
});


//delete a department
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Department.findByIdAndDelete(id).then((department) => {
        if(department) {
            res.send(department);
        } else {
            res.send({
                notice: 'department not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    });
});




module.exports = {
    departmentsController: router
}