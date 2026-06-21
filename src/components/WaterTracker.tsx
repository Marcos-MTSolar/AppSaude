import React, { useState, useEffect } from 'react';
import { Droplets, Settings, Plus, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getTheme } from '../utils/theme';

interface WaterTrackerProps {
  profileId: string;
}

export function WaterTracker({ profileId }: WaterTrackerProps) {
  const t = getTheme(profileId as 'marcos' | 'sandra');
  const [waterGoal, setWaterGoal] = useLocalStorage(`${profileId}_water_goal`, 2500);
  const [glassSize, setGlassSize] = useLocalStorage(`${profileId}_water_glass`, 250);
  const [waterHistory, setWaterHistory] = useLocalStorage<Record<string, { time: string, amount: number }[]>>(`${profileId}_water_history`, {});

  const [showSettings, setShowSettings] = useState(false);
  
  // Current day string like "2026-06-21"
  const todayStr = new Date().toISOString().substring(0, 10);
  const todayRecords = waterHistory[todayStr] || [];
  const currentAmount = todayRecords.reduce((acc, curr) => acc + curr.amount, 0);

  const handleDrink = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setWaterHistory(prev => ({
      ...prev,
      [todayStr]: [...(prev[todayStr] || []), { time: timeStr, amount: glassSize }]
    }));
  };

  const progressPercent = Math.min((currentAmount / waterGoal) * 100, 100);

  return (
    <div className={`${t.surface} rounded-3xl p-6 border ${t.surfaceBorder} shadow-sm relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${t.surface2}`}>
        <div className={`h-full ${t.primary} transition-all duration-500`} style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 ${t.primarySubtle} ${t.primaryText} rounded-2xl`}>
            <Droplets size={24} />
          </div>
          <div>
            <h3 className={`font-bold ${t.text}`}>Hidratação</h3>
            <p className={`text-xs ${t.textMuted} font-medium`}>{currentAmount} / {waterGoal} ml</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className={`${t.textMuted} hover:${t.textSecondary} p-2`}>
          <Settings size={20} />
        </button>
      </div>

      {showSettings ? (
        <div className={`${t.surface2} p-4 rounded-2xl mb-4 border ${t.surfaceBorder} space-y-3`}>
          <div>
            <label className={`text-xs font-bold ${t.textMuted} uppercase tracking-wider block mb-1`}>Meta Diária (ml)</label>
            <input 
              type="number" 
              value={waterGoal} 
              onChange={e => setWaterGoal(Number(e.target.value))} 
              className={`w-full p-2 border ${t.surfaceBorder} rounded-xl text-sm ${t.inputBg} ${t.text} ${t.inputFocusRing} outline-none`}
            />
          </div>
          <div>
            <label className={`text-xs font-bold ${t.textMuted} uppercase tracking-wider block mb-1`}>Tamanho do Copo (ml)</label>
            <input 
              type="number" 
              value={glassSize} 
              onChange={e => setGlassSize(Number(e.target.value))} 
              className={`w-full p-2 border ${t.surfaceBorder} rounded-xl text-sm ${t.inputBg} ${t.text} ${t.inputFocusRing} outline-none`}
            />
          </div>
          <button onClick={() => setShowSettings(false)} className={`w-full ${t.primaryText} ${t.surface} py-2 rounded-xl text-sm font-bold mt-2 shadow-sm border ${t.surfaceBorder}`}>
            Salvar
          </button>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <button 
            onClick={handleDrink}
            className={`w-full ${t.primary} ${t.primaryHover} text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95`}
          >
            <Plus size={20} /> Bebi um copo ({glassSize}ml)
          </button>
        </div>
        {progressPercent >= 100 && (
          <div className={`w-14 h-14 ${t.primarySubtle} ${t.primaryText} rounded-2xl flex items-center justify-center shrink-0`}>
            <CheckCircle2 size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
