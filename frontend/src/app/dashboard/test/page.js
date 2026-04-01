"use client";
import { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, RefreshCw, Bookmark, ShieldCheck, HelpCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function MockTestPage() {
    const { dnaResult, testHistory, fetchTestHistory } = useDashboard();
    
    // Core User Identity Variables
    const role = dnaResult?.top_careers?.[0] || 'Software Engineer';
    const skills = dnaResult?.extracted_skills || ['Cloud Architecture', 'Python'];
    
    // Engine State
    const [status, setStatus] = useState('intro'); // 'intro', 'test', 'evaluation'
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedReview, setMarkedReview] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(300); // 5 mins in seconds
    const [resultData, setResultData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Requirement 2 & 9: Smart Question Generation
    const generateQuestions = () => {
        const primarySkill = skills[0] ? skills[0].toUpperCase() : 'CORE';
        const secondarySkill = skills[1] ? skills[1].toUpperCase() : 'SYSTEMS';

        const qb = [
            { 
                id: 1, section: 'Technical', 
                q: `In the context of ${primarySkill}, which approach is most effective for scaling operations?`, 
                options: ["Synchronous blocking", "Vertical scaling only", "Distributed Caching & Load Balancing", "Using single global variables"], 
                answer: "Distributed Caching & Load Balancing",
                explanation: `Scaling ${primarySkill} effectively requires distribution to prevent single points of failure.`
            },
            {
                id: 2, section: 'Aptitude',
                q: `If 5 ${role}s can deploy 5 features in 5 days, how many days does it take 100 ${role}s to deploy 100 features?`,
                options: ["100", "5", "1", "50"],
                answer: "5",
                explanation: "The rate is 1 feature per engineer per 5 days. 100 engineers working simultaneously still take 5 days."
            },
            {
                id: 3, section: 'Technical',
                q: `When integrating ${secondarySkill} architectures, what is the primary risk of microservices?`,
                options: ["Monolithic dependency constraints", "Network latency and complex debugging", "It prevents using databases", "It forces everything to be single-threaded"],
                answer: "Network latency and complex debugging",
                explanation: "Microservices introduce distributed system complexities like network hops and tracing difficulties."
            },
            {
                id: 4, section: 'Scenario',
                q: `As a ${role}, you detect a critical memory leak in production. What is your immediate protocol?`,
                options: ["Wait for the next sprint review", "Hotfix directly in the main repository without tests", "Rollback to the last stable deployment and analyze profiles", "Ignore it until users complain"],
                answer: "Rollback to the last stable deployment and analyze profiles",
                explanation: "Immediate rollback ensures business continuity while isolating the leak for safe debugging."
            },
            {
                id: 5, section: 'Verbal Ability',
                q: "Select the most appropriate professional communication to a stakeholder:",
                options: ["I fixed the bug you was complaining about.", "The issue reported has been resolved in the latest patch.", "Look at the patch I just pushed.", "It's working now."],
                answer: "The issue reported has been resolved in the latest patch.",
                explanation: "Maintains a formal, clear, and objective professional tone."
            }
        ];
        setQuestions(qb);
        setAnswers({});
        setMarkedReview(new Set());
        setTimeLeft(300);
        setCurrentIndex(0);
        setStatus('test');
    };

    // Requirement 5: Test Interface & Timer
    useEffect(() => {
        let timer;
        if (status === 'test' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (status === 'test' && timeLeft === 0) {
            submitTest();
        }
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const handleAnswer = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const toggleMarkReview = (qId) => {
        const newSet = new Set(markedReview);
        if(newSet.has(qId)) newSet.delete(qId);
        else newSet.add(qId);
        setMarkedReview(newSet);
    };

    const formatTime = (secs) => `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;

    // Requirement 6: Evaluation Engine
    const submitTest = async () => {
        setIsSaving(true);
        let score = 0;
        const breakdowns = { Aptitude: 0, Technical: 0, Verbal: 0, Scenario: 0 };
        const maxBreakdowns = { Aptitude: 0, Technical: 0, Verbal: 0, Scenario: 0 };
        const weaknesses = [];
        const strengths = [];

        questions.forEach(q => {
            maxBreakdowns[q.section]++;
            if (answers[q.id] === q.answer) {
                score++;
                breakdowns[q.section]++;
            } else {
                weaknesses.push(q.section);
            }
        });

        // Unique strength/weakness arrays
        if(score >= 4) strengths.push(role + " Expertise", "Logical deduction");
        if(weaknesses.includes('Technical')) weaknesses.push(`Review core ${skills[0]} architectures`);

        const timeTakenSecs = 300 - timeLeft;

        const resultPayload = {
            role, score, totalQuestions: questions.length, timeTaken: timeTakenSecs,
            sections: breakdowns,
            strengths: strengths.length > 0 ? strengths : ['Persistence'],
            weaknesses: [...new Set(weaknesses)]
        };

        setResultData({ ...resultPayload, evaluatedQuestions: questions, userAnswers: answers });

        // Save History
        try {
            await fetch('http://localhost:5000/api/mock-test/submit', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultPayload)
            });
            fetchTestHistory(); // update context history
        } catch(e) { console.error("Could not save test", e); }
        
        setIsSaving(false);
        setStatus('evaluation');
    };

    const PIE_COLORS = ['#00ffa3', '#ff4d4d'];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-10 w-full animate-in fade-in zoom-in duration-500">
            
            {/* INTRO SCREEN */}
            {status === 'intro' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="glass-panel p-10 rounded-3xl border border-[#00ccff]/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ccff] to-transparent opacity-50"></div>
                        <ShieldCheck size={64} className="mx-auto mb-6 text-[#00ccff]" />
                        <h2 className="text-4xl font-extrabold mb-4">AI Mock Assessment Phase</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                            The system has detected your profile as <strong className="text-white">{role}</strong>. 
                            We have generated a highly specialized 5-question sprint mapping directly to your explicitly stated skills 
                            (<span className="text-[#00ccff]">{skills.join(', ')}</span>).
                        </p>
                        
                        <div className="flex justify-center gap-8 mb-10 text-sm font-bold tracking-widest uppercase text-gray-500 animate-pulse">
                            <span>🕒 5 Minutes</span>
                            <span>📋 5 Questions</span>
                            <span>🎯 Adaptive Difficulty</span>
                        </div>

                        <button onClick={generateQuestions} className="px-10 py-4 bg-gradient-to-r from-[#00ccff] to-[#00ff99] text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(0,255,163,0.5)] transition hover:scale-105 active:scale-95">
                            Launch Assessment
                        </button>
                    </div>

                    {/* Analytics History Overview */}
                    {testHistory && testHistory.length > 0 && (
                         <div className="glass-panel p-8 rounded-2xl">
                             <h3 className="font-extrabold text-xl mb-4 border-b border-white/10 pb-4">Previous Engagements</h3>
                             <div className="space-y-3">
                                 {testHistory.map((th, i) => (
                                     <div key={i} className="flex justify-between items-center bg-black/40 px-6 py-4 rounded-xl border border-white/5">
                                         <div>
                                            <p className="font-bold">{th.role} Assessment</p>
                                            <p className="text-xs text-gray-500">{new Date(th.createdAt).toLocaleString()}</p>
                                         </div>
                                         <div className="text-right">
                                            <p className={`font-black text-xl ${th.score >= 4 ? 'text-green-400' : 'text-yellow-400'}`}>{th.score} / {th.totalQuestions}</p>
                                            <p className="text-xs text-gray-400">{th.timeTaken}s elapsed</p>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    )}
                </motion.div>
            )}

            {/* ACTIVE TEST ENGINE UI */}
            {status === 'test' && (
                <div className="space-y-6">
                    {/* Test Header */}
                    <div className="glass-panel p-6 rounded-2xl flex justify-between items-center border border-white/10 sticky top-4 z-50 backdrop-blur-3xl shadow-2xl">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
                            <span className="font-extrabold text-[#00ccff]">{questions[currentIndex].section}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-5 py-2 rounded-lg font-black font-mono text-xl ${timeLeft < 60 ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-[#00ffa3]/10 text-[#00ffa3]'}`}>
                            <Timer size={24} />
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    {/* Question Card */}
                    <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-medium leading-relaxed mb-8 border-l-4 border-[#00ccff] pl-6 py-2">{questions[currentIndex].q}</h3>
                            <div className="space-y-4">
                                {questions[currentIndex].options.map((opt, i) => {
                                    const isSelected = answers[questions[currentIndex].id] === opt;
                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => handleAnswer(questions[currentIndex].id, opt)}
                                            className={`p-5 rounded-xl border transition cursor-pointer flex items-center gap-4 ${isSelected ? 'border-[#00ccff] bg-[#00ccff]/10 drop-shadow-[0_0_15px_rgba(0,204,255,0.2)]' : 'border-white/10 hover:bg-white/5'}`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#00ccff]' : 'border-gray-500'}`}>
                                                {isSelected && <div className="w-3 h-3 bg-[#00ccff] rounded-full"></div>}
                                            </div>
                                            <span className="text-lg font-medium text-gray-200">{opt}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={() => toggleMarkReview(questions[currentIndex].id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition border ${markedReview.has(questions[currentIndex].id) ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'glass-panel hover:bg-white/5'}`}
                        >
                            <Bookmark size={20} /> Review Later
                        </button>
                        
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setCurrentIndex(p => Math.max(0, p - 1))} 
                                disabled={currentIndex === 0}
                                className="glass-panel px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft size={20} /> Previous
                            </button>
                            {currentIndex === questions.length - 1 ? (
                                <button 
                                    onClick={submitTest}
                                    disabled={Object.keys(answers).length < questions.length}
                                    className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl font-black text-black flex items-center gap-2 hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:grayscale"
                                >
                                    <CheckCircle size={20} /> Final Submit
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))} 
                                    className="glass-panel px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/5 text-[#00ccff] border-[#00ccff]/30"
                                >
                                    Next <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* RESULTS ENGINE */}
            {status === 'evaluation' && resultData && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                    
                    {/* Score Header */}
                    <div className="glass-panel p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between border-2 border-[#00ccff]/20 bg-gradient-to-br from-[#00ccff]/5 to-transparent">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-4xl font-extrabold mb-2">Performance Analytics</h2>
                            <p className="text-gray-400">Time elapsed: <span className="text-white font-bold">{formatTime(resultData.timeTaken)}</span> | Role Profile: <span className="text-[#00ccff]">{role}</span></p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Algorithm Score</p>
                                <p className={`text-6xl font-black drop-shadow-2xl ${resultData.score >= 4 ? 'text-green-400' : resultData.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {resultData.score}<span className="text-3xl opacity-50 text-gray-500">/5</span>
                                </p>
                            </div>
                            <div className="w-24 h-24">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[{value: resultData.score}, {value: resultData.totalQuestions - resultData.score}]} cx="50%" cy="50%" innerRadius={30} outerRadius={40} dataKey="value" stroke="none">
                                            <Cell fill={resultData.score >= 4 ? '#00ffa3' : '#ff4d4d'} />
                                            <Cell fill="#ffffff15" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recommendations */}
                        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
                            <div>
                                <h3 className="text-lg font-bold border-b border-white/10 pb-3 mb-4 flex items-center gap-2"><CheckCircle className="text-green-400"/> Proven Strengths</h3>
                                <ul className="space-y-2">
                                    {resultData.strengths.map((s,i) => <li key={i} className="text-sm text-green-300 bg-green-900/20 px-3 py-1.5 rounded-md border border-green-500/20">{s}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold border-b border-white/10 pb-3 mb-4 flex items-center gap-2"><AlertCircle className="text-red-400"/> Critical Weaknesses</h3>
                                <ul className="space-y-2">
                                    {resultData.weaknesses.length > 0 ? resultData.weaknesses.map((w,i) => <li key={i} className="text-sm text-red-300 bg-red-900/20 px-3 py-1.5 rounded-md border border-red-500/20">{w}</li>) : <li className="text-sm text-gray-400">None detected! Exceptional.</li>}
                                </ul>
                            </div>
                        </div>

                        {/* Review Breakdown */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-2xl font-extrabold mb-4 pl-2">Question Breakdown & Rationale</h3>
                            {resultData.evaluatedQuestions.map((q, i) => {
                                const isCorrect = q.answer === resultData.userAnswers[q.id];
                                return (
                                    <div key={i} className={`p-6 rounded-xl border-l-4 bg-black/40 ${isCorrect ? 'border-l-green-400 border border-t-0 border-r-0 border-b-0' : 'border-l-red-500 border border-t-0 border-r-0 border-b-0'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-bold text-gray-200 w-5/6 leading-relaxed">{i+1}. {q.q}</h4>
                                            {isCorrect ? <CheckCircle size={24} className="text-green-400" /> : <AlertCircle size={24} className="text-red-500" />}
                                        </div>
                                        
                                        {!isCorrect && (
                                            <p className="text-sm text-red-400 line-through mb-2 opacity-80">You: {resultData.userAnswers[q.id] || "Skipped"}</p>
                                        )}
                                        <div className="bg-[#00ccff]/10 border border-[#00ccff]/20 p-4 rounded-lg mt-4">
                                            <p className="text-sm font-bold text-[#00ccff] mb-1">Correct Answer: {q.answer}</p>
                                            <p className="text-xs text-blue-200 mt-2">{q.explanation}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button onClick={() => setStatus('intro')} className="px-8 py-4 glass-panel rounded-xl font-bold flex items-center gap-3 hover:bg-white/10 hover:border-white/50 transition">
                            <RefreshCw size={20} /> Return to Dashboard
                        </button>
                    </div>

                </motion.div>
            )}

        </div>
    );
}
