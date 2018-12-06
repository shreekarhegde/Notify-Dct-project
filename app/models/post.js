const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String
    },
    applause: {
        type: Number,
        default: 0
    },
    comments: [{
        type: String,
        minlength: 1,
        default: ``
    }],
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = {
    Post
}