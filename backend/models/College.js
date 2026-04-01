const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: String,
    cutoff: String,
    fees: String,
    location: String
});

module.exports = mongoose.model('College', CollegeSchema);
