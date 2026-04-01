"use client";
import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [dnaResult, setDnaResult] = useState(null);
    const [fitScore, setFitScore] = useState(null);
    const [simulation, setSimulation] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [testHistory, setTestHistory] = useState([]);
    
    const API_BASE = "http://localhost:5000/api";

    const fetchTestHistory = async () => {
        try {
            const res = await fetch(`${API_BASE}/mock-test/history`);
            const data = await res.json();
            if (data.success) setTestHistory(data.tests);
        } catch (e) { console.error("Test history error:", e); }
    };

    const runAnalysis = async (file) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("document", file);

            const dnaRes = await fetch(`${API_BASE}/career-dna/analyze`, {
                method: 'POST', body: formData
            });
            const dnaData = await dnaRes.json();
            setDnaResult(dnaData);

            const topCareer = dnaData.top_careers[0] || "AI Engineer";
            const extractedSkills = dnaData.extracted_skills || [];

            const fitRes = await fetch(`${API_BASE}/career-fit/score`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ career: topCareer, skills: extractedSkills })
            });
            const fitData = await fitRes.json();
            setFitScore(fitData);

            const simRes = await fetch(`${API_BASE}/simulation`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ career: topCareer, skills: extractedSkills })
            });
            const simData = await simRes.json();
            setSimulation(simData);

            const colRes = await fetch(`${API_BASE}/course/match`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skills: extractedSkills })
            });
            const colData = await colRes.json();
            setColleges(colData.colleges);

            const crsRes = await fetch(`${API_BASE}/courses`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ career: topCareer, skills: extractedSkills })
            });
            const crsData = await crsRes.json();
            setCourses(crsData.courses);

            try {
                await fetch(`${API_BASE}/save-analysis`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        careerIdentity: dnaData.career_identity,
                        topCareers: dnaData.top_careers,
                        extractedSkills: extractedSkills,
                        fitScore: { score: fitData.score, label: fitData.label },
                        colleges: colData.colleges,
                        courses: crsData.courses
                    })
                });
            } catch (err) {
                console.error("DB Save failed:", err);
            }

            return true;
        } catch (e) {
            console.error("Analysis Error:", e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardContext.Provider value={{ dnaResult, fitScore, simulation, colleges, courses, loading, testHistory, fetchTestHistory, runAnalysis }}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => useContext(DashboardContext);
