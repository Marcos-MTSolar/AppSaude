import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Activity, Scale, Ruler, CheckCircle2, ChevronRight, AlertCircle, Trash2 } from 'lucide-react';
import { getWorkoutForDay } from '../data/workouts';
import { mealsData } from '../data/meals';
import { getTheme } from '../utils/theme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSyncedStorage } from '../hooks/useSyncedStorage';

interface AcompanhamentoTabProps {
  profileId: 'marcos' | 'sandra';
  absolutePlanDay: number;
}



export function AcompanhamentoTab({ profileId, absolutePlanDay }: AcompanhamentoTabProps) {
  const t = getTheme(profileId);
  const [weights, setWeights] = useLocalStorage<{ date: string; weight: number }[]>(`${profileId}_weights`, []);
  const [measurements, setMeasurements] = useSyncedStorage<{ date: string; cintura: number; quadril: number; bracos: number; coxas: number; torax: number }[]>(`${profileId}_measurements`, [], profileId);
  const [doneWorkouts] = useSyncedStorage<Record<string, { done: boolean, duration?: number }>>(`${profileId}_workouts_done`, {}, profileId);

  // Form states
  const [weightDate, setWeightDate] = useState(new Date().toISOString().split('T')[0]);
  const [weightValue, setWeightValue] = useState('');
  
  const [measDate, setMeasDate] = useState(new Date().toISOString().split('T')[0]);
  const [measValues, setMeasValues] = useState({ cintura: '', quadril: '', bracos: '', coxas: '', torax: '' });

  const height = profileId === 'marcos' ? 1.75 : 1.64;
  const goalWeight = profileId === 'marcos' ? 76 : 65;

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightValue || isNaN(Number(weightValue))) return;
    
    // Replace if same date, else append
    setWeights(prev => {
      const existing = prev.filter(w => w.date !== weightDate);
      return [...existing, { date: weightDate, weight: Number(weightValue) }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    setWeightValue('');
  };

  const removeWeight = (date: string) => {
    if (confirm('Remover registro de pesagem?')) {
      setWeights(prev => prev.filter(w => w.date !== date));
    }
  };

  const handleAddMeas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!measValues.cintura) return; // requiring at least one
    
    setMeasurements(prev => {
      const existing = prev.filter(m => m.date !== measDate);
      return [...existing, { 
        date: measDate, 
        cintura: Number(measValues.cintura) || 0,
        quadril: Number(measValues.quadril) || 0,
        bracos: Number(measValues.bracos) || 0,
        coxas: Number(measValues.coxas) || 0,
        torax: Number(measValues.torax) || 0
      }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    setMeasValues({ cintura: '', quadril: '', bracos: '', coxas: '', torax: '' });
  };

  const removeMeas = (date: string) => {
    if (confirm('Remover registro de medidas?')) {
      setMeasurements(prev => prev.filter(m => m.date !== date));
    }
  };

  // Workout Adhesion Map
  const weeks = [1, 2, 3, 4]; // currently 4 weeks available in data
  
  return (
    <div className="space-y-8 pb-20">
      
      {/* Pesagem */}
      <section className={`${t.surface} p-4 md:p-6 rounded-3xl shadow-sm border ${t.surfaceBorder}`}>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className={`p-3 ${t.primarySubtle} rounded-2xl`}>
            <Scale className={t.primaryText} size={20} />
          </div>
          <div>
            <h2 className={`text-lg md:text-xl font-bold ${t.text}`}>Pesagem Semanal</h2>
            <p className={`text-xs md:text-sm ${t.textMuted}`}>Mantenha seu histórico atualizado</p>
          </div>
        </div>

        <div className={`${t.primarySubtle} border ${t.primaryBorder} rounded-2xl p-3 md:p-4 mb-4 md:mb-6 flex items-start gap-3`}>
          <AlertCircle className={`${t.primaryText} shrink-0 mt-0.5`} size={18} />
          <p className={`text-xs md:text-sm ${t.primarySubtleText} font-medium leading-relaxed`}>
            Recomendado registrar sempre às <strong>Segundas-feiras</strong>, ao acordar (em jejum) e após ir ao banheiro, para ter uma média real e sem variações de retenção.
          </p>
        </div>

        <form onSubmit={handleAddWeight} className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
          <div className="flex gap-2">
            <input 
              type="date" 
              className={`border-slate-200 rounded-xl flex-1 px-3 py-2 md:px-4 md:py-3 ${t.inputBg} text-sm md:text-base ${t.text} outline-none ${t.inputFocusRing}`}
              value={weightDate}
              onChange={(e) => setWeightDate(e.target.value)}
              required
            />
            <div className="relative flex-1">
              <input 
                type="number" 
                step="0.1"
                placeholder="Ex: 85.5"
                className={`border-slate-200 rounded-xl w-full px-3 py-2 md:px-4 md:py-3 ${t.inputBg} text-sm md:text-base ${t.text} outline-none ${t.inputFocusRing} pr-8`}
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
                required
              />
              <span className={`absolute right-3 top-2.5 md:top-3.5 ${t.textMuted} font-bold text-xs md:text-sm`}>kg</span>
            </div>
          </div>
          <button type="submit" className={`${t.primary} ${t.primaryHover} text-white font-bold py-3 sm:py-0 px-6 rounded-xl transition text-sm md:text-base`}>
            Salvar
          </button>
        </form>

        {weights.length > 0 && (
          <>
            <div className="h-64 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weights} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" tickFormatter={(v) => v.split('-').reverse().slice(0,2).join('/')} axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(v: number) => [`${v} kg`, 'Peso']}
                    labelFormatter={(l) => `Data: ${l.split('-').reverse().join('/')}`}
                  />
                  <ReferenceLine y={goalWeight} stroke="#10B981" strokeDasharray="3 3" label={{ position: 'top', value: 'Meta', fill: '#10B981', fontSize: 12 }} />
                  <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={4} activeDot={{ r: 8 }} dot={{ r: 4, strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={`overflow-x-auto rounded-xl border ${t.surfaceBorder}`}>
              <table className="w-full text-sm text-left">
                <thead className={`${t.surface2} ${t.textSecondary} font-bold uppercase text-xs`}>
                  <tr>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3 text-right">Peso</th>
                    <th className="px-4 py-3 text-right">IMC</th>
                    <th className="px-4 py-3 text-right">Diferença</th>
                    <th className="px-4 py-3 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className={`divide-y divide-slate-50 ${t.textSecondary}`}>
                  {weights.map((w, i) => {
                    const imc = w.weight / (height * height);
                    const diff = i > 0 ? w.weight - weights[i-1].weight : 0;
                    return (
                      <tr key={w.date} className={`hover:${t.surface2} transition`}>
                        <td className="px-4 py-3">{w.date.split('-').reverse().join('/')}</td>
                        <td className={`px-4 py-3 text-right font-bold ${t.text}`}>{w.weight.toFixed(1)} kg</td>
                        <td className="px-4 py-3 text-right">{imc.toFixed(1)}</td>
                        <td className={`px-4 py-3 text-right font-medium ${diff > 0 ? 'text-red-500' : diff < 0 ? t.primaryText : t.textMuted}`}>
                          {diff > 0 ? '+' : ''}{diff !== 0 ? diff.toFixed(1) : '-'} kg
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => removeWeight(w.date)} className={`p-1.5 ${t.textMuted} hover:text-red-500 rounded ${t.surface2} hover:bg-red-50 transition`}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* Medições */}
      <section className={`${t.surface} p-4 md:p-6 rounded-3xl shadow-sm border ${t.surfaceBorder}`}>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className={`p-3 ${t.primarySubtle} rounded-2xl`}>
            <Ruler className={t.primaryText} size={20} />
          </div>
          <div>
            <h2 className={`text-lg md:text-xl font-bold ${t.text}`}>Medições Mensais</h2>
            <p className={`text-xs md:text-sm ${t.textMuted}`}>Acompanhe sua evolução em centímetros</p>
          </div>
        </div>

        <form onSubmit={handleAddMeas} className="mb-6 md:mb-8">
          <div className="flex gap-3 mb-3 md:mb-4">
            <div className="flex-1">
              <label className={`text-[10px] md:text-xs font-bold ${t.textMuted} uppercase ml-1 block mb-1`}>Data</label>
              <input 
                type="date" 
                className={`w-full border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 ${t.inputBg} text-sm md:text-base ${t.text} outline-none ${t.inputFocusRing}`}
                value={measDate}
                onChange={(e) => setMeasDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-4">
            {['cintura', 'quadril', 'bracos', 'coxas', 'torax'].map(field => (
              <div key={field} className="relative">
                <label className={`text-[10px] md:text-xs font-bold ${t.textMuted} uppercase ml-1 block mb-1`}>{field}</label>
                <input 
                  type="number" 
                  step="0.1"
                  className={`w-full border-slate-200 rounded-xl px-2 md:px-3 py-2 md:py-2.5 ${t.inputBg} text-sm md:text-base ${t.text} outline-none ${t.inputFocusRing} pr-7`}
                  value={(measValues as any)[field]}
                  onChange={(e) => setMeasValues({...measValues, [field]: e.target.value})}
                  required={field === 'cintura'}
                />
                <span className={`absolute right-2 top-7 md:top-8 ${t.textMuted} font-bold text-[10px] md:text-xs`}>cm</span>
              </div>
            ))}
          </div>

          <button type="submit" className={`w-full ${t.primary} ${t.primaryHover} text-white font-bold py-3 rounded-xl transition text-sm md:text-base`}>
            Registrar Medidas
          </button>
        </form>

        {measurements.length > 0 && (
          <div className={`overflow-x-auto rounded-xl border ${t.surfaceBorder}`}>
            <table className="w-full text-sm text-center">
              <thead className={`${t.surface2} ${t.textSecondary} font-bold uppercase text-xs`}>
                <tr>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-3 py-3">Cintura</th>
                  <th className="px-3 py-3">Quadril</th>
                  <th className="px-3 py-3">Braços</th>
                  <th className="px-3 py-3">Coxas</th>
                  <th className="px-3 py-3">Tórax</th>
                  <th className="px-3 py-3">Ação</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-slate-50 ${t.textSecondary}`}>
                {measurements.map(m => (
                  <tr key={m.date} className={`hover:${t.surface2} transition`}>
                    <td className="px-4 py-3 font-medium text-left">{m.date.split('-').reverse().join('/')}</td>
                    <td className="px-3 py-3">{m.cintura || '-'}</td>
                    <td className="px-3 py-3">{m.quadril || '-'}</td>
                    <td className="px-3 py-3">{m.bracos || '-'}</td>
                    <td className="px-3 py-3">{m.coxas || '-'}</td>
                    <td className="px-3 py-3">{m.torax || '-'}</td>
                    <td className="px-3 py-3">
                      <button onClick={() => removeMeas(m.date)} className={`p-1.5 ${t.textMuted} hover:text-red-500 rounded ${t.surface2} hover:bg-red-50 transition`}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Controle de Treinos */}
      <section className={`${t.surface} p-4 md:p-6 rounded-3xl shadow-sm border ${t.surfaceBorder}`}>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className={`p-3 ${t.primarySubtle} rounded-2xl`}>
            <Activity className={t.primaryText} size={20} />
          </div>
          <div>
            <h2 className={`text-lg md:text-xl font-bold ${t.text}`}>Controle de Treinos</h2>
            <p className={`text-xs md:text-sm ${t.textMuted}`}>Consistência semanal</p>
          </div>
        </div>

        <div className="space-y-6">
          {weeks.map(week => {
            const numDiasParaCobrir = 7;
            const weekDays = Array.from({length: numDiasParaCobrir}, (_, i) => {
              const dayInPlan = (week - 1) * 7 + (i + 1);
              const keys = Object.keys(doneWorkouts);
              const doneKey = keys.find(k => k.includes(`_w${week}_d${dayInPlan}`) && doneWorkouts[k].done);
              
              return { dayInPlan, done: !!doneKey };
            });

            const plannedWorkoutsPerWeek = profileId === 'marcos' ? 5 : 4;
            const doneCount = weekDays.filter(d => d.done).length;
            const adherence = Math.min(100, Math.round((doneCount / plannedWorkoutsPerWeek) * 100));

            return (
              <div key={week} className={`border ${t.surfaceBorder} rounded-2xl p-4 ${t.surface2}`}>
                <div className="flex justify-between items-center mb-3">
                  <h4 className={`font-bold ${t.textSecondary}`}>Semana {week}</h4>
                  <div className={`text-sm font-bold ${t.surface} px-3 py-1 rounded-full shadow-sm ${t.textSecondary}`}>
                    Adesão: <span className={adherence >= 80 ? t.primaryText : adherence >= 50 ? 'text-amber-500' : 'text-red-500'}>{adherence}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map(wd => (
                    <div 
                      key={wd.dayInPlan} 
                      className={`aspect-square rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm ${
                        wd.done 
                          ? `${t.primary} text-white shadow-sm` 
                          : `${t.surface} border ${t.surfaceBorder} ${t.textMuted}`
                      }`}
                      title={`Dia ${wd.dayInPlan}`}
                    >
                      {wd.done ? <CheckCircle2 size={18} /> : `D${wd.dayInPlan % 7 || 7}`}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
