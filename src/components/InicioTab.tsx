import { Lightbulb, Target, AlertTriangle, Info, CheckCircle2, Droplets, Moon, Scale, Crosshair } from 'lucide-react';
import { profilesData, generalRules, phases } from '../data/profiles';
import { WaterTracker } from './WaterTracker';
import { getTheme } from '../utils/theme';
import { formatDateBR } from '../utils/date';

interface InicioTabProps {
  profileId: 'marcos' | 'sandra' | 'rosimere';
  planDayDieta: number | null;
  planDayTreino: number | null;
  absolutePlanDayTreino: number;
  startDateDietaStr: string | null;
  startDateTreinoStr: string | null;
}

export default function InicioTab({ profileId, planDayDieta, planDayTreino, absolutePlanDayTreino, startDateDietaStr, startDateTreinoStr }: InicioTabProps) {
  const profile = profilesData[profileId];
  const t = getTheme(profileId);
  const currentWeek = Math.max(1, Math.ceil(absolutePlanDayTreino / 7));
  
  // Find current phase based on absolute week
  const currentPhaseIndex = phases.findIndex(p => currentWeek <= p.maxWeek);
  const activePhase = phases[currentPhaseIndex !== -1 ? currentPhaseIndex : phases.length - 1];

  // We placeholder current weight as the same as profile.weightCurrent for now since weight tracking comes later
  const currentWeight = profile.weightCurrent; 
  const weightProgressPercent = 0; // Starts at 0% in this mock, goes up as they use the "Acompanhamento"

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      
      {/* Resumo de Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Card Dieta */}
        <div className={`${t.surface} p-4 md:p-5 rounded-3xl shadow-sm border ${t.surfaceBorder} flex flex-col justify-center`}>
          <span className={`${t.primaryText} font-bold uppercase tracking-widest text-xs mb-1`}>Dieta (Ciclo de 30)</span>
          {planDayDieta === null ? (
            <p className={`${t.textMuted} font-medium`}>Ainda não iniciada</p>
          ) : (
            <>
              <div className="flex items-end justify-between">
                <h2 className={`text-2xl md:text-3xl font-black ${t.text} italic`}>Dia {planDayDieta}</h2>
                <div className="text-right">
                  <span className={`text-xs font-bold ${t.primarySubtleText} ${t.primarySubtle} px-2 py-1 rounded-lg`}>
                    {Math.min(Math.round((planDayDieta / 30) * 100), 100)}%
                  </span>
                </div>
              </div>
              <p className={`text-xs ${t.textMuted} mt-2 italic`}>Início: {formatDateBR(startDateDietaStr)}</p>
            </>
          )}
        </div>

        {/* Card Treino */}
        <div className={`${t.surface} p-4 md:p-5 rounded-3xl shadow-sm border ${t.surfaceBorder} flex flex-col justify-center`}>
          <span className={`${t.primaryText} font-bold uppercase tracking-widest text-xs mb-1`}>Treino (Fase Atual)</span>
          {planDayTreino === null ? (
            <p className={`${t.textMuted} font-medium`}>Ainda não iniciado</p>
          ) : (
            <>
              <div className="flex items-end justify-between">
                <h2 className={`text-2xl md:text-3xl font-black ${t.text} italic`}>Semana {currentWeek}</h2>
                <div className="text-right">
                  <span className={`text-xs font-bold ${t.primarySubtleText} ${t.primarySubtle} px-2 py-1 rounded-lg`}>
                    Em andamento
                  </span>
                </div>
              </div>
              <p className={`text-xs ${t.textMuted} mt-2 italic`}>Início: {formatDateBR(startDateTreinoStr)}</p>
            </>
          )}
        </div>
      </div>

      {/* Rastreamento de Água */}
      <WaterTracker profileId={profileId} />

      {/* Progresso de Peso e Metas */}
      <div className={`${t.surface} rounded-3xl p-4 md:p-6 border ${t.surfaceBorder} shadow-sm`}>
        <div className="px-1 mb-4 flex items-center justify-between">
          <h3 className={`font-bold text-lg flex items-center gap-2 ${t.text}`}>
            <Target className={`w-5 h-5 ${t.primaryText}`} />
            Objetivo Principal
          </h3>
          <span className={`text-xs font-bold uppercase tracking-wider ${t.primarySubtleText} ${t.primarySubtle} px-3 py-1 rounded-full`}>
            {profile.timeframe}
          </span>
        </div>
        <p className={`${t.textSecondary} mb-6 ${t.surface2} p-4 rounded-2xl border ${t.surfaceBorder}`}>{profile.mainGoal}</p>

        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <span className={`text-sm font-medium ${t.textMuted} uppercase tracking-widest`}>Peso Atual</span>
            <span className={`text-2xl font-black ${t.text}`}>
              {currentWeight.toFixed(1)} <span className={`text-base font-medium ${t.textMuted}`}>kg</span>
            </span>
          </div>
          
          <div className={`h-3 ${t.surface2} rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${t.progressBar} rounded-full`} 
              style={{ width: `${Math.max(5, weightProgressPercent)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs font-medium px-1">
            <span className={`${t.primaryText} font-bold`}>Faltam {profile.weightLossGoal.toFixed(1)}kg</span>
            <span className={`${t.textMuted} uppercase tracking-wider text-[10px]`}>Meta: {profile.weightGoal.toFixed(1)} kg</span>
          </div>
        </div>
      </div>

      {/* Nota Crítica */}
      <div className="bg-amber-50 rounded-3xl p-4 md:p-6 border border-amber-200">
        <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Atenção
        </h3>
        <p className="text-sm text-amber-700 leading-relaxed font-medium">
          {profile.criticalNote}
        </p>
      </div>

      {/* Timeline de Fases */}
      <div className="bg-slate-800 rounded-3xl p-4 md:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Crosshair className={`w-5 h-5 ${t.primaryText}`} />
            Progressão do Plano
          </h3>
          
          <div className="space-y-6">
            {phases.map((phase) => {
              const isActive = phase.level === activePhase.level;
              const isPast = phase.level < activePhase.level;
              
              return (
                <div key={phase.level} className={`relative pl-8 ${isPast ? 'opacity-50' : isActive ? 'opacity-100' : 'opacity-40'}`}>
                  {/* Timeline Line */}
                  {phase.level !== phases.length && (
                    <div className={`absolute left-[11px] top-6 w-0.5 h-[calc(100%+12px)] ${isPast ? t.progressBar : 'bg-slate-700'}`}></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 flex items-center justify-center ${
                    isActive ? `${t.primaryBorder} bg-slate-800` : 
                    isPast ? `${t.primaryBorder} ${t.progressBar}` : 
                    'border-slate-600 bg-slate-800'
                  }`}>
                    {isPast && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-bold ${isActive ? t.primaryText : 'text-slate-200'}`}>
                        {phase.title}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        ({phase.weeks})
                      </span>
                    </div>
                    {isActive && (
                      <div className="mt-2 bg-slate-700/50 p-4 rounded-2xl border border-slate-600/50 text-sm text-slate-300">
                        <p className="mb-2">{phase.description}</p>
                        <p className={`font-medium ${t.primaryText}`}>
                          Marco Esperado: {profileId === 'marcos' ? phase.milestoneMarcos : phase.milestoneSandra}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${t.progressBar} opacity-10 rounded-full blur-3xl`}></div>
      </div>

      {/* Regras de Ouro */}
      <div className={`${t.surface} rounded-3xl p-6 border ${t.surfaceBorder} shadow-sm`}>
        <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${t.text}`}>
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Regras de Ouro
        </h3>
        
        <div className="space-y-4">
          <div className={`${t.surface2} rounded-2xl p-4 border ${t.surfaceBorder}`}>
            <h4 className={`text-xs uppercase tracking-widest font-bold ${t.textMuted} mb-3`}>Específicas de {profile.name}</h4>
            <ul className="space-y-3">
              {profile.specificRules.map((rule, idx) => (
                <li key={idx} className={`flex gap-3 text-sm ${t.textSecondary}`}>
                  <CheckCircle2 className={`w-5 h-5 ${t.primaryText} shrink-0`} />
                  <span className="font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`${t.surface2} rounded-2xl p-4 border ${t.surfaceBorder}`}>
            <h4 className={`text-xs uppercase tracking-widest font-bold ${t.textMuted} mb-3`}>Para os Dois</h4>
            <ul className="space-y-3">
              {generalRules.map((rule, idx) => {
                let Icon = Info;
                if (rule.toLowerCase().includes('água')) Icon = Droplets;
                if (rule.toLowerCase().includes('sono')) Icon = Moon;
                if (rule.toLowerCase().includes('pesar')) Icon = Scale;

                return (
                  <li key={idx} className={`flex gap-3 text-sm ${t.textSecondary}`}>
                    <Icon className={`w-5 h-5 ${t.textMuted} shrink-0`} />
                    <span>{rule}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
