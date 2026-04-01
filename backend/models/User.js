const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    education: String,
    marks: Number,
    interests: [String],
    skills: [String]
});

module.exports = mongoose.model('User', UserSchema);
