import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Clock, Dumbbell, Shield, ShieldCheck, Zap, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { getWorkoutForDay } from '../data/workouts';
import { WorkoutRunner } from './WorkoutRunner';
import { getTheme } from '../utils/theme';
import { useSyncedStorage } from '../hooks/useSyncedStorage';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TreinoTabProps {
  profileId: 'marcos' | 'sandra' | 'rosimere';
  planDayTreino: number | null;
  absolutePlanDayTreino: number;
  setStartDateTreinoStr: (date: string) => void;
  setAbsoluteStartDateTreinoStr: (date: string) => void;
}



function ExerciseThumbnail({ gifUrl, alt }: { gifUrl: string, alt: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className="mt-3 w-32 h-20 bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner">
      {status !== 'error' ? (
        <>
          {status === 'loading' && (
            <div className="absolute inset-0 animate-pulse bg-slate-200 flex items-center justify-center">
              <Dumbbell size={16} className="opacity-20 animate-spin" />
            </div>
          )}
          <img 
            src={gifUrl} 
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
          />
        </>
      ) : (
        <Dumbbell size={24} className="text-slate-300 opacity-50" />
      )}
    </div>
  );
}

export function TreinoTab({ profileId, planDayTreino, absolutePlanDayTreino, setStartDateTreinoStr, setAbsoluteStartDateTreinoStr }: TreinoTabProps) {
  const t = getTheme(profileId);
  if (profileId === 'rosimere') return null;
  const [dayOffset, setDayOffset] = useState<0 | 1>(0); // 1 = Amanhã, 0 = Hoje

  const displayPlanDay = absolutePlanDayTreino + dayOffset;
  const currentWeek = Math.max(1, Math.ceil(displayPlanDay / 7));
  const targetDayOfWeek = new Date(new Date().getTime() + dayOffset * 86400000).getDay();

  const todayWorkout = getWorkoutForDay(profileId, currentWeek, targetDayOfWeek);
  const workoutId = todayWorkout ? `${todayWorkout.id}_w${currentWeek}_d${displayPlanDay}` : 'none';

  // Mark workout as done for the specific day of plan
  const [doneWorkouts, setDoneWorkouts] = useSyncedStorage<Record<string, { done: boolean, duration?: number }>>(`${profileId}_workouts_done`, {}, profileId);
  const isDoneToday = doneWorkouts[workoutId]?.done;

  const [isRunning, setIsRunning] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [lastDuration, setLastDuration] = useState(0);
  const [expandedEx, setExpandedEx] = useState<string | null>(null);

  useEffect(() => {
    if (todayWorkout && todayWorkout.exercises.length > 0) {
      setExpandedEx(todayWorkout.exercises[0].id);
    }
  }, [todayWorkout?.id]);

  // Calculate Phase
  let phaseName = '';
  let phaseDesc = '';
  let PhaseIcon = Shield;
  
  if (currentWeek <= 4) {
    phaseName = 'Fase 1: Adaptação';
    phaseDesc = 'Condicionamento básico e correção postural';
    PhaseIcon = Shield;
  } else if (currentWeek <= 8) {
    phaseName = 'Fase 2: Progressão';
    phaseDesc = 'Aumento de carga e volume muscular';
    PhaseIcon = Zap;
  } else if (currentWeek <= 16) {
    phaseName = 'Fase 3: Especialização';
    phaseDesc = 'Intensidade alta, foco nos pontos fracos';
    PhaseIcon = Dumbbell;
  } else {
    phaseName = 'Fase 4: Simulado TAF';
    phaseDesc = 'Preparação específica para as métricas do teste';
    PhaseIcon = ShieldCheck;
  }

  const markAsDone = (durationSeconds?: number) => {
    setDoneWorkouts(prev => ({
      ...prev,
      [workoutId]: { 
        done: true, 
        duration: durationSeconds || 0,
        date: new Date().toISOString(),
        profile: profileId,
        name: todayWorkout?.title || 'Treino',
        method: durationSeconds ? 'guided' : 'manual'
      }
    }));
    if (durationSeconds) {
      setLastDuration(durationSeconds);
      setShowFinished(true);
    }
  };

  const handleManualComplete = () => {
    markAsDone();
  };

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  if (planDayTreino === null) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-center space-y-6 ${t.surface} rounded-3xl shadow-sm border ${t.surfaceBorder}`}>
        <div className={`w-24 h-24 ${t.surface2} rounded-full flex items-center justify-center ${t.textMuted} mb-2`}>
          <Dumbbell size={48} strokeWidth={1.5} />
        </div>
        <h2 className={`text-3xl font-black ${t.text} italic`}>Treino não iniciado</h2>
        <p className={`${t.textMuted} max-w-sm mb-4`}>
          Você ainda não começou seus treinos. Toque no botão abaixo quando for realizar o seu primeiro treino do plano!
        </p>
        <button
          onClick={() => {
            const now = new Date().toISOString();
            setStartDateTreinoStr(now);
            setAbsoluteStartDateTreinoStr(now);
          }}
          className={`${t.primary} ${t.primaryHover} text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all active:scale-95 w-full max-w-xs`}
        >
          Comecei os treinos hoje
        </button>
      </div>
    );
  }

  const DaySelector = () => (
    <div className="flex bg-slate-100 rounded-xl p-1 mb-4 max-w-xs mx-auto">
      <button 
        onClick={() => { setDayOffset(0); setShowFinished(false); setIsRunning(false); }}
        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${dayOffset === 0 ? `bg-white shadow-sm ${t.primaryText}` : 'text-slate-500 hover:bg-slate-200'}`}
      >
        Hoje
      </button>
      <button 
        onClick={() => { setDayOffset(1); setShowFinished(false); setIsRunning(false); }}
        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${dayOffset === 1 ? `bg-white shadow-sm ${t.primaryText}` : 'text-slate-500 hover:bg-slate-200'}`}
      >
        Amanhã
      </button>
    </div>
  );

  if (!todayWorkout) {
    return (
      <div className="space-y-4 md:space-y-6 pb-20">
        <DaySelector />
        <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-bold text-slate-800 text-xl mb-2">Descanso Total</h3>
          <p className="text-slate-500 font-medium">Aproveite para relaxar e recuperar as energias. O descanso é parte fundamental do processo.</p>
        </div>
      </div>
    );
  }

  if (showFinished) {
    return (
      <div className="space-y-4 md:space-y-6 pb-20">
        <DaySelector />
        <div className={`flex flex-col items-center justify-center p-10 text-center ${t.primarySubtle} rounded-3xl border ${t.primaryBorder}`}>
          <div className={`w-20 h-20 ${t.primary} rounded-full flex items-center justify-center mb-6 text-white shadow-xl`}>
            <CheckCircle2 size={40} />
          </div>
          <h2 className={`font-black ${t.primaryText} text-3xl mb-2`}>Treino Concluído!</h2>
          <p className={`${t.primarySubtleText} font-medium text-lg mb-8`}>
            Você suou por <strong>{formatMinSec(lastDuration)}</strong>. Excelente trabalho!
          </p>
          <button 
            onClick={() => setShowFinished(false)}
            className={`${t.primary} ${t.primaryHover} text-white font-bold py-3 px-8 rounded-full transition`}
          >
            Voltar ao Treino
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      <DaySelector />

      {/* Resumo Card */}
      <div className={`rounded-3xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden ${t.primary}`}>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg md:text-xl flex items-center gap-2 mb-1">
                <PhaseIcon size={20} />
                {phaseName}
              </h3>
              <p className="text-emerald-50 text-xs md:text-sm opacity-90">{phaseDesc}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black italic tracking-tight">{currentWeek}</span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-100">Semana</span>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute -right-6 -bottom-6 opacity-10">
            <Calendar size={120} />
        </div>
      </div>

      {/* Workout Header */}
      <div className={`${t.surface} p-4 md:p-6 rounded-3xl shadow-sm border ${t.surfaceBorder}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-xl md:text-2xl font-black ${t.text}`}>{todayWorkout.title}</h2>
            <div className={`flex items-center gap-2 ${t.textMuted} mt-2 font-medium`}>
              <Clock size={16} /> {todayWorkout.duration}
            </div>
          </div>
          {isDoneToday && (
            <div className={`${t.primarySubtle} ${t.primaryText} px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1`}>
              <CheckCircle2 size={14} /> Feito
            </div>
          )}
        </div>
        <p className={`${t.textSecondary} font-medium leading-relaxed text-xs md:text-sm`}>{todayWorkout.description}</p>
        
        {!isDoneToday && !todayWorkout.isRest && todayWorkout.exercises.length > 0 && (
          <div className="flex gap-3 mt-4 md:mt-6">
             <button 
                onClick={() => setIsRunning(true)}
                className={`flex-1 ${t.primary} text-white font-bold py-3 md:py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 ${t.primaryHover} transition active:scale-95`}
             >
                <Play fill="currentColor" size={20} /> Iniciar Treino
             </button>
          </div>
        )}
      </div>

      {/* Exercises List */}
      {!todayWorkout.isRest && todayWorkout.exercises.length > 0 && (
        <div className="space-y-3 md:space-y-4">
          <h3 className={`font-bold text-lg ${t.text} pl-2`}>Exercícios de Hoje</h3>
          {todayWorkout.exercises.map((ex, idx) => {
            const isExpanded = expandedEx === ex.id;
            return (
              <div 
                key={ex.id} 
                className={`${t.surface} p-3 md:p-5 rounded-2xl border ${t.surfaceBorder} shadow-sm transition-all`}
              >
                <div 
                  className="flex items-center gap-3 md:gap-4 cursor-pointer"
                  onClick={() => setExpandedEx(isExpanded ? null : ex.id)}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 ${t.surface2} rounded-full flex items-center justify-center font-bold ${t.textMuted} shrink-0 text-sm md:text-base`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${t.text} text-sm md:text-base`}>{ex.name}</h4>
                    {!isExpanded && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className={`text-[10px] md:text-xs font-bold ${t.surface2} ${t.textSecondary} px-2 py-0.5 rounded uppercase`}>
                          {ex.sets} {ex.type === 'time' ? 'Rounds' : 'Séries'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`${t.textMuted} p-1 ${t.surface2} rounded-full`}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className={`mt-3 pl-11 md:pl-14 pt-3 border-t ${t.surfaceBorder}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] md:text-xs font-bold ${t.surface2} ${t.textSecondary} px-2 py-0.5 rounded uppercase`}>
                        {ex.sets} {ex.type === 'time' ? 'Rounds' : 'Séries'}
                      </span>
                      <span className={`text-[10px] md:text-xs font-bold ${t.primarySubtle} ${t.primaryText} px-2 py-0.5 rounded uppercase`}>
                        {ex.type === 'time' ? `${ex.workTime}s esforço` : `${ex.reps} reps`}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">
                        {ex.restTime}s desc
                      </span>
                    </div>
                    {ex.note && <p className={`text-xs md:text-sm ${t.textMuted} mt-2 font-medium`}>{ex.note}</p>}
                    {ex.gifUrl && <ExerciseThumbnail gifUrl={ex.gifUrl} alt={ex.name} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Manual completion for those who skip timer */}
      {!isDoneToday && (
        <div className="pt-4">
          <button 
            onClick={handleManualComplete}
            className={`w-full ${t.surface2} ${t.textSecondary} font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-80 transition border ${t.surfaceBorder}`}
          >
            <CheckCircle2 size={20} /> Marcar como concluído manualmente
          </button>
        </div>
      )}

      {/* Runner Overlay */}
      {isRunning && (
        <WorkoutRunner 
          exercises={todayWorkout.exercises} 
          onCancel={() => setIsRunning(false)}
          onComplete={markAsDone}
        />
      )}
      
    </div>
  );
}
