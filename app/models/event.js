const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  {Department}  = require('./department');
const  {Employee} = require('./employee');

const eventSchema = new Schema({
    eventName: {
        type: String,
        minlength: 3,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        reference: 'Employee'
    }],
    department: {
        type: Schema.Types.ObjectId,
        reference: 'Department'
    },
    venue: {
        type: String,
        minlength: 3
    },
    guest: {
        number: {
            type: Number,
            min: 1
        },
        name:{
            type: String,
            minlength: 2
        }
    },
    venue: {
        type: String,
        minlength: 2
        },
    schedule: {
        time: {
            type: String,
            required: true
            },
        date: {
            type: Date,
            required: true
            }
        }
});

eventSchema.post('save', function(next){
    let eventId = this._id;
    this.participants.map(participantId => Employee.findById(participantId).then((participant) => {
        participant.events.push(eventId);
        participant.save();
    }));
});


const Event = mongoose.model('Event', eventSchema);

module.exports = {
    Event
}