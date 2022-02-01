const mongoose = require('mongoose');
const config = require('../config/db');

const ClassSchema = mongoose.Schema({
    NumberClass: {
        type: Number,
        require: true
    },
}, {
    collection: 'NumClass'
});

const NumClass = module.exports = mongoose.model('NumClass', ClassSchema);