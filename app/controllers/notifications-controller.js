const express = require('express');
const router = express.Router();
const { Notification } = require('../models/notification');


//find notifications by id
router.get('/:id', (req, res) => {
    Notification.find().then((notifications) => {
        res.send(notifications);
    }).catch((err) => {
        res.send(err);    
    });
});

module.exports = {
    notificationsController: router
}

