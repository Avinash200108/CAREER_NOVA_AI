"use client";
import { useDashboard } from '@/context/DashboardContext';
import { motion } from 'framer-motion';
import { ExternalLink, Video, Award, BookText } from 'lucide-react';

export default function CoursesPage() {
    const { courses } = useDashboard();

    if (!courses || courses.length === 0) return null;

    const getIcon = (type) => {
        if (type.includes("Video")) return <Video className="text-red-400" />;
        if (type.includes("Certificate")) return <Award className="text-yellow-400" />;
        return <BookText className="text-blue-400" />;
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Recommended Free Courses</h2>
                <p className="text-gray-400">Targeted learning paths curated from platforms like YouTube, Coursera, NPTEL and Indeed to fill your specific skill gaps.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, idx) => (
                    <a 
                        href={course.link} 
                        target="_blank" 
                        rel="noreferrer"
                        key={idx} 
                        className="glass-panel block border hover:border-[#00ccff]/60 border-white/10 p-6 rounded-xl transition group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            {getIcon(course.type)}
                        </div>
                        
                        <div className="flex gap-4 items-start mb-4">
                            <div className="p-3 bg-black/40 rounded-lg shrink-0">
                                {getIcon(course.type)}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold group-hover:text-[#00ccff] transition tracking-tight leading-tight">{course.title}</h4>
                                <p className="text-[#00ccff] font-medium text-sm mt-1">{course.platform}</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-6 p-4 bg-black/30 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold border border-gray-700 px-2 py-1 rounded">
                                    {course.type}
                                </span>
                            </div>
                            <div className="text-right flex items-center gap-2">
                                <span className="font-bold text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">{course.free}</span>
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </motion.div>
    );
}
