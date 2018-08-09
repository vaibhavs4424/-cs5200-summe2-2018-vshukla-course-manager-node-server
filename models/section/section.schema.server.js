var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    name: String,
    seats: Number,
    courseId: Number
}, {
    collection: 'section'
});