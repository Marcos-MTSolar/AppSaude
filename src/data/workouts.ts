export type ExerciseType = 'reps' | 'time';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  sets: number;
  reps?: string | number; // e.g. "10-15" or 12
  workTime?: number; // seconds (for 'time' or HIIT)
  restTime: number; // seconds
  note?: string;
}

export interface WorkoutData {
  id: string;
  title: string;
  duration: string;
  description: string;
  exercises: Exercise[];
  isRest?: boolean;
}

const marcosTreinoA: WorkoutData = {
  id: 'marcos_A',
  title: 'Treino A - Força Empurra',
  duration: '30 min',
  description: 'Foco em peito, ombros, tríceps e core. 5 min aquecimento + 20 min treino + 5 min volta à calma.',
  exercises: [
    { id: 'a1', name: 'Flexão de braço (push-up)', type: 'reps', sets: 4, reps: '10-15', restTime: 45 },
    { id: 'a2', name: 'Tríceps no banco/cadeira', type: 'reps', sets: 3, reps: 12, restTime: 40 },
    { id: 'a3', name: 'Pike push-up (ombros)', type: 'reps', sets: 3, reps: 10, restTime: 45 },
    { id: 'a4', name: 'Prancha abdominal', type: 'time', sets: 3, workTime: 45, restTime: 30, note: 'Tente manter entre 30 e 45 segundos' },
    { id: 'a5', name: 'Abdominal crunch', type: 'reps', sets: 3, reps: 20, restTime: 30 },
  ]
};

const marcosTreinoB: WorkoutData = {
  id: 'marcos_B',
  title: 'Treino B - Força Puxa + Pernas',
  duration: '30 min',
  description: 'Foco em bíceps, costas, glúteo e quadríceps.',
  exercises: [
    { id: 'b1', name: 'Agachamento livre', type: 'reps', sets: 4, reps: 15, restTime: 45 },
    { id: 'b2', name: 'Avanço (lunge alternado)', type: 'reps', sets: 3, reps: '10 cada', restTime: 40 },
    { id: 'b3', name: 'Remada com mochila', type: 'reps', sets: 3, reps: 12, restTime: 45, note: 'Puxe focando nos músculos das costas' },
    { id: 'b4', name: 'Elevação de quadril', type: 'reps', sets: 3, reps: 15, restTime: 30 },
    { id: 'b5', name: 'Superman (lombar)', type: 'reps', sets: 3, reps: 12, restTime: 30 },
  ]
};

const marcosTreinoC: WorkoutData = {
  id: 'marcos_C',
  title: 'Treino C - HIIT Cardio',
  duration: '20-30 min',
  description: 'Queima de gordura + cardiorrespiratório. Formato HIIT.',
  exercises: [
    { id: 'c1', name: 'Jumping jack', type: 'time', sets: 4, workTime: 30, restTime: 15 },
    { id: 'c2', name: 'Burpee (sem salto no início)', type: 'time', sets: 4, workTime: 30, restTime: 20 },
    { id: 'c3', name: 'Mountain climber', type: 'time', sets: 4, workTime: 30, restTime: 15 },
    { id: 'c4', name: 'Corrida estacionária (joelho alto)', type: 'time', sets: 4, workTime: 45, restTime: 15 },
  ]
};

const marcosDescanso: WorkoutData = {
  id: 'marcos_rest',
  title: 'Descanso Ativo',
  duration: '40 min',
  description: 'Caminhada leve 20 min + alongamento 20 min.',
  exercises: [],
  isRest: true
};

const sandraF1: WorkoutData = {
  id: 'sandra_F1',
  title: 'Treino F1 - Cardio Suave + Core',
  duration: '35 min',
  description: 'Ativação metabólica, postura e core. Baixo impacto, iniciante.',
  exercises: [
    { id: 'f1_1', name: 'Marcha no lugar (joelho alto)', type: 'time', sets: 1, workTime: 300, restTime: 0, note: 'Aquecimento (5 min)' },
    { id: 'f1_2', name: 'Agachamento assistido', type: 'reps', sets: 3, reps: 12, restTime: 45, note: 'Segure na cadeira se precisar' },
    { id: 'f1_3', name: 'Elevação lateral dos braços', type: 'reps', sets: 3, reps: 15, restTime: 30, note: 'Use garrafinhas de água' },
    { id: 'f1_4', name: 'Prancha no joelho', type: 'time', sets: 3, workTime: 20, restTime: 30 },
    { id: 'f1_5', name: 'Elevação de quadril deitada', type: 'reps', sets: 3, reps: 15, restTime: 30 },
  ]
};

const sandraF2: WorkoutData = {
  id: 'sandra_F2',
  title: 'Treino F2 - Força + Tonificação',
  duration: '35 min',
  description: 'Mais intenso, construção de tônus muscular (queima + força).',
  exercises: [
    { id: 'f2_1', name: 'Agachamento sumô', type: 'reps', sets: 4, reps: 15, restTime: 45, note: 'Pés mais abertos, joelhos pra fora' },
    { id: 'f2_2', name: 'Flexão joelhos no chão', type: 'reps', sets: 3, reps: 10, restTime: 40 },
    { id: 'f2_3', name: 'Avanço frontal', type: 'reps', sets: 3, reps: '10 cada', restTime: 40, note: 'Mãos na cintura' },
    { id: 'f2_4', name: 'Remada inclinada', type: 'reps', sets: 3, reps: 12, restTime: 40, note: 'Mochila leve. Apoio em cadeira' },
    { id: 'f2_5', name: 'Panturrilha em pé', type: 'reps', sets: 3, reps: 20, restTime: 30 },
    { id: 'f2_6', name: 'Abdominal bicicleta', type: 'reps', sets: 3, reps: 20, restTime: 30 },
  ]
};

const sandraDescanso: WorkoutData = {
  id: 'sandra_rest',
  title: 'Descanso Ativo',
  duration: '30 min',
  description: 'Caminhada 30 min ao ar livre + hidratação.',
  exercises: [],
  isRest: true
};

const sandraOpcional: WorkoutData = {
  id: 'sandra_opt',
  title: 'Cardio Opcional',
  duration: '20-30 min',
  description: 'Caminhada ou dança em casa (atividade prazerosa).',
  exercises: [],
  isRest: true
};

export const getWorkoutForDay = (profile: 'marcos' | 'sandra', week: number): WorkoutData | null => {
  const dayOfWeek = (new Date()).getDay(); // 0 = Sunday, 1 = Monday, etc.

  if (profile === 'marcos') {
    switch (dayOfWeek) {
      case 1: return marcosTreinoA; // Seg
      case 2: return marcosTreinoC; // Ter
      case 3: return marcosTreinoB; // Qua
      case 4: return marcosDescanso; // Qui
      case 5: return marcosTreinoC; // Sex (maior intensidade)
      case 6: return week % 2 !== 0 ? marcosTreinoA : marcosTreinoB; // Sab (ímpar = A, par = B)
      case 0: return null; // Dom descanso total
    }
  } else {
    switch (dayOfWeek) {
      case 1: return sandraF1;
      case 2: return sandraF2;
      case 3: return sandraDescanso;
      case 4: return sandraF1;
      case 5: return sandraF2; // Sex (intensidade maior)
      case 6: return sandraOpcional;
      case 0: return null;
    }
  }
  return null;
}
