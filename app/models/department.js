const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
        minlength: 2
    },
    about: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    review: {
        type: String,
        minlengt: 5,
        maxlength: 100
    } 
});


const Department = mongoose.model('Department', departmentSchema);

module.exports = {
    Department
}
    


