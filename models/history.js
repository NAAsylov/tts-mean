const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
    description: {
        type: String,
        require: true
    }
}, {
    collection: 'History'
});

const History = module.exports = mongoose.model('History', HistorySchema);