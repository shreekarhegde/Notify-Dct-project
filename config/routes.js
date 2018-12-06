const express = require('express');

const router = express.Router();
const { departmentsController } = require('../app/controllers/department-controller');
const { employeesController } = require('../app/controllers/employees-controller');
const { activitiesController } = require('../app/controllers/activity-controller');
const { notificationsController } = require('../app/controllers/notifications-controller');
const { postsController } = require('../app/controllers/posts-controller');

router.use('/departments', departmentsController);
router.use('/employees', employeesController);
router.use('/activities', activitiesController);
router.use('/notifications', notificationsController);
router.use('/posts', postsController);

module.exports = {
    routes: router
}