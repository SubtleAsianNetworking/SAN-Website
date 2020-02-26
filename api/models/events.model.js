const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Events = new Schema({
    // TODO: Please fix this into a corret schema.
    datetime: {
        type: String
    },
    location: {
        type: String
    },
});
module.exports = mongoose.model('Events', Events);