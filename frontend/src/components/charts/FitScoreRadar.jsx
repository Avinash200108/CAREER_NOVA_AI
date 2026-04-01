"use client";
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function FitScoreRadar({ scores }) {
  const data = [
    { subject: 'Skills', A: scores.skills || 0, fullMark: 100 },
    { subject: 'Interest', A: scores.interest || 0, fullMark: 100 },
    { subject: 'Academics', A: scores.academics || 0, fullMark: 100 },
    { subject: 'Market', A: scores.market || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[300px] text-white">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.2)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#00ccff', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'transparent' }} />
          <Tooltip contentStyle={{ backgroundColor: '#14141e', borderColor: '#00ccff', borderRadius: '8px' }} />
          <Radar name="Fit Score" dataKey="A" stroke="#00ccff" fill="#00ccff" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
