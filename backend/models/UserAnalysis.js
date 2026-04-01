const mongoose = require('mongoose');

const UserAnalysisSchema = new mongoose.Schema({
    careerIdentity: String,
    topCareers: [String],
    extractedSkills: [String],
    fitScore: {
        score: Number,
        label: String
    },
    colleges: [{
        name: String,
        match: String,
        fees: String
    }],
    courses: [{
        platform: String,
        title: String,
        link: String
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserAnalysis', UserAnalysisSchema);
