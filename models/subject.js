const mongoose = require('mongoose');
const config = require('../config/db');

const SubjectSchema = mongoose.Schema({
    NameSubject: {
        type: String,
        require: true
    },
}, {
    collection: 'Subjects'
});

const NameSubject = module.exports = mongoose.model('NameSubject', SubjectSchema);