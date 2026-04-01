"use client";
import { useState, useEffect, useRef } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, MessageSquare, AlertTriangle, CheckCircle, ShieldCheck, Power, RefreshCw, Send, Coffee, Briefcase, Cpu } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function MockInterviewPage() {
    const { dnaResult } = useDashboard();
    const role = dnaResult?.top_careers?.[0] || 'Software Engineer';
    
    // States: setup -> live -> report
    const [phase, setPhase] = useState('setup'); 
    
    // Chat & AI State
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    
    // CV State
    const [warning, setWarning] = useState(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [hardwareEnabled, setHardwareEnabled] = useState(false);
    
    // Interview Persona Engine State
    const [persona, setPersona] = useState(null);

    // Analytics State
    const [report, setReport] = useState(null);

    const questionBanks = {
        startup: [
            `Question 1 of 5: Hey there! Glad you could make it. We are building some wild stuff for ${role}s. Tell me about the coolest side project you've ever built?`,
            `Question 2 of 5: Awesome! Fast iteration is huge here. If your code broke production on a Friday night, how would you handle it?`,
            `Question 3 of 5: Love the hustle. What's a technology you've learned entirely on your own just because you found it interesting?`,
            `Question 4 of 5: We wear a lot of hats here. Describe a time you had to do a job that was completely outside your formal title.`,
            `Question 5 of 5: Final question! Why do you want to join a crazy, high-tempo startup instead of a safe corporate job?`
        ],
        faang: [
            `Question 1 of 5: Hello. I am your Senior Technical Director. Tell me about the most complex algorithmic challenge you've solved as a ${role}.`,
            `Question 2 of 5: Interesting. Describe a time you had to optimize the time or space complexity of a critical system. What were the Big-O metrics?`,
            `Question 3 of 5: Consider a system design scenario. How would you architect a distributed caching layer that must handle 10 million QPS?`,
            `Question 4 of 5: How do you mathematically guarantee thread safety in a highly concurrent environment?`,
            `Question 5 of 5: Final technical question. Describe a time you strongly disagreed with a Principal Engineer. How did you analytically justify your architecture?`
        ],
        hr: [
            `Question 1 of 5: Good afternoon. Please walk me chronologically through your professional history relevant to the ${role} position.`,
            `Question 2 of 5: Thank you. Please describe a time you faced a difficult conflict with a coworker. How was it resolved according to company policy?`,
            `Question 3 of 5: What is your greatest professional weakness, and what specific frameworks have you developed to mitigate it in the workplace?`,
            `Question 4 of 5: Where do you strictly see yourself aligning within our corporate structure in the next five years?`,
            `Question 5 of 5: Final question. Why should we select you over equally qualified candidates relying solely on your measurable impact?`
        ]
    };

    const currentQuestions = persona ? questionBanks[persona] : [];

    // Hardware Mounting (Requirement 1 & 3)
    const requestHardware = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            setHardwareEnabled(true);
        } catch (err) {
            console.error("Camera access denied", err);
            alert("Camera/Mic permissions are required for the AI Posture Analysis simulation.");
        }
    };

    const startInterview = () => {
        if (!hardwareEnabled) return alert("Please enable hardware metrics first.");
        setPhase('live');
        setMessages([{ sender: 'ai', text: currentQuestions[0] }]);
    };

    const triggerMalpractice = () => {
        if(streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
        setWarning("❌ CRITICAL: MULTIPLE FACES DETECTED IN THE FRAME.");
        
        setTimeout(() => {
            setPhase('report');
            setReport({
                overall: 0,
                sections: { Technical: 0, Communication: 0, Confidence: 0, BodyLanguage: 0 },
                strengths: [],
                weaknesses: ["INTERVIEW TERMINATED: Multi-face tracking violation recorded. Security malpractice logged."]
            });
        }, 3000);
    };

    // Genuine Face-API Tracker & Stream attachment
    useEffect(() => {
        if (phase === 'live' && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
            
            let trackerInterval;
            
            const initTracking = async () => {
                try {
                    const faceapi = await import('@vladmandic/face-api');
                    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                    
                    trackerInterval = setInterval(async () => {
                        if (videoRef.current) {
                            const detections = await faceapi.detectAllFaces(
                                videoRef.current, 
                                new faceapi.TinyFaceDetectorOptions()
                            );
                            
                            if (detections.length > 1) {
                                clearInterval(trackerInterval);
                                triggerMalpractice();
                            }
                        }
                    }, 1000); 
                } catch (e) {
                    console.error("Tracking mount failed", e);
                }
            };
            
            videoRef.current.addEventListener('play', initTracking);
            return () => {
                clearInterval(trackerInterval);
                if (videoRef.current) videoRef.current.removeEventListener('play', initTracking);
            }
        }
    }, [phase]);

    // Simulated Computer Vision Alerts (Requirement 4, 5, 6)
    useEffect(() => {
        if (phase !== 'live') return;
        
        const triggers = [
            "Maintain consistent eye contact with the camera.",
            "Posture anomaly: Please sit upright.",
            "Voice baseline low: Speak louder and more confidently.",
            "Excessive movement detected."
        ];
        
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                setWarning(triggers[Math.floor(Math.random() * triggers.length)]);
                setTimeout(() => setWarning(null), 4000);
            }
        }, 8000); // Randomly check every 8 seconds

        return () => clearInterval(interval);
    }, [phase]);

    // Chat Controller
    const handleSend = () => {
        if (!userInput.trim()) return;
        
        const newMsg = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMsg);
        setUserInput("");
        setIsTyping(true);

        // Core Interaction Advance
        const proceedNext = (messagesArray) => {
             const nextIdx = questionIndex + 1;
             if (nextIdx < currentQuestions.length) {
                 setMessages([...messagesArray, { sender: 'ai', text: currentQuestions[nextIdx] }]);
                 setQuestionIndex(nextIdx);
                 setIsTyping(false);
             } else {
                 setMessages([...messagesArray, { sender: 'ai', text: "Thank you for your time. Terminating feed and compiling your behavioral and technical analysis now." }]);
                 setIsTyping(false);
                 setTimeout(() => generateFinalReport(), 3000);
             }
        };

        // Micro-Behavior Simulation Engine based on Persona
        setTimeout(() => {
            if (persona === 'faang' && Math.random() > 0.6 && questionIndex > 0) {
                 const interruption = [...newMsg, { sender: 'ai', text: "Hmm... that's not strictly mathematically optimal, but I'll allow it. Moving on." }];
                 setMessages(interruption);
                 setTimeout(() => proceedNext(interruption), 2000);
            } 
            else if (persona === 'hr' && userInput.length > 80 && Math.random() > 0.6) {
                 const interruption = [...newMsg, { sender: 'ai', text: "Please be more concise and stick strictly to the question parameters." }];
                 setMessages(interruption);
                 setTimeout(() => proceedNext(interruption), 2000);
            }
            else if (persona === 'startup' && Math.random() > 0.6 && questionIndex > 0) {
                 const interruption = [...newMsg, { sender: 'ai', text: "Haha love that energy!" }];
                 setMessages(interruption);
                 setTimeout(() => proceedNext(interruption), 1500);
            }
            else {
                 proceedNext(newMsg);
            }
        }, 1500);
    };

    const generateFinalReport = () => {
        if(streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop()); // kill camera
        }
        
        // Requirements 7 & 8: Scoring Engine
        const mockScore = {
            overall: 82,
            sections: {
                Technical: Math.floor(Math.random() * 20) + 70,     // 70-90
                Communication: Math.floor(Math.random() * 20) + 75, // 75-95
                Confidence: Math.floor(Math.random() * 30) + 60,    // 60-90
                BodyLanguage: Math.floor(Math.random() * 20) + 65   // 65-85
            },
            strengths: ["Structured STAR method responses", "Good technical vocabulary used"],
            weaknesses: ["Eye contact drifted during technical explanations", "Speaking pace too fast"]
        };

        setReport(mockScore);
        
        // Requirement 10: DB Persistence tracking
        fetch('http://localhost:5000/api/mock-interview/submit', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockScore)
        }).catch(err => console.error("History saving failed:", err));

        setPhase('report');
    };

    const radarData = report ? [
        { subject: 'Technical Accuracy', A: report.sections.Technical, fullMark: 100 },
        { subject: 'Communication', A: report.sections.Communication, fullMark: 100 },
        { subject: 'Confidence', A: report.sections.Confidence, fullMark: 100 },
        { subject: 'Body Alignment', A: report.sections.BodyLanguage, fullMark: 100 },
    ] : [];

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in pt-4">
            
            {phase === 'setup' && (
                <div className="glass-panel max-w-5xl mx-auto p-12 rounded-3xl space-y-10 border-[0.5px] border-[#00ccff]/30 shadow-[0_0_50px_rgba(0,204,255,0.05)]">
                    <div className="text-center">
                        <Video size={64} className="mx-auto text-[#00ccff] drop-shadow-[0_0_15px_rgba(0,204,255,0.5)] mb-4" />
                        <h2 className="text-4xl font-extrabold mb-4">Advanced AI Interview Post</h2>
                        <p className="text-gray-400 text-lg">
                            Select your Interviewer Persona. We will conduct technical & behavioral stress tests for <span className="text-white font-bold">{role}</span> based strictly on the selected culture logic.
                        </p>
                    </div>

                    {/* Persona Selector Array */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div onClick={() => setPersona('startup')} className={`p-6 rounded-2xl cursor-pointer text-center border-2 transition ${persona === 'startup' ? 'border-[#ff9900] bg-[#ff9900]/10 shadow-[0_0_30px_rgba(255,153,0,0.3)]' : 'border-white/10 glass-panel hover:bg-white/5'}`}>
                              <Coffee size={40} className={`mx-auto mb-4 ${persona === 'startup' ? 'text-[#ff9900]' : 'text-gray-500'}`} />
                              <h3 className="text-xl font-bold mb-2">Chill Startup Founder</h3>
                              <p className="text-sm text-gray-400">Casual, creative tone. Evaluates hustle, problem-solving, and culture fit. Rapid conversational style.</p>
                         </div>
                         <div onClick={() => setPersona('hr')} className={`p-6 rounded-2xl cursor-pointer text-center border-2 transition ${persona === 'hr' ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-white/10 glass-panel hover:bg-white/5'}`}>
                              <Briefcase size={40} className={`mx-auto mb-4 ${persona === 'hr' ? 'text-red-500' : 'text-gray-500'}`} />
                              <h3 className="text-xl font-bold mb-2">Strict Corporate HR</h3>
                              <p className="text-sm text-gray-400">Formal and rigid. Explores policy conflicts, structure, and direct communication. Heavily monitors conciseness.</p>
                         </div>
                         <div onClick={() => setPersona('faang')} className={`p-6 rounded-2xl cursor-pointer text-center border-2 transition ${persona === 'faang' ? 'border-[#00ccff] bg-[#00ccff]/10 shadow-[0_0_30px_rgba(0,204,255,0.3)]' : 'border-white/10 glass-panel hover:bg-white/5'}`}>
                              <Cpu size={40} className={`mx-auto mb-4 ${persona === 'faang' ? 'text-[#00ccff]' : 'text-gray-500'}`} />
                              <h3 className="text-xl font-bold mb-2">FAANG Technical Lead</h3>
                              <p className="text-sm text-gray-400">Deep mathematical analysis. Pushes for extreme edge cases, system limits, and Big-O architectural optimizations.</p>
                         </div>
                    </div>

                    <div className="flex justify-center gap-6 pt-4 border-t border-white/10">
                        <button 
                            onClick={requestHardware}
                            disabled={hardwareEnabled}
                            className={`px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition ${hardwareEnabled ? 'bg-green-500/20 text-green-400 border border-green-500' : 'glass-panel hover:bg-white/10'}`}
                        >
                            {hardwareEnabled ? <CheckCircle /> : <Mic />} {hardwareEnabled ? 'Hardware Connected' : 'Enable Camera & Mic'}
                        </button>

                        {hardwareEnabled && persona && (
                            <motion.button 
                                initial={{ scale: 0.9, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }}
                                onClick={startInterview}
                                className={`font-black uppercase tracking-widest px-8 py-4 rounded-xl transition hover:scale-105 ${
                                    persona === 'startup' ? 'bg-[#ff9900] text-black shadow-[0_0_40px_rgba(255,153,0,0.4)]' : 
                                    persona === 'hr' ? 'bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)]' :
                                    'bg-[#00ccff] text-black shadow-[0_0_40px_rgba(0,204,255,0.4)]'
                                }`}
                            >
                                Initiate {persona.toUpperCase()} Interview
                            </motion.button>
                        )}
                    </div>

                </div>
            )}

            {phase === 'live' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[75vh]">
                    
                    {/* Left: Chatbot Interface */}
                    <div className="glass-panel flex flex-col rounded-3xl border border-white/10 overflow-hidden relative">
                        <div className="bg-black/40 p-4 border-b border-white/10 flex justify-between items-center z-10 w-full backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                <span className="font-bold uppercase tracking-widest text-sm text-gray-300">Nova AI Network</span>
                                <span className={`text-xs px-2 py-1 ml-2 rounded font-mono ${persona === 'startup' ? 'bg-[#ff9900]/20 text-[#ff9900]' : persona === 'hr' ? 'bg-red-500/20 text-red-500' : 'bg-[#00ccff]/20 text-[#00ccff]'}`}>
                                    [{persona.toUpperCase()} PERSPECTIVE ACTIVE]
                                </span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-[#00ccff]/20 text-[#00ccff] rounded font-mono">NLP Active</span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                            {messages.map((m, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                                    key={i} 
                                    className={`max-w-[85%] p-4 rounded-2xl ${m.sender === 'ai' ? 'bg-[#00ccff]/10 border border-[#00ccff]/30 text-[#00ccff] self-start rounded-tl-none' : 'glass-panel self-end rounded-tr-none'}`}
                                >
                                    {m.text}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="self-start px-5 py-3 bg-white/5 rounded-2xl rounded-tl-none flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#00ccff] rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-[#00ccff] rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-[#00ccff] rounded-full animate-bounce delay-200"></span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-black/40 border-t border-white/10 flex gap-3 z-10 w-full">
                            <input 
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your response..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ccff]"
                            />
                            <button onClick={handleSend} className="px-6 bg-[#00ccff] text-black rounded-xl hover:bg-[#00ccff]/80 transition">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right: Camera Feed & CV Analytis HUD */}
                    <div className="glass-panel flex flex-col items-center justify-center rounded-3xl border border-[#00ccff]/20 relative overflow-hidden bg-black">
                        <video ref={videoRef} autoPlay playsInline muted className="absolute w-full h-full object-cover opacity-80" />
                        
                        {/* CV Overlay Graphics */}
                        <div className="absolute inset-0 border-4 border-dashed border-[#00ccff]/20 pointer-events-none rounded-3xl m-8"></div>
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs text-green-400 font-mono font-bold flex items-center gap-2">
                            <Video size={12} /> CAM: ACTIVE_TRACKING
                        </div>

                        <AnimatePresence>
                            {warning && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -20, scale: 0.9 }} 
                                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                    className="absolute top-1/4 bg-yellow-500/90 text-black px-6 py-3 rounded-full font-black flex items-center gap-2 shadow-[0_0_30px_rgba(234,179,8,0.5)] border-2 border-yellow-300 z-20 layout-shadow"
                                >
                                    <AlertTriangle size={20} /> {warning}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Face Tracking Box aesthetic */}
                        <div className="absolute w-64 h-80 border-2 border-[#00ff99]/40 rounded-[40px] pointer-events-none flex justify-center shadow-[inset_0_0_30px_rgba(0,255,153,0.2)]">
                             <div className="absolute top-4 px-2 py-1 bg-black/50 rounded text-[10px] text-[#00ff99] font-mono tracking-widest backdrop-blur-sm border border-[#00ff99]/20">FACIAL PIPELINE [STABLE]</div>
                        </div>

                    </div>
                </div>
            )}

            {/* RESULTS PHASE */}
            {phase === 'report' && report && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                    <div className="glass-panel p-10 rounded-3xl border border-[#00ccff]/20 flex justify-between items-center bg-gradient-to-tr from-[#00ccff]/10 to-transparent">
                         <div>
                             <h2 className="text-4xl font-extrabold mb-2 text-white">Interview Post-Mortem</h2>
                             <p className="text-[#00ccff] tracking-widest uppercase font-bold text-sm">Evaluation Algorithm Completed</p>
                         </div>
                         <div className="text-right">
                             <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Aggregate Readiness</p>
                             <p className="text-6xl font-black neon-text">{report.overall}<span className="text-3xl opacity-50">%</span></p>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Radar Chart Multi-Vector Analysis */}
                        <div className="glass-panel p-6 rounded-3xl min-h-[400px] flex flex-col items-center">
                            <h3 className="text-xl font-bold w-full mb-4">Vector Competency Analysis</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#ffffff20" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 12 }} />
                                    <Radar name="Candidate" dataKey="A" stroke="#00ccff" fill="#00ccff" fillOpacity={0.4} />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '10px' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Breakdown Panels */}
                        <div className="space-y-6">
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-[#00ffa3] bg-gradient-to-r from-[#00ffa3]/5 to-transparent">
                                <h3 className="flex items-center gap-2 font-bold mb-3"><CheckCircle className="text-[#00ffa3]" /> AI Detected Strengths</h3>
                                <ul className="space-y-2">
                                    {report.strengths.map((str, i) => <li key={i} className="text-gray-300 text-sm">• {str}</li>)}
                                </ul>
                            </div>
                            
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-500/5 to-transparent">
                                <h3 className="flex items-center gap-2 font-bold mb-3"><AlertTriangle className="text-yellow-500" /> Focus Areas & Warnings</h3>
                                <ul className="space-y-2">
                                    {report.weaknesses.map((w, i) => <li key={i} className="text-gray-300 text-sm">• {w}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                </motion.div>
            )}

        </div>
    );
}
