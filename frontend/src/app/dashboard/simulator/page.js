"use client";
import { useDashboard } from '@/context/DashboardContext';
import { motion } from 'framer-motion';
import CareerTimeline from '@/components/dashboard/CareerTimeline';

export default function SimulatorPage() {
    const { simulation } = useDashboard();

    if (!simulation) return null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-6">
             <CareerTimeline simulation={simulation} />
        </motion.div>
    );
}
