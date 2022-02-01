const express = require('express');
const postRoutes = express.Router();

let Post = require('../models/post');

postRoutes.route('/add').post((req, res) => {
    let post = new Post(req.body);
    post.save((err, isMatch) => {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log('Успешно');
            res.json({ success: true });
        }
    });
});

postRoutes.route('/').get((req, res) => {
    Post.find().sort({ date: -1 }).exec((err, post) => {
        if (err) {
            res.json({ success: false });
        } else {
            res.json(post);
        }
    });
});

postRoutes.route('/delete/:id').get((req, res) => {
    Post.findByIdAndRemove({ _id: req.params.id }, (err, call) => {
        if (err) res.json(err);
        else res.json('Пост удален');
    });
});

module.exports = postRoutes;