import React, { useState } from 'react';
import { ShoppingBag, TrendingDown, DollarSign, CheckCircle2, Circle, FileText, Download } from 'lucide-react';
import { mealsData } from '../data/meals';
import { getTheme } from '../utils/theme';

interface RelatoriosTabProps {
  profileId: 'marcos' | 'sandra';
  absolutePlanDay: number;
}

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

export function RelatoriosTab({ profileId, absolutePlanDay }: RelatoriosTabProps) {
  const t = getTheme(profileId);
  // Determine current week 1-4, maxing at 4, mining at 1
  const currentWeek = Math.max(1, Math.min(4, Math.ceil(absolutePlanDay / 7)));
  
  const weekData = mealsData.find(w => w.semana === currentWeek);
  const shoppingListObject = weekData?.lista_compras;
  
  const [boughtItems, setBoughtItems] = useLocalStorage<Record<number, Record<string, boolean>>>('vida_saudavel_compras', {});

  const downloadReport = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateWeeklyReport = () => {
    const startDateDietaStr = window.localStorage.getItem(`${profileId}_data_inicio_dieta`) || 'Não registrada';
    const startDateTreinoStr = window.localStorage.getItem(`${profileId}_data_inicio_treino`) || 'Não registrada';
    const meals = JSON.parse(window.localStorage.getItem(`${profileId}_meals`) || '{}');
    const workouts = JSON.parse(window.localStorage.getItem(`${profileId}_workouts_done`) || '{}');
    const wgts: {date: string, weight: number}[] = JSON.parse(window.localStorage.getItem(`${profileId}_weights`) || '[]');
    const waterHistory = JSON.parse(window.localStorage.getItem(`${profileId}_water_history`) || '{}');
    const waterGoal = Number(window.localStorage.getItem(`${profileId}_water_goal`)) || 2500;

    // Week metrics
    const expectedMeals = 7 * 6; // 6 meals per day
    let doneMealCount = 0;
    for (let d = 1; d <= 7; d++) {
      const planD = (currentWeek - 1) * 7 + d;
      ['cafe_manha', 'lanche_manha', 'almoco', 'lanche_tarde', 'jantar', 'ceia'].forEach(m => {
        if (meals[`${planD}_${m}`]) doneMealCount++;
      });
    }
    const dietAdhesion = Math.round((doneMealCount / expectedMeals) * 100);

    let doneWorkoutCount = 0;
    const workoutKeys = Object.keys(workouts);
    for (let d = 1; d <= 7; d++) {
      const planD = (currentWeek - 1) * 7 + d;
      if (workoutKeys.find(k => k.includes(`_w${currentWeek}_d${planD}`) && workouts[k].done)) {
        doneWorkoutCount++;
      }
    }
    const plannedW = profileId === 'marcos' ? 5 : 4;
    const trainingAdhesion = Math.round((doneWorkoutCount / plannedW) * 100);

    const initialW = wgts.length > 0 ? wgts[0].weight : 'N/A';
    const currentW = wgts.length > 0 ? wgts[wgts.length - 1].weight : 'N/A';

    // Water metrics (last 7 days)
    const now = new Date();
    let weeklyWaterTotal = 0;
    let weeklyDaysMet = 0;
    let weeklyDaysCounted = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().substring(0, 10);
      const dayRecords = waterHistory[dateStr];
      if (dayRecords) {
        const dayTotal = dayRecords.reduce((acc: number, curr: any) => acc + curr.amount, 0);
        weeklyWaterTotal += dayTotal;
        if (dayTotal >= waterGoal) weeklyDaysMet++;
        weeklyDaysCounted++;
      }
    }
    const weeklyWaterAvg = weeklyDaysCounted ? Math.round(weeklyWaterTotal / weeklyDaysCounted) : 0;

    let shoppingStr = 'Nenhuma lista encontrada';
    if (shoppingListObject) {
      shoppingStr = shoppingListObject.itens.map(i => `- ${i.item}: ${i.qtd} | R$ ${i.custo.toFixed(2)}`).join('\n');
      shoppingStr += `\nTOTAL ESTIMADO: R$ ${shoppingListObject.total.toFixed(2)}`;
    }

    const report = `
=============================================
RELATÓRIO SEMANAL - SEMANA ${currentWeek}
=============================================
Perfil: ${profileId === 'marcos' ? 'Marcos' : 'Sandra'}
Início da Dieta: ${startDateDietaStr.replace(/"/g, '')}
Início dos Treinos: ${startDateTreinoStr.replace(/"/g, '')}

>> ADESÃO
- Dieta (Refeições concluídas): ${doneMealCount} de ${expectedMeals} (${dietAdhesion}%)
- Treinos (Concluídos): ${doneWorkoutCount} de ${plannedW} (${Math.min(100, trainingAdhesion)}%)

>> HIDRATAÇÃO (Últimos 7 dias)
- Média diária consumida: ${weeklyWaterAvg} ml
- Meta diária atingida: ${weeklyDaysMet} dia(s)
- Meta atual: ${waterGoal} ml

>> PESO
- Peso Inicial: ${initialW} kg
- Peso Atual: ${currentW} kg

>> LISTA DE COMPRAS DA SEMANA ${currentWeek}
${shoppingStr}

=============================================
Documento gerado automaticamente pelo app Vida Saudável - Marcos & Sandra. 
Não substitui avaliação de médico, nutricionista ou educador físico credenciado.
=============================================
`;
    downloadReport(`Relatorio_Semanal_S${currentWeek}_${profileId}.txt`, report);
  };

  const generateMonthlyReport = () => {
    const startDateDietaStr = window.localStorage.getItem(`${profileId}_data_inicio_dieta`) || 'Não registrada';
    const startDateTreinoStr = window.localStorage.getItem(`${profileId}_data_inicio_treino`) || 'Não registrada';
    const meals = JSON.parse(window.localStorage.getItem(`${profileId}_meals`) || '{}');
    const workouts = JSON.parse(window.localStorage.getItem(`${profileId}_workouts_done`) || '{}');
    const wgts: {date: string, weight: number}[] = JSON.parse(window.localStorage.getItem(`${profileId}_weights`) || '[]');
    const waterHistory = JSON.parse(window.localStorage.getItem(`${profileId}_water_history`) || '{}');
    const waterGoal = Number(window.localStorage.getItem(`${profileId}_water_goal`)) || 2500;

    const expectedTotalM = 30 * 6; // approx 6 per day
    const doneMCount = Object.keys(meals).length;
    const dietAdhesion = Math.round((doneMCount / expectedTotalM) * 100);

    const expectedTotalW = profileId === 'marcos' ? 20 : 16; // 4 weeks
    const doneWCount = Object.keys(workouts).filter(k => workouts[k].done).length;
    const trainingAdhesion = Math.round((doneWCount / expectedTotalW) * 100);

    const initialW = wgts.length > 0 ? wgts[0].weight : 0;
    const currentW = wgts.length > 0 ? wgts[wgts.length - 1].weight : 0;
    const goal = profileId === 'marcos' ? 76 : 65;
    const height = profileId === 'marcos' ? 1.75 : 1.64;
    const imc = currentW ? (currentW / (height * height)).toFixed(1) : 'N/A';

    let diffText = 'N/A';
    let progress = '0%';
    if (initialW && currentW) {
      const diff = currentW - initialW;
      diffText = `${diff > 0 ? '+' : ''}${diff.toFixed(1)} kg`;
      const toLose = initialW - goal;
      const lost = initialW - currentW;
      if (toLose > 0) {
        progress = `${Math.round((lost / toLose) * 100)}%`;
      }
    }

    // Water metrics (last 30 days)
    const now = new Date();
    let monthlyWaterTotal = 0;
    let monthlyDaysMet = 0;
    let monthlyDaysCounted = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().substring(0, 10);
      const dayRecords = waterHistory[dateStr];
      if (dayRecords) {
        const dayTotal = dayRecords.reduce((acc: number, curr: any) => acc + curr.amount, 0);
        monthlyWaterTotal += dayTotal;
        if (dayTotal >= waterGoal) monthlyDaysMet++;
        monthlyDaysCounted++;
      }
    }
    const monthlyWaterAvg = monthlyDaysCounted ? Math.round(monthlyWaterTotal / monthlyDaysCounted) : 0;

    const phase = currentWeek <= 4 ? "Fase 1: Adaptação" : currentWeek <= 8 ? "Fase 2: Progressão" : "Fase 3+";
    const expectedAcha = profileId === 'marcos' ? '-2 a -3kg (Fase 1)' : '-1.5 a -2.5kg (Fase 1)';

    const report = `
=============================================
RELATÓRIO MENSAL (30 DIAS)
=============================================
Perfil: ${profileId === 'marcos' ? 'Marcos' : 'Sandra'}
Início da Dieta: ${startDateDietaStr.replace(/"/g, '')}
Início dos Treinos: ${startDateTreinoStr.replace(/"/g, '')}
Fase Atual: ${phase}

>> ADESÃO MÉDIA (MÊS)
- Dieta: ${Math.min(100, dietAdhesion)}%
- Treinos: ${Math.min(100, trainingAdhesion)}%

>> HIDRATAÇÃO (Últimos 30 dias)
- Média diária consumida: ${monthlyWaterAvg} ml
- Meta diária atingida: ${monthlyDaysMet} dia(s)
- Meta atual: ${waterGoal} ml

>> EVOLUÇÃO DE PESO E MEDIDAS
- Peso Inicial: ${initialW || 'N/A'} kg
- Peso Atual: ${currentW || 'N/A'} kg
- Meta Final: ${goal} kg
- Diferença até agora: ${diffText}
- Progresso rumo à meta: ${progress}
- IMC Atual: ${imc}

>> EXPECTATIVA VS REALIDADE
- Esperado para ${profileId === 'marcos' ? 'Marcos' : 'Sandra'}: ${expectedAcha}
- Resultado real: ${diffText}

=============================================
Documento gerado automaticamente pelo app Vida Saudável - Marcos & Sandra. 
Não substitui avaliação de médico, nutricionista ou educador físico credenciado.
=============================================
`;
    downloadReport(`Relatorio_Mensal_${profileId}.txt`, report);
  };


  const handleToggleBought = (itemNome: string) => {
    setBoughtItems(prev => {
      const weekBought = prev[currentWeek] || {};
      return {
        ...prev,
        [currentWeek]: {
          ...weekBought,
          [itemNome]: !weekBought[itemNome]
        }
      };
    });
  };

  const isBought = (itemNome: string) => {
    return boughtItems[currentWeek]?.[itemNome] || false;
  };

  const financialSummary = [
    { semana: 1, total: 355.00, pp: 177.50 },
    { semana: 2, total: 338.00, pp: 169.00 },
    { semana: 3, total: 324.00, pp: 162.00 },
    { semana: 4, total: 323.00, pp: 161.50 },
  ];
  const totalMonth = 1340.00;
  const totalPerson = 670.00;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className={`p-3 ${t.primarySubtle} rounded-2xl`}>
          <ShoppingBag className={t.primaryText} size={24} />
        </div>
        <div>
          <h2 className={`text-lg md:text-xl font-bold ${t.text}`}>Relatórios & Compras</h2>
          <p className={`text-xs md:text-sm ${t.textMuted}`}>Lista semanal e resumo financeiro</p>
        </div>
      </div>

      {/* EXPORT REPORTS */}
      <section className={`${t.surface2} ${t.text} rounded-3xl p-4 md:p-6 shadow-sm border ${t.surfaceBorder}`}>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <FileText className={t.primaryText} size={24} />
          <div>
            <h3 className="font-bold text-base md:text-lg">Gerar Relatórios</h3>
            <p className={`text-[10px] md:text-xs ${t.textMuted}`}>Exporte seu progresso para acompanhamento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={generateWeeklyReport}
            className={`bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-4 flex items-center justify-between text-left ${t.surfaceBorder} border`}
          >
            <div>
              <p className={`font-bold ${t.primaryText} mb-1`}>Relatório Semanal</p>
              <p className={`text-xs ${t.textSecondary}`}>Resumo da semana atual e lista de compras</p>
            </div>
            <Download className={t.textMuted} size={20} />
          </button>

          <button 
            onClick={generateMonthlyReport}
            className={`${t.primary} ${t.primaryHover} transition-colors rounded-2xl p-4 flex items-center justify-between text-left shadow-lg border ${t.primaryBorder}`}
          >
            <div>
              <p className="font-bold text-white mb-1">Relatório Mensal</p>
              <p className={`text-xs text-white/80`}>Visão geral do mês, adesão e peso</p>
            </div>
            <Download className="text-white/60" size={20} />
          </button>
        </div>
      </section>

      {/* SHOPPING LIST (CURRENT WEEK) */}
      <section className={`${t.surface} rounded-3xl p-4 md:p-6 shadow-sm border ${t.surfaceBorder}`}>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-base md:text-lg ${t.text}`}>Lista da Semana {currentWeek}</h3>
            {absolutePlanDay > 0 && absolutePlanDay <= 30 && (
              <span className={`text-[10px] md:text-xs px-2 py-0.5 ${t.primarySubtle} ${t.primaryText} font-bold rounded-full`}>Atual</span>
            )}
          </div>
          {shoppingListObject && (
            <div className="text-right">
              <span className={`text-[10px] md:text-xs ${t.textMuted} uppercase font-bold tracking-wider relative top-1`}>Total Estimado</span>
              <p className={`text-lg md:text-xl font-bold ${t.primaryText}`}>R$ {shoppingListObject.total.toFixed(2).replace('.', ',')}</p>
            </div>
          )}
        </div>

        {shoppingListObject ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shoppingListObject.itens.map((item, idx) => {
              const bought = isBought(item.item);
              return (
                <div 
                  key={idx} 
                  onClick={() => handleToggleBought(item.item)}
                  className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                    bought 
                      ? `${t.surface2} ${t.surfaceBorder} opacity-60` 
                      : `${t.surface} ${t.surfaceBorder} hover:${t.surface2}`
                  }`}
                >
                  <button className="shrink-0 mt-0.5">
                    {bought ? (
                      <CheckCircle2 size={22} className={t.checkOn} />
                    ) : (
                      <Circle size={22} className={t.textMuted} />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${bought ? `${t.textMuted} line-through` : t.text}`}>
                      {item.item}
                    </p>
                    <p className={`text-xs ${t.textSecondary} mt-0.5`}>{item.qtd} • {item.onde}</p>
                  </div>
                  <div className={`font-medium text-sm ${t.textMuted} shrink-0`}>
                    R$ {item.custo.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-6 ${t.textMuted} ${t.surface2} rounded-2xl`}>
            Nenhuma lista de compras encontrada para a semana atual.
          </div>
        )}
      </section>

      {/* FINANCIAL SUMMARY */}
      <section className={`${t.surface} rounded-3xl p-4 md:p-6 shadow-sm border ${t.surfaceBorder}`}>
        <h3 className={`flex items-center gap-2 font-bold text-base md:text-lg ${t.text} mb-4 md:mb-6`}>
          <DollarSign className={t.primaryText} size={20} /> Resumo Financeiro (Mês 1)
        </h3>
        
        <div className={`overflow-x-auto rounded-2xl border ${t.surfaceBorder} mb-4 md:mb-6`}>
          <table className="w-full text-sm text-left">
            <thead className={`${t.surface2} ${t.textSecondary} uppercase text-xs font-bold`}>
              <tr>
                <th className="px-4 py-3">Semana</th>
                <th className="px-4 py-3 text-right">Total (Casal)</th>
                <th className="px-4 py-3 text-right">Por Pessoa</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-slate-100 ${t.textSecondary}`}>
              {financialSummary.map((row) => (
                <tr key={row.semana} className={`hover:${t.surface2}`}>
                  <td className={`px-4 py-3 font-semibold ${t.text}`}>Semana {row.semana}</td>
                  <td className="px-4 py-3 text-right">R$ {row.total.toFixed(2).replace('.', ',')}</td>
                  <td className="px-4 py-3 text-right opacity-80">R$ {row.pp.toFixed(2).replace('.', ',')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className={`${t.primarySubtle} font-bold ${t.primaryText}`}>
              <tr>
                <td className="px-4 py-3">MÊS COMPLETO</td>
                <td className="px-4 py-3 text-right text-base">R$ {totalMonth.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3 text-right opacity-90">R$ {totalPerson.toFixed(2).replace('.', ',')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* SAVINGS TIPS */}
        <div className={`${t.primarySubtle} border ${t.primaryBorder} rounded-2xl p-3 md:p-4`}>
          <h4 className={`flex items-center gap-2 text-xs md:text-sm font-bold ${t.primaryText} mb-2 md:mb-3`}>
            <TrendingDown size={16} />
            Dicas de Economia Inteligente
          </h4>
          <ul className={`space-y-2 text-[10px] md:text-sm ${t.primarySubtleText}`}>
            <li className="flex gap-2">
              <span className={t.primaryText}>•</span>
              Compre vegetais e ovos em feiras livres da sua região ou "sacolões", chega a ser 40% mais barato.
            </li>
            <li className="flex gap-2">
              <span className={t.primaryText}>•</span>
              Proteínas: Compre os 10kg de frango do mês em atacado (Atacadão, Assaí) e congele em porções.
            </li>
            <li className="flex gap-2">
              <span className={t.primaryText}>•</span>
              A sardinha fresca em Pernambuco tem excelente preço, substitua o atum quando possível.
            </li>
            <li className="flex gap-2">
              <span className={t.primaryText}>•</span>
              Ovos continuam sendo a proteína com melhor custo-benefício. Se faltar orçamento, aumente eles e reduza a carne.
            </li>
            <li className="flex gap-2">
              <span className={t.primaryText}>•</span>
              Iogurte Grego: Compre o pote "família" (1kg) em vez dos potes individuais, o preço por grama cai consideravelmente.
            </li>
            <li className="flex gap-2">
              <span className={t.primaryText}>•</span>
              Substitua castanhas caras (nozes/amêndoas) por castanha de caju que é mais acessível no nordeste, ou pasta de amendoim.
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
