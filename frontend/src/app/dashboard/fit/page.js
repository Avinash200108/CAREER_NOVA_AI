"use client";
import { useDashboard } from '@/context/DashboardContext';
import { motion } from 'framer-motion';
import FitScoreRadar from '@/components/charts/FitScoreRadar';
import ScoreCore from '@/components/3d/ScoreCore';

export default function FitScorePage() {
    const { fitScore } = useDashboard();

    if (!fitScore) return null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-6xl w-full">
            <h2 className="text-3xl font-bold mb-2">Fit & Success Scoring</h2>
            <p className="text-gray-400 mb-6">Real-time dimensional analysis determining exactly how tightly your documented profile matches market demands.</p>

            <div className="glass-panel rounded-3xl relative overflow-hidden border border-[#00ccff]/20 drop-shadow-[0_0_40px_rgba(0,204,255,0.1)] min-h-[600px] flex items-center">
                
                {/* 3D Immersive Animated Core */}
                <ScoreCore score={fitScore.score} />

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full p-10 gap-12 relative z-10">
                    <div className="flex flex-col justify-center max-w-lg">
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            className="flex flex-col mb-8 bg-black/60 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ccff] to-transparent opacity-50"></div>
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Algorithm Score</span>
                            <div className="flex items-center gap-6">
                                <span className={`text-[6rem] font-black leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] ${fitScore.score >= 80 ? "text-[#00ffa3]" : fitScore.score >= 60 ? "text-[#ffb300]" : "text-[#ff4d4d]"}`}>
                                    {fitScore.score}<span className="text-4xl opacity-50">%</span>
                                </span>
                                <span className="text-5xl animate-bounce mt-4">{fitScore.label}</span>
                            </div>
                        </motion.div>
                        
                        <div className="space-y-4 text-sm text-gray-300 bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl">
                            <h4 className="font-extrabold text-white mb-4 text-lg w-full border-b border-white/10 pb-4">AI Structural Rationale</h4>
                            {fitScore.explainability?.map((exp, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 100 }}
                                    key={i} className={`flex items-start gap-3 p-4 rounded-xl bg-black/40 border transition hover:bg-black/60 ${exp.startsWith('+') ? "text-green-300 border-green-500/30" : (exp.startsWith('-') ? "text-red-300 border-red-500/30" : "text-yellow-300 border-yellow-500/30")}`}
                                >
                                    <span className="font-medium text-[15px] leading-relaxed">{exp}</span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-6 italic opacity-70 ml-2">{fitScore.disclaimer}</p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black/30 rounded-3xl border border-white/5 shadow-inner backdrop-blur-md p-6"
                    >
                        <FitScoreRadar scores={fitScore.radar || {}} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
