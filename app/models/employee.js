const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Department } = require('./department');

const employeeSchema = new Schema({
    bio: {
        firstName: {
            type: String,
            required: true,
            minlength: 3
        },
        lastName: {
            type: String,
            required: true,
            minlength: 1
        },
        address: {
            type: String
        },
        contactNumber: {
            type: Number
        },
        email: {
            type: String
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        }
    },
    picture: {
        type: String
    },
    post: {
        type: String,
        minlength: 1
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
});

employeeSchema.post('save', function(next){
    let memberId = this._id;
    let departmentId = this.bio.department;
    Department.findById(departmentId).populate('department').then((department) => {
        department.members.push(memberId);
        department.save();
    })
    //next();
})

employeeSchema.methods.transferDepartment = function(oldId, newId){
    Department.findByIdAndRemove(oldId, {members: this._id});
    return Department.findOneAndUpdate({_id: newId}, {$push:{members: this.id}});
}

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = { Employee }