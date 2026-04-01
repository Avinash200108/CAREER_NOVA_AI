"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function CareerTimeline({ simulation }) {
  if (!simulation) return null;

  return (
    <div className="w-full text-white glass-panel p-6 rounded-xl mt-6">
      <h3 className="neon-text text-2xl font-bold mb-4">Future Career Simulator: {simulation.career}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[#00ccff]">Day in the Life</h4>
          <div className="relative border-l border-[#00ccff] ml-3 space-y-6">
            {simulation.day_in_life.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                key={idx} 
                className="pl-6 relative"
              >
                <div className="absolute w-3 h-3 bg-[#00ccff] rounded-full -left-[1.5px] top-1.5 shadow-[0_0_10px_#00ccff]"></div>
                <p className="text-sm text-gray-400">{item.time}</p>
                <p className="font-semibold">{item.activity}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-4 text-[#00ccff]">Salary Growth</h4>
          <div className="space-y-4">
            {simulation.salary_growth.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.2 }}
                key={idx} 
                className="bg-[rgba(255,255,255,0.05)] p-3 rounded-lg border border-[#00ccff]/30 flex justify-between items-center"
              >
                <span className="text-gray-300">Year {item.year}</span>
                <span className="text-green-400 font-bold text-lg">{item.salary}</span>
              </motion.div>
            ))}
          </div>

          <h4 className="text-xl font-semibold mt-6 mb-4 text-[#00ccff]">Skill Roadmap</h4>
          <div className="flex flex-wrap gap-2">
            {simulation.skill_roadmap.map((skill, idx) => (
              <span key={idx} className="bg-[#00ccff]/10 text-[#00ccff] border border-[#00ccff]/30 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
