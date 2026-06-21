export const profilesData = {
  marcos: {
    name: 'Marcos',
    fullName: 'Marcos Aurélio',
    age: 50,
    profession: 'Engenheiro Elétrico',
    height: 1.75,
    weightCurrent: 90.0,
    weightGoal: 76.0,
    weightLossGoal: 14.0,
    bmiCurrent: 29.4,
    bmiStatus: 'Risco/Sobrepeso',
    bmiGoal: '< 25.0',
    timeframe: '14 a 20 semanas',
    mainGoal: 'Aprovação no Concurso RM2 da Marinha',
    criticalNote: 'A Inspeção de Saúde (4ª etapa) do concurso inclui aferimento de IMC. Obesidade (IMC ≥ 30) é critério de inaptidão. Com IMC atual de 29,4, Marcos está a apenas 0,6 pontos do limite — pequenas variações no dia da inspeção podem eliminá-lo. Cada kg perdido também melhora o desempenho na natação e na corrida do TAF.',
    trainingSchedule: '05h00-05h30, em casa, sem equipamento, 5 dias por semana',
    dietGoal: '2.000 kcal/dia, 150g de proteína/dia',
    mealsInfo: 'Café da manhã, jantar e ceia em casa. Almoço fora de casa.',
    specificRules: [
      'A natação é prioritária para o TAF: matricular-se em academia com piscina assim que estiver no processo.',
      'O IMC na inspeção médica é critério eliminatório: chegar acima de 30 é ser eliminado antes mesmo de provar o esforço.',
      'Dormir às 21h30: acordar às 5h exige dormir cedo.',
      'Usar o domingo como dia de preparação (deixar refeições da semana pré-separadas).'
    ]
  },
  sandra: {
    name: 'Sandra',
    fullName: 'Sandra Nascimento',
    age: 50,
    profession: '',
    height: 1.64,
    weightCurrent: 77.8,
    weightGoal: 65.0,
    weightLossGoal: 12.8,
    bmiCurrent: 28.9,
    bmiStatus: 'Sobrepeso',
    bmiGoal: '< 25.0',
    timeframe: '16 a 24 semanas',
    mainGoal: 'Emagrecimento e saúde',
    criticalNote: 'A partir da perimenopausa, a queda no estrogênio reduz a taxa metabólica basal e favorece o acúmulo de gordura abdominal. O treino de força torna-se ainda mais importante nessa fase — preserva massa muscular e ossos, além de acelerar o metabolismo. A perda de peso deve ser gradual: 0,5 kg por semana é o ritmo ideal para esse perfil, evitando perda de massa magra.',
    trainingSchedule: 'Flexível, em casa, sem equipamento, 4 dias por semana',
    dietGoal: '1.600 kcal/dia, 100-110g de proteína/dia',
    mealsInfo: 'Todas as refeições em casa. 1 refeição livre por semana (domingo no almoço).',
    specificRules: [
      'Cálcio diário: iogurte, queijo, leite desnatado e sardinha são aliados para a saúde óssea após os 50 anos.',
      'Exposição solar: 15 a 20 minutos de sol pela manhã (antes das 10h) para vitamina D.',
      'O treino de força é obrigatório nessa fase: a perda de massa muscular com a idade (sarcopenia) é silenciosa e perigosa.',
      'Não pular o lanche da tarde: pular refeições leva a comer mais no jantar.'
    ]
  }
};

export const generalRules = [
  'Água: mínimo 2,5 a 3 litros por dia',
  'Sono: 7 a 8 horas mínimas por noite',
  'Consistência acima de perfeição: um dia ruim não desfaz uma semana boa',
  'Pesar-se sempre no mesmo dia, horário e condição (manhã, em jejum, após ir ao banheiro)',
  'Fotografar-se de frente, lado e costas a cada 4 semanas',
  'Não comparar resultados entre si: homens perdem peso mais rápido que mulheres por diferença hormonal e de massa muscular'
];

export const phases = [
  {
    level: 1,
    title: 'Fase 1 - Adaptação',
    weeks: 'Semanas 1-4',
    maxWeek: 4,
    description: 'Construir o hábito, não falhar um dia, reps mais baixas com foco na execução correta.',
    milestoneMarcos: '-2 a -3 kg',
    milestoneSandra: '-1 a -2 kg'
  },
  {
    level: 2,
    title: 'Fase 2 - Progressão',
    weeks: 'Semanas 5-8',
    maxWeek: 8,
    description: 'Aumentar reps e séries. Marcos inicia caminhada/corrida nos fins de semana.',
    milestoneMarcos: '-5 a -6 kg',
    milestoneSandra: '-3 a -4 kg'
  },
  {
    level: 3,
    title: 'Fase 3 - Especialização',
    weeks: 'Semanas 9-16',
    maxWeek: 16,
    description: 'Marcos adiciona natação 2-3x/semana para o TAF. Sandra aumenta carga progressivamente.',
    milestoneMarcos: '-10 a -12 kg',
    milestoneSandra: '-7 a -9 kg'
  },
  {
    level: 4,
    title: 'Fase 4 - Simulado TAF',
    weeks: 'Semana 17+',
    maxWeek: 999,
    description: 'Marcos simula o TAF (25m piscina + 2.400m corrida) e verifica o IMC.',
    milestoneMarcos: 'Meta final 76 kg',
    milestoneSandra: 'Continuando rumo aos 65 kg'
  }
];
