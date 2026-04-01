"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Mic, Loader2 } from 'lucide-react';
import Background from '@/components/3d/Background';
import { useDashboard } from '@/context/DashboardContext';

export default function Home() {
  const router = useRouter();
  const { runAnalysis } = useDashboard();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadResume = async () => {
    setLoading(true);
    const success = await runAnalysis(file);
    if (success) {
        router.push('/dashboard/dna');
    } else {
        alert("Failed to extract Career DNA.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 text-white relative font-sans flex flex-col">
      <Background />
      
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="CareerNova Logo" className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(0,204,255,0.6)] object-cover" />
            <div>
              <h1 className="text-4xl font-extrabold neon-text tracking-tight">CareerNova AI</h1>
              <p className="text-gray-400 mt-2 text-lg">Decode Your Future. Build Your Path.</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-20">
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
               <div 
                 className="w-24 h-24 bg-[#00ccff]/10 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:bg-[#00ccff]/20 transition"
                 onClick={() => fileInputRef.current?.click()}
               >
                 <Upload size={40} className="text-[#00ccff]" />
               </div>
               <h2 className="text-2xl font-bold mb-4">Upload Resume or Transcript</h2>
               <p className="text-gray-400 mb-6">Let the AI Career engine build your personalized DNA based on your skills, interests, and academics.</p>
               
               {file && (
                 <div className="bg-[#00ccff]/10 text-[#00ccff] px-4 py-2 rounded-lg mb-6 flex items-center gap-2 border border-[#00ccff]/30">
                    <span className="truncate max-w-[200px]">{file.name}</span> selected
                 </div>
               )}

               <div className="flex gap-4">
                 <button 
                   onClick={handleUploadResume} 
                   disabled={!file}
                   className={`px-8 py-3 rounded-xl font-bold transition flex items-center gap-2 ${file ? 'bg-gradient-to-r from-[#00ccff] to-[#0055ff] hover:shadow-[0_0_20px_rgba(0,204,255,0.5)] text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                 >
                   Analyze Profile
                 </button>
               </div>
            </motion.div>
          ) : (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center mt-32 space-y-6">
              <Loader2 size={60} className="text-[#00ccff] animate-spin" />
              <h2 className="text-2xl font-semibold neon-text tracking-widest animate-pulse">EXTRACTING CAREER DNA...</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
