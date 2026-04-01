"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/context/DashboardContext';
import { Brain, Briefcase, Target, Activity, CheckCircle, AlertTriangle, XCircle, TrendingUp, Filter, MessageSquare, Zap } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, LineChart, Line } from 'recharts';

export default function CandidateIntelligencePage() {
    const { dnaResult } = useDashboard();
    const role = dnaResult?.top_careers?.[0] || 'Software Engineer';
    const coreSkills = dnaResult?.extracted_skills?.slice(0, 5) || ['React', 'Node.js', 'System Design'];

    const [viewMode, setViewMode] = useState('recruiter'); // 'recruiter' or 'cognitive'

    // Mock Heuristic Analytics mapped contextually
    const hireProbability = Math.min(95, 60 + (coreSkills.length * 5));
    const isHireable = hireProbability > 70;

    const cognitiveData = [
        { metric: 'Logical Reasoning', score: 85, ideal: 90 },
        { metric: 'Problem Breakdown', score: 65, ideal: 95 },
        { metric: 'STAR Structure', score: 50, ideal: 100 },
        { metric: 'Communication', score: 90, ideal: 85 },
        { metric: 'Edge Case Prep', score: 40, ideal: 90 }
    ];

    const flowData = [
        { phase: 'Situation', optimal: 100, actual: 95 },
        { phase: 'Task', optimal: 100, actual: 40 },
        { phase: 'Action', optimal: 100, actual: 60 },
        { phase: 'Result', optimal: 100, actual: 20 },
    ];

    return (
        <div className="max-w-7xl mx-auto pt-4 space-y-8 animate-in fade-in">
            {/* Header & Toggle */}
            <div className="text-center space-y-6">
                <div>
                    <h1 className="text-4xl font-extrabold pb-2">Candidate Intelligence Matrix</h1>
                    <p className="text-gray-400">Post-Simulation 360° Assessment for the <span className="text-white font-bold">{role}</span> profile</p>
                </div>
                
                <div className="inline-flex glass-panel rounded-full p-1 border border-white/10 relative">
                     <div 
                         className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#00ccff] to-[#00ff99] rounded-full transition-all duration-300 ease-out z-0"
                         style={{ left: viewMode === 'recruiter' ? '4px' : '50%' }}
                     />
                     <button 
                         onClick={() => setViewMode('recruiter')}
                         className={`relative z-10 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition ${viewMode === 'recruiter' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                     >
                         <Briefcase size={18} /> Recruiter Mind View
                     </button>
                     <button 
                         onClick={() => setViewMode('cognitive')}
                         className={`relative z-10 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition ${viewMode === 'cognitive' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                     >
                         <Brain size={18} /> Thought Process Analyzer
                     </button>
                </div>
            </div>

            {/* Dynamic Rendering Container */}
            <AnimatePresence mode="wait">
                {viewMode === 'recruiter' && (
                    <motion.div 
                        key="recruiter"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Shortlist Decision Panel */}
                            <div className="lg:col-span-1 glass-panel p-8 rounded-3xl border border-white/10 text-center flex flex-col justify-center relative overflow-hidden">
                                {isHireable ? (
                                    <div className="absolute inset-0 bg-[#00ff99]/5"></div>
                                ) : (
                                    <div className="absolute inset-0 bg-red-500/5"></div>
                                )}
                                
                                <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest relative z-10">ATS Decision Engine</h3>
                                <div className="relative z-10 mb-4">
                                     {isHireable ? <CheckCircle size={80} className="mx-auto text-[#00ff99] drop-shadow-[0_0_20px_rgba(0,255,153,0.5)]" /> : <XCircle size={80} className="mx-auto text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />}
                                </div>
                                <h2 className={`text-4xl font-black mb-2 relative z-10 ${isHireable ? 'text-[#00ff99]' : 'text-red-500'}`}>
                                    {isHireable ? 'SHORTLISTED' : 'REJECTED'}
                                </h2>
                                <p className="text-gray-400 font-mono text-sm relative z-10">Calculated hire probability: <span className="text-white">{hireProbability}%</span></p>
                            </div>

                            {/* Strengths and Concerns */}
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass-panel p-6 rounded-3xl border border-[#00ff99]/20">
                                    <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#00ff99]"><Target size={20}/> Technical Strengths</h3>
                                    <ul className="space-y-3">
                                        {coreSkills.map((skill, index) => (
                                             <li key={index} className="flex items-start gap-3 text-sm text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5">
                                                 <CheckCircle className="text-[#00ff99] shrink-0" size={16} mt={0.5} />
                                                 High demonstrative proficiency in {skill} aligns with external benchmarks.
                                             </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="glass-panel p-6 rounded-3xl border border-red-500/20">
                                    <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-red-400"><AlertTriangle size={20}/> Core Concerns</h3>
                                    <ul className="space-y-3">
                                         <li className="flex items-start gap-3 text-sm text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5">
                                             <AlertTriangle className="text-red-400 shrink-0" size={16} mt={0.5} />
                                             Heavy logic mapping detected, but behavioral phrasing lacks corporate formal structure.
                                         </li>
                                         <li className="flex items-start gap-3 text-sm text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5">
                                             <AlertTriangle className="text-red-400 shrink-0" size={16} mt={0.5} />
                                             Resume lacks sufficient measurable scale (missing specific financial or traffic impact metrics).
                                         </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Recruiter Summary */}
                        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center gap-6">
                             <div className="bg-[#00ccff]/20 p-4 rounded-full"><Filter className="text-[#00ccff]" size={32}/></div>
                             <div>
                                 <h3 className="font-bold text-lg">Recruiter's Final Note</h3>
                                 <p className="text-gray-400 text-sm mt-1">"The candidate possesses excellent raw skills ({coreSkills[0]}, {coreSkills[1]}), but frequently struggles to translate complex thoughts into the STAR framework. Will advance to technical round with caution flag regarding communication conciseness."</p>
                             </div>
                        </div>
                    </motion.div>
                )}

                {viewMode === 'cognitive' && (
                    <motion.div 
                        key="cognitive"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* Cognitive Radar */}
                            <div className="glass-panel p-8 rounded-3xl border border-[#00ccff]/20">
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><Brain className="text-[#00ccff]"/> Brain-Mapping Quality</h3>
                                <p className="text-sm text-gray-400 mb-6">Evaluating depth of logic, edge-case anticipation, and verbal translation.</p>
                                
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={cognitiveData} outerRadius={100}>
                                        <PolarGrid stroke="#333" />
                                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#888', fontSize: 11 }} />
                                        <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#000', borderRadius: '8px'}} />
                                        <Radar name="Your Cognitive Profile" dataKey="score" stroke="#00ccff" fill="#00ccff" fillOpacity={0.4} />
                                        <Radar name="Optimal Baseline" dataKey="ideal" stroke="#00ff99" fill="#00ff99" fillOpacity={0.1} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Ideal vs Actual Flow */}
                            <div className="glass-panel p-8 rounded-3xl border border-white/10">
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><Activity className="text-white"/> Thought Execution Flow</h3>
                                <p className="text-sm text-gray-400 mb-6">Tracking how heavily you emphasized each framework component.</p>

                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={flowData}>
                                        <XAxis dataKey="phase" stroke="#888" fontSize={12} />
                                        <YAxis stroke="#888" fontSize={12} />
                                        <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#000', borderRadius: '8px'}} />
                                        <Line type="monotone" dataKey="actual" stroke="#ff4d4d" strokeWidth={3} name="Your Flow Mapping" />
                                        <Line type="dashed" dataKey="optimal" stroke="#00ff99" strokeWidth={2} name="Ideal STAR Flow" strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>

                                <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-4 items-start text-sm text-gray-300">
                                     <AlertTriangle className="text-red-400 shrink-0" size={20} />
                                     <div>
                                         <strong className="text-red-400 block mb-1">Fatal Skip Detected</strong>
                                         You spent 95% of your conversational timeframe describing the <strong className="text-white">Situation</strong>, completely neglecting the <strong className="text-white">Result</strong> phase. You must close your thoughts with measurable impacts.
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Cross-Insight Differentiator Rule */}
                        <div className="glass-panel p-8 rounded-3xl border-l-[6px] border-l-[#ff9900] bg-gradient-to-r from-[#ff9900]/10 to-transparent">
                             <h3 className="text-xl font-black mb-2 flex items-center gap-3"><Zap className="text-[#ff9900]" /> Intelligence Cross-Synthesizer</h3>
                             <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">
                                 The Recruiter View marked your profile highly due to keyword density and core technical skills. However, the Thought Process Analyzer detected extreme structural deficiencies in your verbal delivery. <strong className="text-white">Why good thinkers fail:</strong> You possess the technical logic to solve complex problems, but because your delivery structure skips the "Task & Result" mapping entirely, corporate recruiters will incorrectly assume you lack project-completion experience. 
                                 <br/><br/>
                                 <strong className="text-[#ff9900]">Actionable Fix:</strong> Force yourself to explain the "Why" and the "Result" before diving into the mathematical logic.
                             </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
