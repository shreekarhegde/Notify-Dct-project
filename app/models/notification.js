const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    content: {
        type: String,
        minlength: 5
    },
    employee: {
        type: Schema.Types.ObjectId,
        reference: 'Employee'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {
    Notification
}