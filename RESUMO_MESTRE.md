# Resumo Mestre - Vida Saudável (Marcos & Sandra)

## 1. VISÃO GERAL
- **Propósito do sistema**: App web pessoal para acompanhamento de plano alimentar e de treinos, focado na saúde e bem-estar do casal Marcos e Sandra.
- **Público-alvo**: Uso exclusivo do casal (Marcos e Sandra).
- **Estágio atual do projeto**: Protótipo funcional operando de forma 100% local no navegador.

## 2. STACK TECNOLÓGICA
- **Frontend**: React com TypeScript, estilizado com Tailwind CSS e empacotado via Vite. Ícones providos pela biblioteca Lucide React.
- **Backend**: Não possui. Aplicação 100% client-side.
- **Banco de dados e Storage**: Armazenamento de estado, progresso e dados realizado inteiramente no `localStorage` do navegador.
- **Integrações externas**: Não possui.
- **Mobile**: Design responsivo adaptado para mobile via web browser.

## 3. ESTRUTURA DE ARQUIVOS
- `/src/components/`: Contém as interfaces principais.
  - `Dashboard.tsx`: Layout mestre e lógica de roteamento das abas e controle de datas.
  - `ProfileSelector.tsx`: Tela inicial para selecionar quem está usando (Marcos ou Sandra).
  - `InicioTab.tsx`: Aba de dashboard/progresso principal.
  - `CardapioTab.tsx`: Aba que exibe as refeições do dia (1 a 14, rotativo) com checkboxes de conclusão.
  - `TreinoTab.tsx` e `WorkoutRunner.tsx`: Abas de exibição do treino do dia e execução com cronômetro guiado.
  - `AcompanhamentoTab.tsx` e `RelatoriosTab.tsx`: Controle de medidas e relatórios txt.
- `/src/data/`: Banco de dados estático.
  - `meals.ts`: Cardápios diários estruturados por semanas e dias.
  - `profiles.ts`: Metas, regras de ouro e dados específicos de Marcos e Sandra.
  - `workouts.ts`: Treinos estruturados com exercícios, tempos e repetições.
- `/src/hooks/`: Hooks customizados.
  - `useLocalStorage.ts`: Hook para sincronizar estado React com o `localStorage`.
- `/src/utils/`: Funções utilitárias.
  - `date.ts`: Lógica crucial de cálculo de dias do plano (`calculatePlanDay`) e formatação de datas.

## 4. MÓDULOS E FUNCIONALIDADES
- **Seleção de Perfil**: Alterna entre os dados e metas do Marcos e da Sandra.
- **Início**: Dashboard geral de progresso do mês, objetivos de peso e evolução das fases.
- **Cardápio**: Exibe as refeições baseadas no dia do plano (1 a 30, em ciclos de 14 dias de dados). Permite marcar refeições como feitas.
- **Treino**: Exibe o treino correspondente à semana atual do plano. Possui cronômetro guiado e marcação de conclusão.
- **Acompanhamento (Ficha)**: Inserção de dados corporais (peso, medidas, fotos) e visualização de evolução.
- **Relatórios**: Geração de relatórios semanais e mensais em arquivo `.txt` para download.

## 5. BANCO DE DADOS
Tudo salvo no `localStorage`, organizado por `profileId` (marcos ou sandra). Chaves principais:
- `{profile}_data_inicio_dieta`: Salva o timestamp (ISO) de quando a dieta iniciou.
- `{profile}_data_inicio_treino`: Salva o timestamp (ISO) de quando os treinos iniciaram.
- `{profile}_absolute_data_inicio_treino`: Salva o timestamp real inicial para contagem total de semanas de treino (independente de reinícios).
- `{profile}_meals_checked`: Dicionário mapeando quais refeições foram marcadas como concluídas em cada dia.
- `{profile}_workouts_done`: Dicionário mapeando os treinos concluídos.
- `{profile}_medidas`: Histórico de medidas salvas na aba de acompanhamento.

**Isolamento Multi-tenant**: Garantido pelo prefixo `marcos_` ou `sandra_` nas chaves do `localStorage`.

## 6. INTEGRAÇÕES EXTERNAS
- Não há integrações com APIs de terceiros.

## 7. AUTENTICAÇÃO E SEGURANÇA
- **Autenticação**: Não existe login com senha ou JWT, apenas uma seleção de perfil na tela inicial (`ProfileSelector.tsx`).
- **Segurança**: Como os dados são 100% locais no dispositivo, não há tráfego de dados sensíveis na rede.

## 8. REGRAS DE NEGÓCIO
- **Cálculo de Datas (CRÍTICO)**: O aplicativo **não usa datas fixas do calendário**. 
  - O "dia do plano" é dinamicamente calculado em `src/utils/date.ts` comparando o timestamp local da meia-noite do dia da variável `data_inicio` com a meia-noite do `new Date()` atual. 
  - Se a diferença for 0 dias, é o Dia 1. Se for 1 dia, é o Dia 2, e assim por diante até 30.
- **Ciclo Semanal de Treino**: A semana atual é calculada dividindo o dia absoluto do plano por 7: `Math.max(1, Math.ceil(absolutePlanDay / 7))`. O treino selecionado não usa `new Date().getDay()`, mas se orienta pela numeração do dia absoluto do plano nos metadados. *(Nota: a descrição da solicitação divergia dessa regra implementada no código em `TreinoTab.tsx`, onde a semana define a fase do treino, e o dia absoluto seleciona o ID do treino)*.
- **Refeição Livre**: A Sandra possui tratamento especial no cardápio de "refeicao_livre" (destaque no layout).

