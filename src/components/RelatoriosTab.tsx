import React, { useState } from 'react';
import { ShoppingBag, TrendingDown, DollarSign, CheckCircle2, Circle, FileText, Download } from 'lucide-react';
import { mealsData } from '../data/meals';

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
    { semana: 1, total: 370.00, pp: 185.00 },
    { semana: 2, total: 343.00, pp: 171.50 },
    { semana: 3, total: 325.00, pp: 162.50 },
    { semana: 4, total: 313.00, pp: 156.50 },
  ];
  const totalMonth = 1351.00;
  const totalPerson = 675.50;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-2xl">
          <ShoppingBag className="text-teal-700" size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Relatórios & Compras</h2>
          <p className="text-sm text-slate-500">Lista semanal e resumo financeiro</p>
        </div>
      </div>

      {/* EXPORT REPORTS */}
      <section className="bg-slate-800 text-white rounded-3xl p-6 shadow-sm border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-emerald-400" size={28} />
          <div>
            <h3 className="font-bold text-lg">Gerar Relatórios</h3>
            <p className="text-sm text-slate-300">Exporte seu progresso para acompanhamento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={generateWeeklyReport}
            className="bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-4 flex items-center justify-between text-left"
          >
            <div>
              <p className="font-bold text-emerald-400 mb-1">Relatório Semanal</p>
              <p className="text-xs text-slate-300">Resumo da semana atual e lista de compras</p>
            </div>
            <Download className="text-slate-400" size={20} />
          </button>

          <button 
            onClick={generateMonthlyReport}
            className="bg-emerald-600 hover:bg-emerald-500 transition-colors rounded-2xl p-4 flex items-center justify-between text-left shadow-lg border border-emerald-500"
          >
            <div>
              <p className="font-bold text-white mb-1">Relatório Mensal</p>
              <p className="text-xs text-emerald-100">Visão geral do mês, adesão e peso</p>
            </div>
            <Download className="text-emerald-200" size={20} />
          </button>
        </div>
      </section>

      {/* SHOPPING LIST (CURRENT WEEK) */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-slate-800">Lista da Semana {currentWeek}</h3>
            {absolutePlanDay > 0 && absolutePlanDay <= 30 && (
              <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded-full">Atual</span>
            )}
          </div>
          {shoppingListObject && (
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider relative top-1">Total Estimado</span>
              <p className="text-xl font-bold text-emerald-700">R$ {shoppingListObject.total.toFixed(2).replace('.', ',')}</p>
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
                      ? 'bg-slate-50 border-slate-200 opacity-60' 
                      : 'bg-white border-emerald-50 hover:bg-emerald-50'
                  }`}
                >
                  <button className="shrink-0 mt-0.5">
                    {bought ? (
                      <CheckCircle2 size={22} className="text-emerald-500" />
                    ) : (
                      <Circle size={22} className="text-slate-300" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${bought ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                      {item.item}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.qtd} • {item.onde}</p>
                  </div>
                  <div className="font-medium text-sm text-slate-600 shrink-0">
                    R$ {item.custo.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-2xl">
            Nenhuma lista de compras encontrada para a semana atual.
          </div>
        )}
      </section>

      {/* FINANCIAL SUMMARY */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
        <h3 className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-6">
          <DollarSign className="text-teal-600" size={24} /> Resumo Financeiro (Mês 1)
        </h3>
        
        <div className="overflow-hidden rounded-2xl border border-slate-100 mb-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
              <tr>
                <th className="px-4 py-3">Semana</th>
                <th className="px-4 py-3 text-right">Total (Casal)</th>
                <th className="px-4 py-3 text-right">Por Pessoa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {financialSummary.map((row) => (
                <tr key={row.semana}>
                  <td className="px-4 py-3 font-semibold text-slate-800">Semana {row.semana}</td>
                  <td className="px-4 py-3 text-right">R$ {row.total.toFixed(2).replace('.', ',')}</td>
                  <td className="px-4 py-3 text-right text-slate-500">R$ {row.pp.toFixed(2).replace('.', ',')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-emerald-50 font-bold text-emerald-800">
              <tr>
                <td className="px-4 py-3">MÊS COMPLETO</td>
                <td className="px-4 py-3 text-right text-base text-emerald-700">R$ {totalMonth.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3 text-right text-emerald-600">R$ {totalPerson.toFixed(2).replace('.', ',')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* SAVINGS TIPS */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-teal-800 mb-3">
            <TrendingDown size={18} />
            Dicas de Economia Inteligente
          </h4>
          <ul className="space-y-2 text-sm text-teal-700/80">
            <li className="flex gap-2">
              <span className="text-teal-500">•</span>
              Compre vegetais e ovos em feiras livres da sua região ou "sacolões", chega a ser 40% mais barato.
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">•</span>
              Proteínas: Compre os 10kg de frango do mês em atacado (Atacadão, Assaí) e congele em porções.
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">•</span>
              A sardinha fresca em Pernambuco tem excelente preço, substitua o atum quando possível.
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">•</span>
              Ovos continuam sendo a proteína com melhor custo-benefício. Se faltar orçamento, aumente eles e reduza a carne.
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">•</span>
              Iogurte Grego: Compre o pote "família" (1kg) em vez dos potes individuais, o preço por grama cai consideravelmente.
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">•</span>
              Substitua castanhas caras (nozes/amêndoas) por castanha de caju que é mais acessível no nordeste, ou pasta de amendoim.
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
