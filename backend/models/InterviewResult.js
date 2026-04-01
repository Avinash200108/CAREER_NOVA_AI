const mongoose = require('mongoose');

const InterviewResultSchema = new mongoose.Schema({
    role: String,
    overallScore: Number,
    sections: {
        Technical: Number,
        Communication: Number,
        Confidence: Number,
        BodyLanguage: Number
    },
    feedback: {
        softSkills: [String],
        technical: [String],
        bodyLanguage: [String]
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InterviewResult', InterviewResultSchema);
