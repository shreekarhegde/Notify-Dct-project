const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Department }  = require('./department');
const { Employee } = require('./employee');

const activitySchema = new Schema({
    activityName: {
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


activitySchema.post('save', function(next){
    let eventId = this._id;
    console.log(eventId);
    let departmentId = this.department;
    console.log(departmentId);
    Department.findById(departmentId).populate('activity').then((department) => {
        console.log(department);
        department.activities.push(eventId);
        department.save().then((department) => {
            console.log(department);
        });
    }).catch((err) => {
        console.log(err);
    })
});

const Activity = mongoose.model('Activity', activitySchema);


module.exports = {
    Activity
}