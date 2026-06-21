import { useState, useEffect, ChangeEvent } from 'react';
import { Home, Utensils, Dumbbell, Activity, FileText, ArrowLeft, MoreVertical, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculatePlanDay, formatDateBR } from '../utils/date';
import InicioTab from './InicioTab';
import CardapioTab from './CardapioTab';
import { AcompanhamentoTab } from './AcompanhamentoTab';
import { RelatoriosTab } from './RelatoriosTab';
import { TreinoTab } from './TreinoTab';

interface DashboardProps {
  profile: 'marcos' | 'sandra';
  onLogout: () => void;
}

type TabType = 'inicio' | 'cardapio' | 'treino' | 'acompanhamento' | 'relatorios';

export default function Dashboard({ profile, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  // Migração de dados legados
  useEffect(() => {
    const legacyStart = window.localStorage.getItem(`${profile}_data_inicio`);
    if (legacyStart) {
      if (!window.localStorage.getItem(`${profile}_data_inicio_dieta`)) {
        window.localStorage.setItem(`${profile}_data_inicio_dieta`, legacyStart);
      }
      if (!window.localStorage.getItem(`${profile}_data_inicio_treino`)) {
        window.localStorage.setItem(`${profile}_data_inicio_treino`, legacyStart);
      }
      window.localStorage.removeItem(`${profile}_data_inicio`);
    }

    const legacyAbsoluteStart = window.localStorage.getItem(`${profile}_absolute_data_inicio`);
    if (legacyAbsoluteStart) {
      if (!window.localStorage.getItem(`${profile}_absolute_data_inicio_treino`)) {
        window.localStorage.setItem(`${profile}_absolute_data_inicio_treino`, legacyAbsoluteStart);
      }
      window.localStorage.removeItem(`${profile}_absolute_data_inicio`);
    }
  }, [profile]);

  const [startDateDietaStr, setStartDateDietaStr] = useLocalStorage<string | null>(`${profile}_data_inicio_dieta`, null);
  const [startDateTreinoStr, setStartDateTreinoStr] = useLocalStorage<string | null>(`${profile}_data_inicio_treino`, null);
  const [absoluteStartDateTreinoStr, setAbsoluteStartDateTreinoStr] = useLocalStorage<string | null>(`${profile}_absolute_data_inicio_treino`, null);
  
  const [showEditDate, setShowEditDate] = useState(false);

  const planDayDieta = calculatePlanDay(startDateDietaStr);
  const planDayTreino = calculatePlanDay(startDateTreinoStr);
  const absolutePlanDayTreino = calculatePlanDay(absoluteStartDateTreinoStr) || planDayTreino || 1;
  const profileName = profile === 'marcos' ? 'Marcos' : 'Sandra';

  const handleEditDateDieta = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const d = new Date(e.target.value + 'T12:00:00Z');
      setStartDateDietaStr(d.toISOString());
    }
  };

  const handleEditDateTreino = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const d = new Date(e.target.value + 'T12:00:00Z');
      setStartDateTreinoStr(d.toISOString());
      if (!absoluteStartDateTreinoStr) {
        setAbsoluteStartDateTreinoStr(d.toISOString());
      }
    }
  };

  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'cardapio', label: 'Cardápio', icon: Utensils },
    { id: 'treino', label: 'Treino', icon: Dumbbell },
    { id: 'acompanhamento', label: 'Ficha', icon: Activity },
    { id: 'relatorios', label: 'Relatórios', icon: FileText },
  ] as const;

  const renderContent = () => {
    // Removido o bloco global de "ainda não iniciou" ou "completou ciclo".
    // Essa lógica passará para dentro das abas específicas, se necessário.


    // Default Content for Tabs
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('cardapio')}
                className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center gap-3 text-slate-600 hover:bg-emerald-50/50 transition-colors active:scale-95"
              >
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                  <Utensils size={28} />
                </div>
                <span className="font-bold text-slate-700">Refeições</span>
              </button>
              <button 
                onClick={() => setActiveTab('treino')}
                className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center gap-3 text-slate-600 hover:bg-emerald-50/50 transition-colors active:scale-95"
              >
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                  <Dumbbell size={28} />
                </div>
                <span className="font-bold text-slate-700">Treino Hoje</span>
              </button>
            </div>

            <InicioTab 
              profileId={profile} 
              planDayDieta={planDayDieta} 
              planDayTreino={planDayTreino}
              absolutePlanDayTreino={absolutePlanDayTreino}
              startDateDietaStr={startDateDietaStr}
              startDateTreinoStr={startDateTreinoStr}
            />
          </div>
        );
      case 'cardapio':
        return <CardapioTab profileId={profile} planDayDieta={planDayDieta} setStartDateDietaStr={setStartDateDietaStr} />;
      case 'treino':
        return <TreinoTab profileId={profile} planDayTreino={planDayTreino} absolutePlanDayTreino={absolutePlanDayTreino} setStartDateTreinoStr={setStartDateTreinoStr} setAbsoluteStartDateTreinoStr={setAbsoluteStartDateTreinoStr} />;
      case 'acompanhamento':
        return <AcompanhamentoTab profileId={profile} absolutePlanDay={absolutePlanDayTreino} />;
      case 'relatorios':
        return <RelatoriosTab profileId={profile} absolutePlanDay={absolutePlanDayTreino} />;
    }
  };

  return (
    <div className="h-screen bg-emerald-50 text-slate-900 font-sans flex flex-col overflow-hidden select-none">
      
      {/* Sleek Header */}
      <header className="h-20 bg-white border-b border-emerald-100 flex items-center justify-between px-4 md:px-10 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">VS</div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent hidden sm:block">
            Vida Saudável <span className="font-normal text-slate-400">| {profileName}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 bg-emerald-50 px-2 md:px-4 py-1.5 md:py-2 rounded-full border border-emerald-100 relative">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {profileName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-teal-800 hidden md:block">{profileName}</span>
            <button onClick={() => setShowEditDate(!showEditDate)} className="p-1 text-teal-600 hover:bg-teal-100 rounded-full transition-colors">
              <MoreVertical size={18} />
            </button>
            {showEditDate && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 shadow-lg rounded-xl p-4 z-30 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar size={12}/> Início da Dieta
                  </label>
                  <input 
                    type="date" 
                    onChange={handleEditDateDieta}
                    value={startDateDietaStr ? new Date(startDateDietaStr).toISOString().substring(0, 10) : ''}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar size={12}/> Início dos Treinos
                  </label>
                  <input 
                    type="date" 
                    onChange={handleEditDateTreino}
                    value={startDateTreinoStr ? new Date(startDateTreinoStr).toISOString().substring(0, 10) : ''}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
          <button onClick={onLogout} className="text-sm text-emerald-600 font-semibold hover:bg-emerald-100 px-3 md:px-4 py-2 rounded-lg transition-colors border border-emerald-200">
            <span className="hidden sm:inline">Trocar Perfil</span>
            <ArrowLeft size={20} className="sm:hidden" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto space-y-6">
        {renderContent()}
      </main>

      {/* Sleek Bottom Navigation */}
      <nav className="h-16 md:h-20 bg-white border-t border-emerald-100 flex items-center justify-around px-2 md:px-20 shrink-0 pb-safe z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase">{tab.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="bg-slate-100/50 p-3 text-[10px] text-center text-slate-400 border-t border-slate-200">
        Este plano foi elaborado com auxílio de inteligência artificial com base nos dados fornecidos. 
        Não substitui avaliação de médico, nutricionista ou educador físico credenciado. 
        Recomenda-se realizar exames de sangue básicos (glicemia, colesterol, hemograma) antes de iniciar.
      </div>

    </div>
  );
}
