const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
    role: String,
    score: Number,
    totalQuestions: Number,
    timeTaken: Number, // in seconds
    sections: {
        Aptitude: Number,
        Technical: Number,
        Verbal: Number
    },
    strengths: [String],
    weaknesses: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', TestResultSchema);
