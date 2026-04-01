"use client";
import { useDashboard } from '@/context/DashboardContext';
import { motion } from 'framer-motion';

export default function DnaPage() {
    const { dnaResult } = useDashboard();

    if (!dnaResult) return <div className="text-gray-400 font-bold text-xl">Upload required to view DNA.</div>;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Career Profile & DNA</h2>
            
            <div className="glass-panel p-8 rounded-xl border-t-4 border-t-[#00ccff]">
                <h3 className="text-gray-400 font-semibold mb-2">Assigned Identity</h3>
                <h2 className="text-4xl font-bold neon-text mb-8">{dnaResult.career_identity}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-4">Core Strengths</h4>
                    <ul className="space-y-3 mb-6 text-gray-300">
                        {dnaResult.strengths?.map((str, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#00ccff] shadow-[0_0_10px_#00ccff]" /> {str}
                        </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-white mb-4">Top Matched Careers</h4>
                    <div className="flex flex-col gap-3">
                        {dnaResult.top_careers?.map((c, i) => (
                        <span key={i} className={`px-4 py-2 rounded-lg font-medium border ${i===0 ? "bg-[#00ccff]/20 border-[#00ccff] text-[#00ccff]" : "glass-panel text-gray-300"}`}>
                            #{i+1} {c}
                        </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="font-semibold text-lg text-[#00ccff] mb-4">Extracted AI Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                        {dnaResult.extracted_skills?.map((s, i) => (
                            <span key={i} className="bg-gray-800 border border-gray-700 px-3 py-1 rounded text-sm text-gray-400 capitalize">{s}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
