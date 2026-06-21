import { User } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculatePlanDay } from '../utils/date';

interface ProfileCardProps {
  id: 'marcos' | 'sandra';
  name: string;
  color: string;
  textColor: string;
  onSelect: (id: 'marcos' | 'sandra') => void;
}

function ProfileCard({ id, name, color, textColor, onSelect }: ProfileCardProps) {
  const [startDateDieta] = useLocalStorage<string | null>(`${id}_data_inicio_dieta`, null);
  const [startDateTreino] = useLocalStorage<string | null>(`${id}_data_inicio_treino`, null);
  const planDayDieta = calculatePlanDay(startDateDieta);
  const planDayTreino = calculatePlanDay(startDateTreino);

  const isStarted = planDayDieta !== null || planDayTreino !== null;

  return (
    <button
      onClick={() => onSelect(id)}
      className="relative overflow-hidden rounded-3xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md border border-emerald-100 hover:border-emerald-400 bg-white group"
    >
      <div className={`absolute -right-4 -top-4 p-4 opacity-5 group-hover:scale-110 transition-transform ${color}`}>
        <User size={120} />
      </div>
      
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-opacity-80`}>
          <User size={32} className={textColor} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
      </div>

      <div className="mt-4 relative z-10 flex flex-col gap-2 items-start">
        {!isStarted ? (
          <p className="text-slate-500 font-semibold bg-slate-50 border border-slate-100 inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wide">
            Plano não iniciado
          </p>
        ) : (
          <div className="flex gap-2">
            {planDayDieta !== null && (
              <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wide">
                Dieta: Dia {planDayDieta}
              </span>
            )}
            {planDayTreino !== null && (
              <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wide">
                Treino: Dia {planDayTreino}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

interface ProfileSelectorProps {
  onSelect: (id: 'marcos' | 'sandra') => void;
}

export default function ProfileSelector({ onSelect }: ProfileSelectorProps) {
  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900 font-sans flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-lg shadow-emerald-500/20">VS</div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">Vida Saudável</h1>
          <p className="font-bold text-emerald-800/40 uppercase tracking-widest text-sm">Marcos & Sandra</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <ProfileCard 
            id="marcos" 
            name="Marcos" 
            color="bg-teal-600"
            textColor="text-teal-600" 
            onSelect={onSelect} 
          />
          <ProfileCard 
            id="sandra" 
            name="Sandra" 
            color="bg-emerald-600"
            textColor="text-emerald-600" 
            onSelect={onSelect} 
          />
        </div>
      </div>
    </div>
  );
}
