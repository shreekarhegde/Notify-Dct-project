const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');

router.get('/', (req, res) => {
    Post.find().then((posts) => {
        res.send({posts});
    }).catch((err) => {
        res.send(err);
    })
})

router.post('/', (req, res) => {
    let body = req.body;
    let post = new Post(body);
    post.save().then((post) => {
        res.send(post);
    }).catch((err) => {
        res.send(err);
    })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Post.findOneAndUpdate({ _id: id}, {$set: body}, {new: true, runValidators: true}).then((post) => {
        res.send(post);    
    }).catch((err) => {
        res.send(err);
    })
})

//get a particular post
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Post.findById(id).then((post) => {
        res.send(post);
    }).catch((err) => {
        res.send(err);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Post.findByIdAndDelete(id).then((post) => {
        res.send(post);
    }).catch((err) => {
        res.send(err);
    })
})

module.exports = {
    postsController: router
}