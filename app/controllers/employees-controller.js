const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');

//see all the employees
router.get('/', (req, res) => {
    Employee.find().then((employees) => {
        res.send(employees);
    }).catch((err) => {
        res.send(err);
    });
});

//find by id 
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id).populate('bio.department').then((employee) => {
        res.send({
            employee: employee.bio.firstName,
            department: employee.bio.department.departmentName
        });
    }).catch((err) => {
        res.send(err);
    });
});

//add employee
router.post('/', (req, res) => {
    let body = req.body;
    let employee = new Employee(body);
    employee.save().then((employee) => {
        res.send({
            employee,
            notice: 'successfully added employee'
        });
    }).catch((err) => {
        res.send(err);
    });
});

//update employee details
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Employee.findByIdAndUpdate({ _id: id}, {$set: body}, { new: true, runValidators: true }).then((employee) => {
        if(!employee){
            res.send({
                notice: 'employee not found'
            });
        }
        res.send({
            notice: 'successfully update employee details'
        });
    });
});



module.exports = {
    employeesController: router
}
