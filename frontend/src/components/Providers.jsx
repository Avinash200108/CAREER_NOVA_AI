"use client";
import { DashboardProvider } from '@/context/DashboardContext';

export default function Providers({ children }) {
    return <DashboardProvider>{children}</DashboardProvider>;
}
