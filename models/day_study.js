const mongoose = require('mongoose');
const config = require('../config/db');

const DayStudySchema = mongoose.Schema({
    NameDay: {
        type: String,
        require: true
    },
    ReductionName: {
        type: String,
        require: true
    }
}, {
    collection: 'DaysStudy'
});

const DayStudy = module.exports = mongoose.model('DayStudy', DayStudySchema);