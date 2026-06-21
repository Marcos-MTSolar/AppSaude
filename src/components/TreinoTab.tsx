import React, { useState } from 'react';
import { Play, CheckCircle2, Clock, Dumbbell, Shield, ShieldCheck, Zap } from 'lucide-react';
import { getWorkoutForDay } from '../data/workouts';
import { WorkoutRunner } from './WorkoutRunner';

interface TreinoTabProps {
  profileId: 'marcos' | 'sandra';
  planDayTreino: number | null;
  absolutePlanDayTreino: number;
  setStartDateTreinoStr: (date: string) => void;
  setAbsoluteStartDateTreinoStr: (date: string) => void;
}

// Hook matching others
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  };

  return [storedValue, setValue] as const;
}

export function TreinoTab({ profileId, planDayTreino, absolutePlanDayTreino, setStartDateTreinoStr, setAbsoluteStartDateTreinoStr }: TreinoTabProps) {
  const currentWeek = Math.max(1, Math.ceil(absolutePlanDayTreino / 7));
  const todayWorkout = getWorkoutForDay(profileId, currentWeek);
  const workoutId = todayWorkout ? `${todayWorkout.id}_w${currentWeek}_d${absolutePlanDayTreino}` : 'none';

  // Mark workout as done for the specific day of plan
  const [doneWorkouts, setDoneWorkouts] = useLocalStorage<Record<string, { done: boolean, duration?: number }>>(`${profileId}_workouts_done`, {});
  const isDoneToday = doneWorkouts[workoutId]?.done;

  const [isRunning, setIsRunning] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [lastDuration, setLastDuration] = useState(0);

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
      [workoutId]: { done: true, duration: durationSeconds }
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
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-white rounded-3xl shadow-sm border border-slate-100">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-2">
          <Dumbbell size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 italic">Treino não iniciado</h2>
        <p className="text-slate-500 max-w-sm mb-4">
          Você ainda não começou seus treinos. Toque no botão abaixo quando for realizar o seu primeiro treino do plano!
        </p>
        <button
          onClick={() => {
            const now = new Date().toISOString();
            setStartDateTreinoStr(now);
            setAbsoluteStartDateTreinoStr(now);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 w-full max-w-xs"
        >
          Comecei os treinos hoje
        </button>
      </div>
    );
  }

  if (!todayWorkout) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-bold text-slate-800 text-xl mb-2">Descanso Total</h3>
        <p className="text-slate-500 font-medium">Aproveite para relaxar e recuperar as energias. O descanso é parte fundamental do processo.</p>
      </div>
    );
  }

  if (showFinished) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-emerald-50 rounded-3xl border border-emerald-200">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 text-white shadow-xl shadow-emerald-200">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="font-black text-emerald-800 text-3xl mb-2">Treino Concluído!</h2>
        <p className="text-emerald-700 font-medium text-lg mb-8">
          Você suou por <strong>{formatMinSec(lastDuration)}</strong>. Excelente trabalho!
        </p>
        <button 
          onClick={() => setShowFinished(false)}
          className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition"
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 relative">
      
      {/* Progress Phase Banner */}
      <div className="flex items-center gap-4 bg-slate-800 text-white p-5 rounded-3xl shadow-md border-b-4 border-emerald-500">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
          <PhaseIcon size={24} className="text-emerald-400" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-emerald-400 uppercase tracking-wider">{phaseName}</h4>
          <p className="text-sm text-slate-300 font-medium mt-0.5">{phaseDesc}</p>
        </div>
      </div>

      {/* Workout Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800">{todayWorkout.title}</h2>
            <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
              <Clock size={16} /> {todayWorkout.duration}
            </div>
          </div>
          {isDoneToday && (
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
              <CheckCircle2 size={14} /> Feito
            </div>
          )}
        </div>
        <p className="text-slate-600 font-medium leading-relaxed">{todayWorkout.description}</p>
        
        {!isDoneToday && !todayWorkout.isRest && todayWorkout.exercises.length > 0 && (
          <div className="flex gap-3 mt-6">
             <button 
                onClick={() => setIsRunning(true)}
                className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
             >
                <Play fill="currentColor" size={20} /> Iniciar Treino
             </button>
          </div>
        )}
      </div>

      {/* Exercises List */}
      {!todayWorkout.isRest && todayWorkout.exercises.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-slate-800 pl-2">Exercícios de Hoje</h3>
          {todayWorkout.exercises.map((ex, idx) => (
            <div key={ex.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-base">{ex.name}</h4>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                    {ex.sets} {ex.type === 'time' ? 'Rounds' : 'Séries'}
                  </span>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded uppercase">
                    {ex.type === 'time' ? `${ex.workTime}s esforço` : `${ex.reps} reps`}
                  </span>
                  <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">
                    {ex.restTime}s desc
                  </span>
                </div>
                {ex.note && <p className="text-sm text-slate-500 mt-2 font-medium">{ex.note}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual completion for those who skip timer */}
      {!isDoneToday && (
        <div className="pt-4">
          <button 
            onClick={handleManualComplete}
            className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition"
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
