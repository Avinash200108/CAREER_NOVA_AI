"use client";
import { useDashboard } from '@/context/DashboardContext';
import { motion } from 'framer-motion';

export default function CollegesPage() {
    const { colleges } = useDashboard();

    if (!colleges) return null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-6">
            <h2 className="text-3xl font-bold mb-6">Smart College Match</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colleges.map((col, idx) => (
                <div key={idx} className="glass-panel border hover:border-[#00ccff]/50 border-white/10 p-6 rounded-xl transition cursor-default group">
                    <div className="flex justify-between items-start mb-6">
                        <h4 className="text-2xl font-bold group-hover:text-[#00ccff] transition">{col.name}</h4>
                        <span className="text-3xl">{col.label}</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-lg">
                        <div>
                            <p className="text-gray-400 text-sm">Match Probability</p>
                            <p className="font-extrabold text-[#00ccff] text-xl">{col.match}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-sm">Est. Fees</p>
                            <p className="font-extrabold text-white text-xl">{col.fees}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </motion.div>
    );
}
