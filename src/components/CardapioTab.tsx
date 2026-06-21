import { useState } from 'react';
import { HelpCircle, ChefHat, Check, X, MapPin, Star, Building2 } from 'lucide-react';
import { mealsData, substitutions } from '../data/meals';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CardapioTabProps {
  profileId: 'marcos' | 'sandra';
  planDayDieta: number | null;
  setStartDateDietaStr: (date: string) => void;
}

export default function CardapioTab({ profileId, planDayDieta, setStartDateDietaStr }: CardapioTabProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [checkedMeals, setCheckedMeals] = useLocalStorage<Record<string, boolean>>(`${profileId}_meals_checked`, {});

  if (planDayDieta === null) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-white rounded-3xl shadow-sm border border-emerald-100">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
          <ChefHat size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 italic">Dieta não iniciada</h2>
        <p className="text-slate-500 max-w-sm mb-4">
          Você ainda não começou a seguir o cardápio. Toque no botão abaixo quando fizer sua primeira refeição do plano!
        </p>
        <button
          onClick={() => setStartDateDietaStr(new Date().toISOString())}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 w-full max-w-xs"
        >
          Comecei a dieta hoje
        </button>
      </div>
    );
  }

  // Loop back if day > 14 (assuming we only have 14 days of data right now)
  const dataDayIndex = (planDayDieta - 1) % 14; 
  
  // Find the day's data
  let currentDayData = mealsData[0].dias[0];
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

  const profileMeals = currentDayData[profileId] as Record<string, any>;

  const mealOrder = [
    { key: 'cafe_manha', label: 'Café da Manhã' },
    { key: 'lanche_manha', label: 'Lanche da Manhã' },
    { key: 'almoco', label: 'Almoço' },
    { key: 'lanche_tarde', label: 'Lanche da Tarde' },
    { key: 'jantar', label: 'Jantar' },
    { key: 'ceia', label: 'Ceia' }
  ];

  const handleToggleMeal = (mealKey: string) => {
    const storageKey = `d${planDayDieta}_${mealKey}`;
    setCheckedMeals(prev => ({
      ...prev,
      [storageKey]: !prev[storageKey]
    }));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 relative">
        <div>
          <h3 className="font-bold text-xl flex items-center gap-2 text-slate-800">
            Cardápio de Hoje
          </h3>
          <p className="text-emerald-600 font-medium text-sm mt-1">
            {currentDayData.dia_semana} — Dia {planDayDieta}
          </p>
        </div>
        <button 
          onClick={() => setShowTooltip(!showTooltip)}
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-emerald-600 transition-colors"
        >
          <HelpCircle size={24} />
        </button>

        {showTooltip && (
          <div className="absolute right-6 top-full mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 z-30">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Substituições Permitidas</h4>
              <button onClick={() => setShowTooltip(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
            </div>
            <ul className="space-y-3">
              {substitutions.map((sub, idx) => (
                <li key={idx} className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-bold text-emerald-600 block mb-1">{sub.type}:</span> {sub.text}
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
          
          const storageKey = `d${planDayDieta}_${meal.key}`;
          const isChecked = !!checkedMeals[storageKey];

          return (
            <div 
              key={meal.key} 
              className={`flex items-start p-4 rounded-3xl border transition-all ${
                isChecked 
                  ? 'bg-emerald-50/50 border-emerald-200/50 opacity-75' 
                  : isLivreSandra 
                    ? 'bg-amber-50 border-amber-200' 
                    : isAlmocoMarcos
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-emerald-100 shadow-sm'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold text-xs uppercase tracking-wider ${
                    isLivreSandra ? 'text-amber-600' : isAlmocoMarcos ? 'text-slate-500' : 'text-emerald-600'
                  }`}>
                    {meal.label}
                  </span>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {mealData.horario}
                  </span>
                  {isLivreSandra && <Star size={14} className="text-amber-500 fill-amber-500" />}
                  {isAlmocoMarcos && <Building2 size={14} className="text-slate-500" />}
                </div>

                <p className={`text-sm font-medium pr-4 ${isChecked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                  {mealData.refeicao}
                </p>
                
                {mealData.kcal && (
                  <p className="text-xs text-slate-400 mt-2 font-medium">
                    Aprox. {mealData.kcal} kcal
                  </p>
                )}
              </div>

              {!isLivreSandra && (
                <button 
                  onClick={() => handleToggleMeal(meal.key)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors mt-1 ${
                    isChecked 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-300 text-transparent hover:border-emerald-400'
                  }`}
                >
                  <Check size={16} strokeWidth={3} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-teal-100">
            <ChefHat size={24} className="text-teal-300" />
            Dica de Preparo
          </h3>
          <p className="text-sm text-teal-50 leading-relaxed font-medium">
            {currentDayData.dica_preparo}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
