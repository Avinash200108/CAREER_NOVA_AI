"use client";
import { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Briefcase, Building2, BellRing } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarketAnalyzerPage() {
    const { dnaResult } = useDashboard();
    
    // 1. Initial State matching User's Career DNA Top Career
    const defaultRole = dnaResult?.top_careers && dnaResult.top_careers.length > 0 ? dnaResult.top_careers[0] : "Software Engineer";
    
    const [role, setRole] = useState(defaultRole);
    const [experience, setExperience] = useState('Mid-level');
    const [location, setLocation] = useState('Global Remote');

    // Derived mock datasets matching the 11 hackathon requirements
    const [marketStats, setMarketStats] = useState({});
    
    const COLORS = ['#00ccff', '#00ff99', '#7b2cbf', '#ff0055'];

    useEffect(() => {
        // Mock algorithmic data generator based on selected filters
        const baseDemand = role.toLowerCase().includes('data') || role.toLowerCase().includes('ai') || role.toLowerCase().includes('machine') ? 95 : 
                           role.toLowerCase().includes('design') ? 80 : 
                           role.toLowerCase().includes('software') ? 88 : 75;
                           
        const demandLvl = baseDemand > 90 ? 'High Growth Target' : baseDemand > 80 ? 'Stable Demand' : 'Saturated / Competitive';
        const multiplier = experience === 'Senior' ? 1.5 : experience === 'Mid-level' ? 1.0 : 0.6;
        
        const openJobs = Math.floor((baseDemand * multiplier * 1200) + Math.random() * 500);
        
        const avgSalary = Math.floor((role.includes('AI') || role.includes('Data') ? 120000 : 90000) * multiplier);

        // Required Skills Generation (Requirement 3)
        const topSkills = role.includes('Data') || role.includes('AI') ? ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'GenAI'] :
                          role.includes('Design') || role.includes('UI') ? ['Figma', 'Prototyping', 'User Research', 'React'] :
                          role.includes('Engineer') ? ['JavaScript', 'System Design', 'Cloud/AWS', 'Microservices'] :
                          ['Project Management', 'Agile', 'Communication'];

        setMarketStats({
            demandLevel: demandLvl,
            openings: openJobs.toLocaleString(),
            avgSalary: `$${(avgSalary/1000).toFixed(0)}k - $${((avgSalary * 1.3)/1000).toFixed(0)}k`,
            skills: topSkills,
            companies: ['Google', 'Microsoft', 'Netflix', 'OpenAI', 'Amazon'].sort(() => 0.5 - Math.random()).slice(0, 3)
        });
    }, [role, experience, location]);

    // Trend Lines (Requirement 7)
    const trendData = [
        { month: 'Jul', demand: 4000 },
        { month: 'Aug', demand: 4500 },
        { month: 'Sep', demand: 5200 },
        { month: 'Oct', demand: 6100 },
        { month: 'Nov', demand: 6800 },
        { month: 'Dec', demand: 8500 },
    ];

    // Salary vs Exp Bars (Requirement 5)
    const salaryData = [
        { level: 'Fresher', min: 60, max: 90 },
        { level: 'Mid-level', min: 90, max: 140 },
        { level: 'Senior', min: 140, max: 210 },
    ];

    // Industry Distribution (Requirement 1, 7)
    const industryData = [
        { name: 'Tech / SaaS', value: 45 },
        { name: 'Finance', value: 25 },
        { name: 'Healthcare', value: 20 },
        { name: 'Retail', value: 10 },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header & Alerts (Requirement 9) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-3xl font-extrabold neon-text">Job Market Analyzer</h2>
                    <p className="text-gray-400 mt-1">Real-time macro demand, salary benchmarking, and trending industries.</p>
                </div>
                
                <div className="glass-panel px-4 py-3 rounded-xl flex items-center gap-3 border border-[#00ffa3]/30 bg-[#00ffa3]/5">
                    <div className="p-2 bg-[#00ffa3]/20 rounded-lg text-[#00ffa3] animate-pulse">
                        <BellRing size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Smart Alert</p>
                        <p className="text-sm font-semibold text-[#00ffa3]">Surge in demand for {role} tools.</p>
                    </div>
                </div>
            </div>

            {/* Filters Navigation (Requirement 8) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="glass-panel w-full p-4 rounded-xl text-white outline-none cursor-pointer hover:border-[#00ccff]/50 transition appearance-none">
                    <option value={defaultRole}>{defaultRole} (Your DNA)</option>
                    <option value="AI Engineer">AI Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                </select>

                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="glass-panel w-full p-4 rounded-xl text-white outline-none cursor-pointer hover:border-[#00ccff]/50 transition appearance-none">
                    <option value="Fresher">Entry Level (Fresher)</option>
                    <option value="Mid-level">Mid-level (2-5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                </select>

                <select value={location} onChange={(e) => setLocation(e.target.value)} className="glass-panel w-full p-4 rounded-xl text-white outline-none cursor-pointer hover:border-[#00ccff]/50 transition appearance-none">
                    <option value="Global Remote">Global Remote</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="New York, NY">New York, NY</option>
                    <option value="London, UK">London, UK</option>
                    <option value="Bangalore, IN">Bangalore, IN</option>
                </select>
                
                <div className="glass-panel bg-gradient-to-r from-[#00ccff]/10 to-transparent p-4 rounded-xl flex items-center gap-4">
                    <Briefcase className="text-[#00ccff]" />
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Total Openings</p>
                        <p className="text-xl font-black text-white">{marketStats.openings}</p>
                    </div>
                </div>
            </div>

            {/* Top Stat Grid (Requirement 2) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#00ccff]">
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Market Sentiment</h3>
                    <p className="text-2xl font-black">{marketStats.demandLevel}</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#00ff99]">
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Average Base Salary</h3>
                    <p className="text-2xl font-black">{marketStats.avgSalary}</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#7b2cbf]">
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Top Location Demand</h3>
                    <p className="text-2xl font-black flex items-center gap-2"><MapPin size={22} className="text-[#7b2cbf]"/> {location}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Line Chart: Demand Over Time */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="text-[#00ccff]" />
                        <h3 className="text-lg font-bold">Hiring Volume Trends (6 Months)</h3>
                    </div>
                    <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="month" stroke="#ffffff50" axisLine={false} tickLine={false} />
                                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                                <Tooltip contentStyle={{ backgroundColor: '#000000ee', borderColor: '#00ccff50', borderRadius: '10px' }} />
                                <Line type="monotone" dataKey="demand" stroke="#00ccff" strokeWidth={4} dot={{ fill: '#00ccff', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, fill: '#fff' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Industry Distribution */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-4 w-full text-left">Industry Distribution</h3>
                    <div className="w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={industryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                                    {industryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '10px', borderColor: '#333' }} itemStyle={{ color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full mt-4 flex justify-center gap-4 flex-wrap">
                        {industryData.map((ind, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-300">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                                {ind.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart: Salary vs Exp */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6">Salary Benchmarks by Exp ($K)</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salaryData} layout="vertical" margin={{ left: 10, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                                <XAxis type="number" stroke="#ffffff50" axisLine={false} tickLine={false} />
                                <YAxis dataKey="level" type="category" stroke="#ffffffaa" axisLine={false} tickLine={false} width={80}/>
                                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#000', borderRadius: '10px', borderColor: '#333' }} />
                                <Bar dataKey="max" fill="url(#colorSal)" radius={[0, 4, 4, 0]} barSize={20} />
                                <defs>
                                    <linearGradient id="colorSal" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="5%" stopColor="#00ccff" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#00ff99" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Additional Insight Cards (Requirement 3, 6) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-transparent to-[#7b2cbf]/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="text-[#7b2cbf]" />
                            <h3 className="font-bold">Top Hiring Companies</h3>
                        </div>
                        <ul className="space-y-3">
                            {marketStats.companies?.map((comp, idx) => (
                                <li key={idx} className="flex justify-between items-center bg-black/40 px-4 py-2 rounded-lg text-sm border border-white/5">
                                    <span className="font-semibold">{comp}</span>
                                    <span className="text-xs text-[#00ff99] font-bold">Actively Hiring</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="font-bold mb-4">Must-Have Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {marketStats.skills?.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm font-medium hover:border-[#00ccff] hover:text-[#00ccff] transition cursor-default tracking-wide text-gray-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
}
