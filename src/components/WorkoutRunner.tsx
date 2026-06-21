import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, X, Check, Timer } from 'lucide-react';
import { Exercise } from '../data/workouts';

interface WorkoutRunnerProps {
  exercises: Exercise[];
  onComplete: (durationSeconds: number) => void;
  onCancel: () => void;
}

type RunnerState = 'idle' | 'work' | 'rest' | 'finished';

export function WorkoutRunner({ exercises, onComplete, onCancel }: WorkoutRunnerProps) {
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [state, setState] = useState<RunnerState>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentEx = exercises[currentExIdx];
  const isTimeBased = currentEx?.type === 'time';
  
  // Total timer tracking
  useEffect(() => {
    totalTimerRef.current = setInterval(() => {
      setTotalSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(totalTimerRef.current!);
  }, []);

  // Main countdown timer
  useEffect(() => {
    if ((state === 'work' && isTimeBased) || state === 'rest') {
      if (!isPaused && timeLeft > 0) {
        timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else if (!isPaused && timeLeft === 0) {
        // Time's up! Beep?
        try {
          if (navigator.vibrate) navigator.vibrate(200);
        } catch(e) {}
        
        handleTimerComplete();
      }
    }
    return () => clearTimeout(timerRef.current!);
  }, [timeLeft, isPaused, state, isTimeBased]);

  const handleTimerComplete = () => {
    if (state === 'work') {
      // Work finished, move to rest
      if (currentEx.restTime > 0) {
        startRest();
      } else {
        // No rest? Move to next set/ex
        advanceSetSequence();
      }
    } else if (state === 'rest') {
      // Rest finished, move to next work
      advanceSetSequence();
    }
  };

  const advanceSetSequence = () => {
    if (currentSet < currentEx.sets) {
      setCurrentSet(prev => prev + 1);
      setState('idle'); // Need to start work again
      if (isTimeBased) {
        // Auto-start next work for time-based if we want, or wait. Let's wait for user to hit start or auto-start.
        // Usually HIIT goes automatically. Let's auto-start!
        startWork();
      }
    } else {
      // Next exercise
      if (currentExIdx < exercises.length - 1) {
        setCurrentExIdx(prev => prev + 1);
        setCurrentSet(1);
        setState('idle');
      } else {
        // Workout Complete
        setState('finished');
        onComplete(totalSecondsElapsed);
      }
    }
  };

  const startWork = () => {
    setState('work');
    if (isTimeBased) {
      setTimeLeft(currentEx.workTime || 30);
      setIsPaused(false);
    }
  };

  const startRest = () => {
    setState('rest');
    setTimeLeft(currentEx.restTime);
    setIsPaused(false);
  };

  const skipForward = () => {
    if (state === 'work') {
      if (currentEx.restTime > 0) {
        startRest();
      } else {
        advanceSetSequence();
      }
    } else if (state === 'rest') {
      advanceSetSequence();
    } else if (state === 'idle') {
      // If idle (waiting to start reps), just count it as done
      if (currentEx.restTime > 0) {
        startRest();
      } else {
        advanceSetSequence();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!currentEx) return null;

  // Calculate progress for circle
  const getProgress = () => {
    if (state === 'work' && currentEx.workTime) {
      return (timeLeft / currentEx.workTime) * 100;
    }
    if (state === 'rest' && currentEx.restTime) {
      return (timeLeft / currentEx.restTime) * 100;
    }
    return 100;
  };
  const strokeDashoffset = 283 - (283 * getProgress()) / 100; // 2 * pi * 45 = ~283

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col h-full max-h-[800px]">
        
        {/* Header */}
        <div className="p-4 bg-slate-50 flex justify-between items-center border-b border-slate-200">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
              Exercício {currentExIdx + 1} de {exercises.length}
            </span>
            <span className="text-sm font-medium text-slate-500">
              Tempo total: {formatTime(totalSecondsElapsed)}
            </span>
          </div>
          <button onClick={onCancel} className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-2">{currentEx.name}</h2>
          
          <div className="text-emerald-600 font-bold mb-8 text-lg bg-emerald-50 px-4 py-1 rounded-full">
            {isTimeBased ? `Série ${currentSet} de ${currentEx.sets}` : `Série ${currentSet} de ${currentEx.sets} • ${currentEx.reps} reps`}
          </div>

          {currentEx.note && state !== 'rest' && (
            <p className="text-slate-500 mb-6 text-sm">{currentEx.note}</p>
          )}

          {/* Circle Timer */}
          <div className="relative flex items-center justify-center mb-8">
            <svg width="240" height="240" viewBox="0 0 100 100" className="-rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              {(state === 'work' && isTimeBased) || state === 'rest' ? (
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={state === 'work' ? '#10b981' : '#3b82f6'} 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                />
              ) : null}
            </svg>
            <div className="absolute flex flex-col items-center">
              {state === 'idle' ? (
                <div className="text-center">
                  <span className="text-slate-400 text-sm font-bold uppercase tracking-widest block mb-1">Pronto?</span>
                  <span className="text-4xl font-black text-slate-800">
                    {isTimeBased ? formatTime(currentEx.workTime || 0) : <Timer size={40} className="text-slate-300 mx-auto" />}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <span className={`text-sm font-bold uppercase tracking-widest block mb-1 ${state === 'work' ? 'text-emerald-500' : 'text-blue-500'}`}>
                    {state === 'work' ? 'Treinando' : 'Descanso'}
                  </span>
                  <span className="text-6xl font-black text-slate-800 tracking-tighter">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          {state === 'idle' && !isTimeBased ? (
            <button 
              onClick={() => {
                if (currentEx.restTime > 0) startRest();
                else advanceSetSequence();
              }}
              className="w-full bg-emerald-600 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
            >
              <Check /> Concluí esta série
            </button>
          ) : state === 'idle' && isTimeBased ? (
            <button 
              onClick={startWork}
              className="w-full bg-emerald-600 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
            >
              <Play /> Iniciar Round
            </button>
          ) : (
            <div className="flex gap-4">
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="flex-1 bg-white border-2 border-slate-300 text-slate-700 font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition"
              >
                {isPaused ? <Play /> : <Pause />}
                {isPaused ? 'Retomar' : 'Pausar'}
              </button>
              <button 
                onClick={skipForward}
                className="w-20 bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-slate-300 transition"
              >
                <SkipForward />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
