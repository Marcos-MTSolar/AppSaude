import { useState, useEffect } from 'react';
import { HelpCircle, ChefHat, Check, X, MapPin, Star, Building2, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { mealsData, substitutions, rosimere_meals } from '../data/meals';
import { useSyncedStorage } from '../hooks/useSyncedStorage';
import { getTheme } from '../utils/theme';

interface CardapioTabProps {
  profileId: 'marcos' | 'sandra' | 'rosimere';
  planDayDieta: number | null;
  setStartDateDietaStr: (date: string) => void;
}

export default function CardapioTab({ profileId, planDayDieta, setStartDateDietaStr }: CardapioTabProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [checkedMeals, setCheckedMeals] = useSyncedStorage<Record<string, boolean>>(`${profileId}_meals_checked`, {}, profileId);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const t = getTheme(profileId);

  const [rosimereFase, setRosimereFase] = useSyncedStorage<string>('rosimere_fase_atual', 'fase1', 'rosimere');
  const [dayOffset, setDayOffset] = useState<0 | 1>(0);
  const displayPlanDay = planDayDieta ? planDayDieta + dayOffset : null;
  const computedDataDayIndex = ((displayPlanDay || 1) - 1) % 14;
  const [almocoEmCasa, setAlmocoEmCasa] = useSyncedStorage<boolean>(`marcos_almoco_em_casa_${computedDataDayIndex}`, false, profileId);

  // Expande a primeira refeição não concluída no dia atual
  useEffect(() => {
    if (profileId === 'rosimere') {
      const mealOrderKeys = ['cafe_manha', 'lanche_manha', 'almoco', 'lanche_tarde', 'jantar', 'ceia'];
      const firstUnchecked = mealOrderKeys.find(key => !checkedMeals[`${rosimereFase}_${key}`]);
      if (firstUnchecked) {
        setExpandedMeal(firstUnchecked);
      }
    } else if (planDayDieta && dayOffset === 0) {
      const mealOrderKeys = ['cafe_manha', 'lanche_manha', 'almoco', 'lanche_tarde', 'jantar'];
      const firstUnchecked = mealOrderKeys.find(key => !checkedMeals[`d${planDayDieta}_${key}`]);
      if (firstUnchecked) {
        setExpandedMeal(firstUnchecked);
      }
    }
  }, [planDayDieta, profileId, rosimereFase, dayOffset]); // Run once when planDayDieta or phase changes

  if (profileId !== 'rosimere' && displayPlanDay === null) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-center space-y-6 ${t.surface} rounded-3xl shadow-sm border ${t.surfaceBorder}`}>
        <div className={`w-24 h-24 ${t.primarySubtle} rounded-full flex items-center justify-center ${t.primaryText} mb-2`}>
          <ChefHat size={48} strokeWidth={1.5} />
        </div>
        <h2 className={`text-3xl font-black ${t.text} italic`}>Dieta não iniciada</h2>
        <p className={`${t.textMuted} max-w-sm mb-4`}>
          Você ainda não começou a seguir o cardápio. Toque no botão abaixo quando fizer sua primeira refeição do plano!
        </p>
        <button
          onClick={() => setStartDateDietaStr(new Date().toISOString())}
          className={`${t.primary} ${t.primaryHover} text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all active:scale-95 w-full max-w-xs`}
        >
          Comecei a dieta hoje
        </button>
      </div>
    );
  }

  let currentDayData: any = null;
  let profileMeals: any = {};
  let mealOrder = [
    { key: 'cafe_manha', label: 'Café da Manhã' },
    { key: 'lanche_manha', label: 'Lanche da Manhã' },
    { key: 'almoco', label: 'Almoço' },
    { key: 'lanche_tarde', label: 'Lanche da Tarde' },
    { key: 'jantar', label: 'Jantar' }
  ];

  if (profileId === 'rosimere') {
    const phaseData = rosimere_meals.find(m => m.fase === rosimereFase) || rosimere_meals[0];
    currentDayData = {
      dia_semana: phaseData.titulo,
      tipo: 'normal',
      dica_preparo: phaseData.dica
    };
    profileMeals = phaseData.refeicoes;
    mealOrder.push({ key: 'ceia', label: 'Ceia' });
  } else {
    // Loop back if day > 14 (assuming we only have 14 days of data right now)
    const dataDayIndex = ((displayPlanDay || 1) - 1) % 14; 
    
    // Find the day's data
    currentDayData = mealsData[0].dias[0];
    let found = false;
    for (const week of mealsData) {
      for (const day of week.dias) {
        if (day.dia === dataDayIndex + 1) {
          currentDayData = day;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    profileMeals = currentDayData[profileId] as Record<string, any>;
  }

  const handleToggleMeal = (mealKey: string) => {
    if (dayOffset === 1) return; // Prevent toggling for tomorrow
    const storageKey = profileId === 'rosimere' ? `${rosimereFase}_${mealKey}` : `d${planDayDieta}_${mealKey}`;
    setCheckedMeals(prev => ({
      ...prev,
      [storageKey]: !prev[storageKey]
    }));
  };

  const DaySelector = () => {
    if (profileId === 'rosimere') return null;
    return (
      <div className="flex bg-slate-100 rounded-xl p-1 mb-4 max-w-xs mx-auto">
        <button 
          onClick={() => { setDayOffset(0); setExpandedMeal(null); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${dayOffset === 0 ? `bg-white shadow-sm ${t.primaryText}` : 'text-slate-500 hover:bg-slate-200'}`}
        >
          Hoje
        </button>
        <button 
          onClick={() => { setDayOffset(1); setExpandedMeal(null); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${dayOffset === 1 ? `bg-white shadow-sm ${t.primaryText}` : 'text-slate-500 hover:bg-slate-200'}`}
        >
          Amanhã
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      <DaySelector />
      {profileId === 'rosimere' && (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-2xl shadow-sm flex items-start gap-3">
          <AlertTriangle className="shrink-0 text-amber-600 mt-0.5" size={20} />
          <p className="text-sm font-medium leading-tight">
            <span className="font-bold">⚠️ Sinais de alerta:</span> vômitos por mais de 2 dias, febre acima de 37,8°C ou perda de mais de 1kg em 1 semana — comunicar ao oncologista imediatamente.
          </p>
        </div>
      )}
      <div className={`flex justify-between items-start ${t.surface} p-6 rounded-3xl shadow-sm border ${t.surfaceBorder} relative`}>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className={`font-bold text-lg md:text-xl ${t.text} mb-1 flex items-center gap-2`}>
              <ChefHat size={20} />
              Cardápio Diário
            </h3>
            {profileId === 'rosimere' ? (
              <div className="mt-2">
                <select 
                  value={rosimereFase} 
                  onChange={(e) => setRosimereFase(e.target.value)}
                  className={`text-xl font-black italic tracking-tight ${t.primaryText} bg-transparent border-b-2 border-rose-300 focus:outline-none focus:border-rose-500`}
                >
                  {rosimere_meals.map(m => (
                    <option key={m.fase} value={m.fase}>{m.titulo}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="mt-1">
                {dayOffset === 1 && (
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md mb-1 inline-block ${t.primarySubtle} ${t.primaryText}`}>
                    Visualizando: Amanhã
                  </span>
                )}
                <p className={`text-2xl md:text-3xl font-black italic tracking-tight ${t.primaryText}`}>{currentDayData.dia_semana}</p>
                <p className={`${t.primaryText} font-medium text-sm mt-1`}>Dia {displayPlanDay}</p>
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={() => setShowTooltip(!showTooltip)}
          className={`w-10 h-10 rounded-full ${t.surface2} flex items-center justify-center ${t.textMuted} hover:opacity-80 transition-colors`}
        >
          <HelpCircle size={24} />
        </button>

        {showTooltip && (
          <div className={`absolute right-6 top-full mt-2 w-80 ${t.surface} border ${t.surfaceBorder} shadow-xl rounded-2xl p-4 z-30`}>
            <div className="flex justify-between items-center mb-3">
              <h4 className={`font-bold ${t.text} text-sm uppercase tracking-wider`}>Substituições Permitidas</h4>
              <button onClick={() => setShowTooltip(false)} className={`${t.textMuted} hover:${t.textSecondary}`}><X size={16} /></button>
            </div>
            <ul className="space-y-3">
              {substitutions.map((sub, idx) => (
                <li key={idx} className={`text-xs ${t.textSecondary} ${t.surface2} p-2 rounded-lg border ${t.surfaceBorder}`}>
                  <span className={`font-bold ${t.primaryText} block mb-1`}>{sub.type}:</span> {sub.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {mealOrder.map((meal) => {
          const mealData = profileMeals[meal.key];
          if (!mealData) return null;

          const isAlmocoMarcos = meal.key === 'almoco' && profileId === 'marcos';
          const isLivreSandra = currentDayData.tipo === 'refeicao_livre' && profileId === 'sandra' && meal.key === 'almoco';
          const hasOpcaoCasa = isAlmocoMarcos && mealData.opcaoCasa;
          const isEmCasa = hasOpcaoCasa && almocoEmCasa;
          
          const storageKey = profileId === 'rosimere' ? `${rosimereFase}_${meal.key}` : `d${planDayDieta}_${meal.key}`;
          const isChecked = dayOffset === 0 ? !!checkedMeals[storageKey] : false;
          const isExpanded = expandedMeal === meal.key;
          const displayRefeicao = isEmCasa ? mealData.opcaoCasa.descricao : mealData.refeicao;

          return (
            <div 
              key={meal.key} 
              className={`flex flex-col p-3 md:p-4 rounded-3xl border transition-all ${
                isChecked 
                  ? `${t.primarySubtle} ${t.primaryBorder} opacity-60`
                  : isLivreSandra 
                    ? 'bg-amber-50 border-amber-200' 
                    : isAlmocoMarcos
                      ? `${t.surface2} ${t.surfaceBorder}`
                      : `${t.surface} ${t.surfaceBorder} shadow-sm`
              }`}
            >
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedMeal(isExpanded ? null : meal.key)}
              >
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold text-[10px] md:text-xs uppercase tracking-wider ${
                      isLivreSandra ? 'text-amber-600' : isAlmocoMarcos ? t.textMuted : t.primaryText
                    }`}>
                      {meal.label}
                    </span>
                    <span className={`text-[10px] md:text-xs font-bold ${t.textMuted} ${t.surface2} px-2 py-0.5 rounded-full`}>
                      {mealData.horario}
                    </span>
                    {isLivreSandra && <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />}
                    {isAlmocoMarcos && !isEmCasa && <Building2 size={14} className={`${t.textMuted} shrink-0`} />}
                    {isEmCasa && <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">🏠 Em casa</span>}
                  </div>
                  {!isExpanded && (
                    <p className={`text-xs md:text-sm font-medium truncate w-[200px] sm:w-auto ${isChecked ? `${t.textMuted} line-through` : t.textSecondary}`}>
                      {displayRefeicao}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className={`${t.textMuted} shrink-0 ${t.surface2} p-1.5 rounded-full`}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className={`mt-3 pt-3 border-t ${t.surfaceBorder} flex items-start justify-between gap-4`}>
                  <div className="flex-1">
                    <p className={`text-sm font-medium pr-4 ${isChecked ? `${t.textMuted} line-through` : t.text}`}>
                      {displayRefeicao}
                    </p>
                    
                    {isEmCasa && mealData.opcaoCasa.alimentos && (
                      <ul className={`mt-2 ml-4 list-disc text-xs ${t.textSecondary}`}>
                        {mealData.opcaoCasa.alimentos.map((alimento: string, idx: number) => (
                          <li key={idx}>{alimento}</li>
                        ))}
                      </ul>
                    )}
                    
                    {isEmCasa && mealData.opcaoCasa.observacao && (
                      <p className={`text-xs ${t.textMuted} mt-2 italic`}>
                        {mealData.opcaoCasa.observacao}
                      </p>
                    )}

                    {mealData.kcal && !isEmCasa && (
                      <p className={`text-xs ${t.textMuted} mt-2 font-medium`}>
                        Aprox. {mealData.kcal} kcal
                      </p>
                    )}
                    {isEmCasa && mealData.opcaoCasa.calorias && (
                      <p className={`text-xs ${t.textMuted} mt-2 font-medium`}>
                        Aprox. {mealData.opcaoCasa.calorias} kcal
                      </p>
                    )}

                    {mealData.dica && !isEmCasa && (
                      <p className={`text-[11px] md:text-xs text-rose-600/80 mt-2 font-semibold bg-rose-50 p-2 rounded-lg border border-rose-100`}>
                        💡 {mealData.dica}
                      </p>
                    )}

                    {hasOpcaoCasa && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setAlmocoEmCasa(!almocoEmCasa); }}
                        className={`mt-3 py-1.5 px-3 rounded-lg border text-xs font-bold transition-colors ${
                          almocoEmCasa 
                            ? `bg-emerald-50 border-emerald-200 text-emerald-700` 
                            : `${t.surface2} ${t.surfaceBorder} ${t.textMuted} hover:${t.textSecondary}`
                        }`}
                      >
                        🏠 {almocoEmCasa ? "Almoçando em casa" : "Estou em casa hoje"}
                      </button>
                    )}
                  </div>

                  {!isLivreSandra && dayOffset === 0 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleToggleMeal(meal.key); }}
                      className={`w-10 h-10 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors mt-1 ${
                        isChecked 
                          ? t.checkOn + ' text-white'
                          : `bg-transparent ${t.surfaceBorder} text-transparent hover:${t.primaryBorder}`
                      }`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`relative ${t.primary} rounded-3xl p-4 md:p-6 text-white shadow-lg overflow-hidden shrink-0`}>
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-white/90">
            <ChefHat size={24} className="text-white/70" />
            Dica de Preparo
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-medium">
            {currentDayData.dica_preparo}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
