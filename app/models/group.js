const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Employee } = require('./employee');

const groupSchema = new Schema({
    groupName:{
        type: String,
        //required: true,
        minlength: 3
    },
    members:[{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    privacy:{
        type: String,
        //required: true,
        minlength: 3
    },
    posts:[{
        type: String
    }],
    activities:[{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }]
})


groupSchema.post('save', function(next){
    let allMembers = this.members;
    let groupID= this._id;

    allMembers.forEach((memberID) => {
        Employee.findById(memberID).then((employee) => {  

            if(!employee.groups.includes(groupID)){
                employee.groups.push(groupID);   
                employee.save();
            }  
        })
    });
    
   // next();
})

const Group = mongoose.model('Group',groupSchema);

module.exports = {
    Group
}