const mongoose = require('mongoose');

const CareerProfileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    career_identity: String,
    strengths: [String],
    fit_scores: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('CareerProfile', CareerProfileSchema);
