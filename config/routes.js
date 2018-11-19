const express = require('express');
const router = express.Router();
const { departmentsController } = require('../app/controllers/department-controller');
const { employeesController } = require('../app/controllers/employees-controller');
const { eventsController } = require('../app/controllers/events-controller');

router.use('/departments', departmentsController);
router.use('/employees', employeesController);
router.use('/events', eventsController);

module.exports = {
    routes: router
}