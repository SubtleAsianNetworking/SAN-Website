const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Events = new Schema({
    time: {
        type: Date
    },
    location: {
        type: String
    },
    topic: {
        type: String
    },
    affliation: {
        type: String
    },
    approved: {
        type: Boolean
    }
    // TODO: clarify what "tags" should be.
});
module.exports = mongoose.model('Events', Events);