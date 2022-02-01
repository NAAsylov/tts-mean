const mongoose = require('mongoose');

const CallSchema = mongoose.Schema({
    NumberLesson: {
        type: Number,
        require: true
    },
    StartLesson: {
        type: String,
        require: true
    },
    EndLesson: {
        type: String,
        require: true
    }
}, {
    collection: 'Call'
});

const Call = module.exports = mongoose.model('Call', CallSchema);