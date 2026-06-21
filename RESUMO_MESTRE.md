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
- `{profile}_data_inicio`: Salva o timestamp (ISO) de quando o plano mensal de 30 dias iniciou.
- `{profile}_absolute_data_inicio`: Salva o timestamp real inicial para contagem total de semanas (independente de reinícios de 30 dias).
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
- **Build**: Compilação via Vite (`npm run build`) para gerar assets estáticos.
- **Deploy**: O projeto parece preparado para qualquer host estático (Vercel, Netlify, GitHub Pages).

## 11. PROBLEMAS RESOLVIDOS
- N/A (Protótipo inicial).

## 12. DÉBITOS TÉCNICOS
- **Cálculos via Relógio Local**: ⚠️ **ATENÇÃO:** O progresso do usuário é totalmente dependente do relógio do dispositivo (`new Date()`). Se o usuário alterar a data do celular, o "dia do plano" vai mudar instantaneamente.
- **Dados Mockados (Looping de Cardápio)**: O cardápio está programado para fazer um loop com base num array de apenas 14 dias de dados (`dataDayIndex = (absolutePlanDay - 1) % 14;`). 

## 13. BACKLOG E MELHORIAS SUGERIDAS
- Centralizar os tipos de TypeScript.
- Implementar PWA para funcionamento offline real e instalação no celular como app.

## 14. VARIÁVEIS DE AMBIENTE
- Nenhuma variável de ambiente necessária no momento. Apenas `.env.example` padrão.
