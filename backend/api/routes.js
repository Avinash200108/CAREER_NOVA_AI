const express = require('express');
const router = express.Router();

const { analyzeCareerDna } = require('../services/career_dna');
const { calculateFitScore } = require('../services/fit_score');
const { generateSimulation } = require('../services/simulation');
const { matchCollege } = require('../services/matching');
const { recommendCourses } = require('../services/courses');
const { generatePDF } = require('../services/pdf_generator');
const UserAnalysis = require('../models/UserAnalysis');
const TestResult = require('../models/TestResult');
const InterviewResult = require('../models/InterviewResult');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/career-dna/analyze', upload.single('document'), async (req, res) => {
    try {
        const fileBuffer = req.file ? req.file.buffer : null;
        const result = await analyzeCareerDna(req.body, fileBuffer);
        res.json(result);
    } catch (e) {
        console.error("Analysis Error:", e);
        res.status(500).json({ error: "Failed to analyze document" });
    }
});

router.post('/career-fit/score', (req, res) => {
    const data = req.body;
    const result = calculateFitScore(data.skills, data.career);
    res.json(result);
});

router.post('/simulation', (req, res) => {
    const data = req.body;
    const result = generateSimulation(data.career, data.skills);
    res.json(result);
});

router.post('/course/match', (req, res) => {
    const data = req.body;
    const result = matchCollege(data.skills);
    res.json(result);
});

router.post('/courses', (req, res) => {
    const data = req.body;
    const result = recommendCourses(data.career, data.skills);
    res.json(result);
});

router.post('/save-analysis', async (req, res) => {
    try {
        const doc = new UserAnalysis(req.body);
        await doc.save();
        res.json({ success: true, id: doc._id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false });
    }
});

router.post('/mock-test/submit', async (req, res) => {
    try {
        const doc = new TestResult(req.body);
        await doc.save();
        res.json({ success: true, id: doc._id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false });
    }
});

router.get('/mock-test/history', async (req, res) => {
    try {
        const tests = await TestResult.find().sort({ createdAt: -1 }).limit(10);
        res.json({ success: true, tests });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false });
    }
});

router.post('/mock-interview/submit', async (req, res) => {
    try {
        const doc = new InterviewResult(req.body);
        await doc.save();
        res.json({ success: true, id: doc._id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false });
    }
});

router.post('/report/download', async (req, res) => {
    try {
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=CareerNova_Report.pdf',
        });
        await generatePDF(req.body, (chunk) => stream.write(chunk), () => stream.end());
    } catch (e) {
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;
