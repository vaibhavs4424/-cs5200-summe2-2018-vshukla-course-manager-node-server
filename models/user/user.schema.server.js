const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    admin: Boolean
}, {collection: 'user'});
