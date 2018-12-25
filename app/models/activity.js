const mongoose = require('mongoose');
const Schema = mongoose.Schema;
delete mongoose.connection.models['Activity'];
const { Department } = require('./department');
const { Employee } = require('./employee');
const nodemailer = require('nodemailer');

const activitySchema = new Schema({
    activityName: {
        type: String,
        minlength: 3,
        required: true
    },
    about: {
        type: String,
        minlength: 5
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    departments: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }],
    venue: {
        type: String,
        minlength: 3
    },
    guests: [{
        type: String
    }],
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

activitySchema.post('save', function (next) {
    let activityId = this._id;
    let departmentId = this.departments;
    // console.log(departmentId);
    let newParticipants = this.participants;
    Employee.updateMany({ _id: { $in: newParticipants } }, { $push: { activities: activityId } }).then((participants) => {
        console.log(participants);
        Employee.find({ _id: { $in: newParticipants } }).then((employees) => {
            let emails = employees.map(employee => {
                return employee.bio.email;
            })

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                   service: "Gmail",
                    auth: {
                        user: process.env.MY_EMAIL, // generated ethereal user
                        pass: process.env.GMAIL_PASSWORD // generated ethereal password
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"shreekar hegde" <shreekarhegde9@gmail.com>', // sender address
                    to: emails.join(), // list of receivers
                    subject: 'inviting to the event', // Subject line
                    text: `you have been invited to the event ${this.activityName}`, // plain text body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
            });
        })

    Department.updateMany({ _id: departmentId }, { $push: { activities: activityId } }).then((department) => {
        console.log(department);
    }).catch((err) => {
        console.log(err);
    })
});


const Activity = mongoose.model('Activity', activitySchema);


module.exports = {
    Activity
}