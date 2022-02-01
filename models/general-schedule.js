const mongoose = require('mongoose');

const GeneralScheduleSchema = mongoose.Schema({
    NumberLesson: {
        type: Number,
        require: true
    },
    DayLesson: {
        type: String,
        require: true
    },
    ClassLesson: {
        type: String,
        require: true
    },
    NameLesson: {
        type: String,
        require: true
    }
}, {
    collection: 'Lesson'
});

const GeneralSchedule = module.exports = mongoose.model('GeneralSchedule', GeneralScheduleSchema);