## 9. FLUXO DO WHATSAPP
- Não aplicável ao escopo deste projeto.

## 10. BUILD E DEPLOY
- **Build Web**: Compilação via Vite (`npm run build`) para gerar assets estáticos na pasta `dist/`.
- **Build Nativo Android (Capacitor)**: A versão móvel é mantida encapsulada via `@capacitor/android`. 
  - *Fluxo de atualização*: Ao alterar o código React, rode `npm run build` e depois `npx cap sync android` para copiar a pasta `dist` atualizada para o Android Studio (`android/app/src/main/assets/public`). O APK real é gerado diretamente no Android Studio.
- **Deploy**: O projeto está preparado nativamente e também pode ser exportado para Vercel, Netlify ou GitHub Pages para uso 100% web.

## 11. PROBLEMAS RESOLVIDOS E FUNCIONALIDADES
- **Separação de Datas de Início (Dieta x Treino)**: Antes o app usava uma data unificada `_data_inicio` para dieta e treino. Foi alterado para usar `_data_inicio_dieta` e `_data_inicio_treino` independentes. Telas de Cardápio e Treino agora possuem seus próprios botões "Comecei hoje" caso a respectiva atividade não tenha sido iniciada. Migração automática de dados antigos foi implementada no `Dashboard.tsx`. (Atualizado em: 21/06/2026 13:00 - Arquivos: Dashboard.tsx, InicioTab.tsx, CardapioTab.tsx, TreinoTab.tsx, ProfileSelector.tsx, RelatoriosTab.tsx)
- **Atualização do Cardápio de 30 Dias e Remoção da Ceia**: O banco de dados de cardápio (`meals.ts`) foi inteiramente reescrito com a nova dieta revisada (inclusão de cuscuz nordestino, coalhada, queijo cottage). A refeição "Ceia" foi removida da interface do app e do array de ciclo. Os relatórios financeiros foram atualizados para refletir a redução no custo total do mês para R$ 1.340,00 e adicionados avisos de saúde e novas dicas de economia no tooltip de ajuda da dieta. (Atualizado em: 21/06/2026 - Arquivos: meals.ts, CardapioTab.tsx, RelatoriosTab.tsx)
- **Rastreador de Água e Lembretes (Notification API)**: Implementado um novo módulo de acompanhamento de água na `InicioTab` com botão "+ Bebi um copo" e barra de progresso diário configurável via engrenagem. Um novo hook `useWaterReminders.tsx` gerencia a permissão e o disparo de lembretes a cada 2 horas nativamente no dispositivo ou através de um banner visual no `Dashboard.tsx` caso a notificação nativa não seja suportada. Os relatórios semanais e mensais foram atualizados para expor a média em "ml" consumida nos últimos 7 e 30 dias. (Atualizado em: 21/06/2026 - Arquivos: WaterTracker.tsx, useWaterReminders.ts, InicioTab.tsx, Dashboard.tsx, RelatoriosTab.tsx)
- **Otimização de Layout Responsivo (Mobile-First)**: Revisão completa das 5 abas e navegação para telas de celular. O app se tornou mais enxuto visualmente no mobile reduzindo margens (`p-6` para `p-4`) e fontes de títulos. Uma estrutura de "Accordion" (sanfona) foi implementada no Cardápio e no Treino, permitindo que a lista densa de refeições e de exercícios inicie encolhida e expanda os detalhes (como quantidade, calorias e dicas) apenas ao tocar, mantendo ergonomia de botões. (Atualizado em: 21/06/2026 - Arquivos: Dashboard.tsx, InicioTab.tsx, CardapioTab.tsx, TreinoTab.tsx, AcompanhamentoTab.tsx, RelatoriosTab.tsx)
- **Sistema de Temas Dinâmicos por Perfil**: Implementada paleta de cores centralizada no utils/theme.ts, com troca automática de CSS Tailwind classes em todo o sistema. Perfil Marcos usa tema Dark/Cyan e Perfil Sandra usa tema Light/Pink. Os cards, botões, ícones, textos e fundos foram totalmente refatorados para utilizar propriedades flexíveis (`t.primary`, `t.surface`, etc) substituindo cores hardcoded. (Atualizado em: 21/06/2026 - Arquivos: theme.ts, App.tsx, Dashboard.tsx e todas as abas).
- **Aba Treino com Padrão "Amanhã"**: Alterada a lógica padrão da aba Treino para abrir exibindo o treino do "dia seguinte", visando facilitar o planejamento noturno do casal. Foi implementado um seletor visual na aba permitindo alternar livremente entre "Hoje" e "Amanhã", com a persistência de dados inteligente: concluir o treino de Amanhã o salva no `localStorage` com a flag `d+1` em vez do dia corrente. (Atualizado em: 21/06/2026 - Arquivos: TreinoTab.tsx, workouts.ts)
## 12. DÉBITOS TÉCNICOS
- **Cálculos via Relógio Local**: ⚠️ **ATENÇÃO:** O progresso do usuário é totalmente dependente do relógio do dispositivo (`new Date()`). Se o usuário alterar a data do celular, o "dia do plano" vai mudar instantaneamente.
- **Dados Mockados (Looping de Cardápio)**: O cardápio está programado para fazer um loop com base num array de apenas 14 dias de dados (`dataDayIndex = (absolutePlanDay - 1) % 14;`). 

## 13. BACKLOG E MELHORIAS SUGERIDAS
- Centralizar os tipos de TypeScript.
- Implementar PWA para funcionamento offline real e instalação no celular como app.

## 14. VARIÁVEIS DE AMBIENTE
- Nenhuma variável de ambiente necessária no momento. Apenas `.env.example` padrão.
