"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Activity, Target, Compass, GraduationCap, BookOpen, BarChart2, ClipboardCheck, Video, MonitorPlay, Brain } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import Background from '@/components/3d/Background';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { dnaResult, fitScore, simulation, colleges, courses } = useDashboard();

    const navItems = [
        { href: '/dashboard/dna', label: 'Career DNA', icon: Activity },
        { href: '/dashboard/fit', label: 'Fit Score', icon: Target },
        { href: '/dashboard/market', label: 'Job Market Analysis', icon: BarChart2 },
        { href: '/dashboard/test', label: 'Mock Assessment', icon: ClipboardCheck },
        { href: '/dashboard/interview', label: 'AI Mock Interview', icon: Video },
        { href: '/dashboard/intelligence', label: 'Candidate Intel', icon: Brain },
        { href: '/dashboard/mirror', label: 'Mirror-You Mode', icon: MonitorPlay },
        { href: '/dashboard/simulator', label: 'Future Simulator', icon: Compass },
        { href: '/dashboard/colleges', label: 'College Matches', icon: GraduationCap },
        { href: '/dashboard/courses', label: 'Recommended Courses', icon: BookOpen },
    ];

    const downloadReport = async () => {
        try {
            const API_BASE = "http://localhost:5000/api";
            const res = await fetch(`${API_BASE}/report/download`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dna: dnaResult, fit: fitScore, sim: simulation, colleges: colleges, courses: courses })
            });

            if (!res.ok) throw new Error("Failed to generate PDF");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CareerNova_AI_Report.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden text-white relative font-sans">
            <Background />
            
            {/* Sidebar */}
            <aside className="w-64 glass-panel border-r border-[#00ccff]/20 h-full flex flex-col pt-10 px-6 z-20 shrink-0 shadow-2xl">
                <div className="flex items-center gap-3 mb-10">
                    <img src="/logo.png" alt="CareerNova Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(0,204,255,0.6)] object-cover" />
                    <h1 className="text-2xl font-extrabold neon-text tracking-tight">CareerNova AI</h1>
                </div>
                
                <nav className="flex flex-col gap-4 flex-1 overflow-y-auto pb-6 custom-scrollbar">
                    {navItems.map(item => {
                        const active = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active ? 'bg-[#00ccff]/20 border border-[#00ccff]/50 text-[#00ccff]' : 'hover:bg-white/5 text-gray-400'}`}>
                                <item.icon size={20} className="shrink-0" />
                                <span className="font-semibold text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mb-8 mt-6 pt-6 border-t border-white/10 shrink-0">
                    <button onClick={downloadReport} className="w-full bg-gradient-to-r from-[#00ccff]/20 to-[#00ff99]/20 hover:from-[#00ccff]/40 hover:to-[#00ff99]/40 border border-[#00ccff]/30 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition text-white shadow-lg">
                        <Download size={18} /> Download Report
                    </button>
                    <Link href="/" className="block mt-4 text-center text-sm text-gray-500 hover:text-white transition">Exit Dashboard</Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 z-10 overflow-y-auto relative scroll-smooth overflow-x-hidden">
                {!dnaResult && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6">
                        No active career data found. Please upload a resume first. <Link href="/" className="underline font-bold ml-2">Return Home</Link>
                    </div>
                )}
                <div className={!dnaResult ? "opacity-30 pointer-events-none" : ""}>
                    {children}
                </div>
            </main>
        </div>
    );
}
