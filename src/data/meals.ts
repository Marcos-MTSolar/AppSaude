export const substitutions = [
  { type: 'Proteína', text: 'Frango pode ser substituído por peixe, carne magra, ovos ou atum, sempre grelhado/cozido, nunca frito.' },
  { type: 'Carboidrato', text: 'Arroz integral por cuscuz, batata-doce, aipim cozido ou quinoa, porções iguais em volume.' },
  { type: 'Fruta', text: 'Qualquer fruta da estação, preferir as mais baratas da semana.' },
  { type: 'Iogurte Grego', text: 'Se ficar caro, usar iogurte natural desnatado sem açúcar.' },
  { type: 'Castanhas', text: 'Qualquer castanha serve, porção de 10 unidades ou 1 colher de sopa.' },
  { type: 'Atenção/Moderação', text: 'Castanha-do-pará: máx 1-3/dia. Ovos do Marcos: se triglicerídeos/colesterol altos, ajustar p/ 1-2/dia (consulte médico). Atum: máx 1-2x semana (prefira "em água/óleo"). Sardinha: sem restrições.' }
];

export const mealsData = [
  {
    "semana": 1,
    "dias": [
      {
        "dia": 1,
        "dia_semana": "Segunda-feira",
        "semana": 1,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com tomate + 2 col. sopa de cuscuz nordestino + café s/ açúcar", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 1 col. pasta de amendoim", "kcal": 180 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango grelhado (150g) + legumes refogados (abobrinha + cenoura)", "kcal": 320 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos + 1 col. sopa de cuscuz nordestino + café s/ açúcar", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pote de queijo cottage (100g) + 1 banana", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango grelhado (120g) + arroz integral (2 col.) + feijão (1 col.) + salada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "2 castanhas-do-pará + 8 castanhas de caju + 1 goiaba", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de legumes com frango desfiado (cenoura, batata-doce, chuchu)", "kcal": null }
        },
        "dica_preparo": "Grelhar frango suficiente para os dois (270g total). Cozinhar arroz integral e feijão para 2-3 dias."
      },
      {
        "dia": 2,
        "dia_semana": "Terça-feira",
        "semana": 1,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete (3 ovos + queijo branco) + 2 col. sopa de cuscuz nordestino + café s/ açúcar", "kcal": 390 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 10 castanhas-de-caju", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe tilápia grelhado (150g) + brócolis no vapor + batata-doce pequena", "kcal": 350 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete (2 ovos + tomate + cebola) + chá verde", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 fatia melancia + 5 amêndoas", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Tilápia grelhada (120g) + arroz integral (2 col.) + salada completa c/ azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 pote de coalhada (170g) + 1 col. mel (opcional)", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete de espinafre (3 ovos) + tomate em rodelas", "kcal": null }
        },
        "dica_preparo": "Grelhar tilápia para o almoço dela e jantar de Marcos juntos. Aproveitar e cozinhar brócolis no vapor."
      },
      {
        "dia": 3,
        "dia_semana": "Quarta-feira",
        "semana": 1,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos cozidos + 2 col. sopa de cuscuz nordestino + 1 fatia queijo branco + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 maçã + 1 col. pasta de amendoim", "kcal": 170 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Carne bovina magra (patinho 150g) grelhada + abobrinha refogada + salada", "kcal": 380 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos cozidos + 1 col. sopa de cuscuz nordestino + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pera + 5 nozes", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Patinho grelhado (120g) + abobrinha refogada + arroz integral + salada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 cenoura crua média + 2 col. pasta de grão-de-bico (homus)", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Caldo de feijão com legumes + 1 torrada integral", "kcal": null }
        },
        "dica_preparo": "Grelhar patinho para os dois (270g). Fazer homus em casa - rende a semana toda."
      },
      {
        "dia": 4,
        "dia_semana": "Quinta-feira",
        "semana": 1,
        "tipo": "descanso_treino",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 10 castanhas-de-caju", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango desfiado (150g) + brócolis + cenoura refogada", "kcal": 310 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "1 fatia pão integral + queijo branco + 1 ovo cozido + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 kiwi + 1 pote de queijo cottage (100g)", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango desfiado (120g) + arroz integral + feijão + salada verde", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fatia mamão formosa + 5 amêndoas", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Salmão assado (100g) + aspargos no vapor ou vagem refogada", "kcal": null }
        },
        "dica_preparo": "Aproveitar o frango sobrado dos dias anteriores. Assar salmão no forno (20min, azeite + limão)."
      },
      {
        "dia": 5,
        "dia_semana": "Sexta-feira",
        "semana": 1,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + tomate + 2 col. sopa de cuscuz nordestino + café", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "2 fatias de queijo branco + 1 fruta", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Atum em lata (120g, óleo de oliva) + batata-doce cozida + salada", "kcal": 340 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina: 200ml leite desnatado + 1 banana + 1 col. aveia (sem açúcar)", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 col. sopa de cuscuz nordestino com 1 fatia peito de peru + queijo", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Atum grelhado/lata (120g) + batata-doce assada + salada variada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 pote de queijo cottage (100g) + 1 col. granola sem açúcar", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango desfiado (100g) + sopa de abóbora cremosa (s/ creme de leite)", "kcal": null }
        },
        "dica_preparo": "Abóbora assada no forno para a sopa dela e para o jantar dos dois."
      },
      {
        "dia": 6,
        "dia_semana": "Sábado",
        "semana": 1,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) com ovo mexido e queijo branco + café", "kcal": 380 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 2 col. sopa de cuscuz nordestino com 1 col. pasta de amendoim", "kcal": 230 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango ao forno com ervas (150g) + purê de batata-doce + salada", "kcal": 400 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) com queijo branco + café s/ açúcar", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 fruta da estação + 5 nozes", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango ao forno (120g) + arroz integral + feijão + salada + azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 iogurte grego + 1 fruta", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete de legumes (2 ovos + brócolis + cenoura ralada) + salada", "kcal": null }
        },
        "dica_preparo": "Tapioca é fácil e rápida. Frango ao forno rende para os dois (270g). Excelente dia para meal prep."
      },
      {
        "dia": 7,
        "dia_semana": "Domingo",
        "semana": 1,
        "tipo": "refeicao_livre",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + queijo branco + café", "kcal": 430 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 fruta da estação + 10 castanhas-de-caju", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe grelhado (150g) + legumes assados + salada", "kcal": 340 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Panqueca de aveia (2 col.) com banana e mel (1 col.)", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 col. sopa de cuscuz nordestino + 1 fruta", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "REFEIÇÃO LIVRE CONTROLADA: 1 prato normal, sem repetir, sem sobremesa, priorize proteína + salada.", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fruta pequena", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Salada completa com atum (100g) + 1 ovo cozido + azeite e limão", "kcal": null }
        },
        "dica_preparo": "Domingo é dia de descanso - preparar proteínas da semana 2."
      }
    ],
    "lista_compras": {
      "semana": 1,
      "itens": [
        {"item": "Frango (peito)", "qtd": "2,5 kg", "onde": "Mercado / Feira", "custo": 35.0},
        {"item": "Tilápia (filé)", "qtd": "600 g", "onde": "Feira ou mercado", "custo": 20.0},
        {"item": "Atum em lata", "qtd": "4 latas", "onde": "Mercado", "custo": 24.0},
        {"item": "Carne bovina magra (patinho)", "qtd": "500 g", "onde": "Açougue / mercado", "custo": 18.0},
        {"item": "Ovos (dúzia)", "qtd": "2 dúzias", "onde": "Mercado / Feira", "custo": 18.0},
        {"item": "Iogurte grego natural", "qtd": "3 potes", "onde": "Mercado", "custo": 27.0},
        {"item": "Queijo cottage", "qtd": "2 potes", "onde": "Mercado", "custo": 16.0},
        {"item": "Coalhada", "qtd": "1 pote", "onde": "Mercado", "custo": 6.0},
        {"item": "Leite desnatado", "qtd": "2 litros", "onde": "Mercado", "custo": 12.0},
        {"item": "Queijo branco", "qtd": "500 g", "onde": "Mercado / Feira", "custo": 17.0},
        {"item": "Cuscuz nordestino", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Pão integral", "qtd": "2 pacotes", "onde": "Mercado", "custo": 14.0},
        {"item": "Arroz integral", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Feijão carioca", "qtd": "500 g", "onde": "Mercado", "custo": 5.0},
        {"item": "Batata-doce", "qtd": "2 kg", "onde": "Feira", "custo": 8.0},
        {"item": "Brócolis", "qtd": "500 g", "onde": "Feira / mercado", "custo": 6.0},
        {"item": "Abobrinha", "qtd": "4 unid.", "onde": "Feira", "custo": 5.0},
        {"item": "Cenoura", "qtd": "1 kg", "onde": "Feira", "custo": 4.0},
        {"item": "Tomate", "qtd": "1 kg", "onde": "Feira", "custo": 6.0},
        {"item": "Alface + rúcula (maço)", "qtd": "2 maços", "onde": "Feira", "custo": 4.0},
        {"item": "Banana (penca)", "qtd": "1 penca", "onde": "Feira", "custo": 6.0},
        {"item": "Frutas da estação variadas", "qtd": "1 kg", "onde": "Feira", "custo": 8.0},
        {"item": "Castanhas-de-caju", "qtd": "200 g", "onde": "Mercado", "custo": 10.0},
        {"item": "Pasta de amendoim", "qtd": "1 pote", "onde": "Mercado / online", "custo": 22.0},
        {"item": "Goma de tapioca", "qtd": "500 g", "onde": "Mercado / feira", "custo": 5.0},
        {"item": "Azeite extra virgem", "qtd": "250 ml", "onde": "Mercado", "custo": 15.0},
        {"item": "Café", "qtd": "200 g", "onde": "Mercado", "custo": 8.0},
        {"item": "Salmão", "qtd": "200 g", "onde": "Mercado / peixaria", "custo": 22.0}
      ],
      "total": 355.0
    }
  },
  {
    "semana": 2,
    "dias": [
      {
        "dia": 8,
        "dia_semana": "Segunda-feira",
        "semana": 2,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete de 3 ovos com espinafre + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "200ml leite desnatado com 1 col. aveia + 1 maçã", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango xadrez caseiro (150g frango, pimentão, cebola, shoyu light) + arroz integral (2 col.)", "kcal": 420 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos com espinafre + 1 col. sopa de cuscuz nordestino + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 maçã + 5 amêndoas", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango xadrez (120g) + arroz integral (2 col.) + salada verde", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 iogurte grego + 1 fruta", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Creme de abóbora c/ gengibre (s/ creme de leite) + 1 ovo cozido", "kcal": null }
        },
        "dica_preparo": "Preparar frango xadrez em maior quantidade (400g total). Grelhar no wok ou frigideira antiaderente."
      },
      {
        "dia": 9,
        "dia_semana": "Terça-feira",
        "semana": 2,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos cozidos + 2 col. sopa de cuscuz nordestino + queijo branco + café", "kcal": 420 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 1 col. pasta de amendoim", "kcal": 180 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sardinha em lata (azeite) + batata-doce cozida (130g) + salada", "kcal": 370 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina verde: 200ml leite desnatado + espinafre + 1 banana + aveia", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pera + 5 nozes", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Peixe assado (120g) + arroz integral + feijão + salada com cenoura ralada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 cenoura baby + 2 col. homus", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sardinha com tomate + abobrinha grelhada + 1 ovo", "kcal": null }
        },
        "dica_preparo": "Sardinha é o peixe mais barato e nutritivo - rica em ômega-3 e cálcio."
      },
      {
        "dia": 10,
        "dia_semana": "Quarta-feira",
        "semana": 2,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com tomate + 2 col. sopa de cuscuz nordestino + café", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "10 castanhas-de-caju + 1 laranja", "kcal": 180 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peito de frango grelhado (150g) + quinoa cozida (3 col.) + salada", "kcal": 410 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "1 col. sopa de cuscuz nordestino + requeijão light + 1 fatia peito de peru + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 kiwi + 1 pote de coalhada (170g)", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango grelhado (120g) + quinoa (2 col.) + feijão + salada completa", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fruta + 5 amêndoas", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de lentilha com legumes (cenoura, aipo, tomate)", "kcal": null }
        },
        "dica_preparo": "Cozinhar quinoa para os dois. Lentilha não precisa deixar de molho - cozinha em 20min."
      },
      {
        "dia": 11,
        "dia_semana": "Quinta-feira",
        "semana": 2,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) com ovo e queijo branco + café", "kcal": 380 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 2 col. sopa de cuscuz nordestino + 1 fruta", "kcal": 240 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Carne bovina magra (150g) refogada com cebola + couve refogada", "kcal": 370 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) com queijo + 1 ovo cozido + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 mamão pequeno + 5 castanhas-de-caju", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Carne bovina magra (120g) + arroz integral + feijão + couve refogada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 pote de coalhada (170g) + 1 col. mel", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango desfiado (100g) + brócolis grelhado + 1 ovo cozido", "kcal": null }
        },
        "dica_preparo": "Couve refogada com alho e azeite - preparo rápido. Usar carne que sobrou do dia 10."
      },
      {
        "dia": 12,
        "dia_semana": "Sexta-feira",
        "semana": 2,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com cogumelo + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 10 castanhas-de-caju", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe tilápia ao molho de tomate caseiro (150g) + brócolis", "kcal": 340 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos com cogumelo + 1 col. sopa de cuscuz nordestino + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pera + 2 fatias de queijo branco", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Tilápia ao molho de tomate (120g) + arroz integral + salada variada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 maçã + 5 nozes", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete de cogumelo e espinafre (3 ovos) + tomate cereja", "kcal": null }
        },
        "dica_preparo": "Molho de tomate caseiro: tomate + alho + cebola + orégano."
      },
      {
        "dia": 13,
        "dia_semana": "Sábado",
        "semana": 2,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + queijo branco + café", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 fruta", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango ao curry light (150g, leite de coco light + curry) + arroz integral", "kcal": 440 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Panqueca de aveia (2 ovos + 3 col. aveia + 1 banana amassada)", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 fruta da estação", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango ao curry (120g) + arroz integral + salada verde farta", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 iogurte grego + 10 castanhas-de-caju", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de frango com legumes (cenoura, batata-doce, chuchu, brócolis)", "kcal": null }
        },
        "dica_preparo": "Curry é uma variação simples e saborosa - evita a monotonia."
      },
      {
        "dia": 14,
        "dia_semana": "Domingo",
        "semana": 2,
        "tipo": "refeicao_livre",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete especial (3 ovos + peito de peru + queijo branco) + 2 col. sopa de cuscuz nordestino + café", "kcal": 430 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 1 col. pasta de amendoim", "kcal": 180 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe grelhado com limão e ervas (150g) + purê de abóbora + salada", "kcal": 350 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina: leite desnatado + morango + aveia + mel", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "200ml leite desnatado morno + 1 col. sopa de cuscuz nordestino com canela + 1 fruta", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "REFEIÇÃO LIVRE CONTROLADA: 1 prato equilibrado, priorizando proteína e vegetais", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fruta pequena", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Salada nicoise: atum + ovo cozido + vagem + alface + tomate + azeite", "kcal": null }
        },
        "dica_preparo": "Preparar proteínas da semana 3 no domingo."
      }
    ],
    "lista_compras": {
      "semana": 2,
      "itens": [
        {"item": "Frango (peito)", "qtd": "2,5 kg", "onde": "Mercado / Feira", "custo": 35.0},
        {"item": "Peixe variado", "qtd": "800 g", "onde": "Feira ou peixaria", "custo": 24.0},
        {"item": "Sardinha em lata", "qtd": "4 latas", "onde": "Mercado", "custo": 16.0},
        {"item": "Atum em lata", "qtd": "3 latas", "onde": "Mercado", "custo": 18.0},
        {"item": "Ovos (dúzia)", "qtd": "2 dúzias", "onde": "Mercado / Feira", "custo": 18.0},
        {"item": "Iogurte grego natural", "qtd": "4 potes", "onde": "Mercado", "custo": 36.0},
        {"item": "Coalhada", "qtd": "2 potes", "onde": "Mercado", "custo": 12.0},
        {"item": "Leite desnatado", "qtd": "2 litros", "onde": "Mercado", "custo": 12.0},
        {"item": "Queijo branco", "qtd": "400 g", "onde": "Mercado / Feira", "custo": 15.0},
        {"item": "Peito de peru fatiado", "qtd": "200 g", "onde": "Mercado", "custo": 9.0},
        {"item": "Cuscuz nordestino", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Pão integral", "qtd": "2 pacotes", "onde": "Mercado", "custo": 14.0},
        {"item": "Arroz integral", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Quinoa", "qtd": "500 g", "onde": "Mercado / online", "custo": 18.0},
        {"item": "Grão-de-bico (para homus)", "qtd": "400 g", "onde": "Mercado", "custo": 6.0},
        {"item": "Lentilha", "qtd": "500 g", "onde": "Mercado", "custo": 7.0},
        {"item": "Leite de coco light", "qtd": "2 caixas", "onde": "Mercado", "custo": 10.0},
        {"item": "Curry em pó", "qtd": "1 sachê", "onde": "Mercado", "custo": 5.0},
        {"item": "Cogumelo", "qtd": "250 g", "onde": "Mercado / feira", "custo": 8.0},
        {"item": "Espinafre (maço)", "qtd": "2 maços", "onde": "Feira", "custo": 4.0},
        {"item": "Abóbora cabotiá", "qtd": "1 kg", "onde": "Feira", "custo": 5.0},
        {"item": "Batata-doce", "qtd": "1,5 kg", "onde": "Feira", "custo": 6.0},
        {"item": "Brócolis + couve-flor", "qtd": "500 g", "onde": "Feira", "custo": 6.0},
        {"item": "Frutas variadas", "qtd": "2 kg", "onde": "Feira", "custo": 12.0},
        {"item": "Morango (bandeja)", "qtd": "1 bandeja", "onde": "Feira / mercado", "custo": 10.0},
        {"item": "Castanhas-de-caju + nozes", "qtd": "200 g", "onde": "Mercado", "custo": 10.0},
        {"item": "Aveia em flocos", "qtd": "500 g", "onde": "Mercado", "custo": 8.0}
      ],
      "total": 338.0
    }
  },
  {
    "semana": 3,
    "dias": [
      {
        "dia": 15,
        "dia_semana": "Segunda-feira",
        "semana": 3,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos cozidos + 2 col. sopa de cuscuz nordestino + requeijão light + café", "kcal": 420 },
          "lanche_manha": { "horario": "09:00", "refeicao": "2 fatias de queijo branco + 1 maçã", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango desfiado (150g) com molho de iogurte + batata-doce assada", "kcal": 390 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos cozidos + 1 col. sopa de cuscuz nordestino + requeijão light + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 laranja + 5 nozes", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango desfiado (120g) + batata-doce (100g) + salada farta + azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 iogurte grego + 1 col. granola s/ açúcar", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe assado (100g) + legumes no vapor + 1 ovo cozido", "kcal": null }
        },
        "dica_preparo": "Molho de iogurte: 3 col. iogurte natural + limão + sal + ervas, substitui maionese."
      },
      {
        "dia": 16,
        "dia_semana": "Terça-feira",
        "semana": 3,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "10 castanhas-de-caju + 1 banana", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Atum (120g) + batata-doce cozida + cenoura e vagem no vapor", "kcal": 360 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina: leite desnatado + banana + 2 col. aveia (sem açúcar)", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pera + 1 pote de queijo cottage (100g)", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Atum grelhado (120g) + arroz integral + feijão + salada verde com azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "2 col. homus + cenoura crua + pepino", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de feijão branco com espinafre e alho (low carb)", "kcal": null }
        },
        "dica_preparo": "Cozinhar feijão branco para a sopa dela - cozinhar mais e congelar."
      },
      {
        "dia": 17,
        "dia_semana": "Quarta-feira",
        "semana": 3,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete (3 ovos + tomate + cebola) + 2 col. sopa de cuscuz nordestino + café", "kcal": 370 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 fruta", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango cozido desfiado (150g) com legumes refogados + cuscuz nordestino", "kcal": 420 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "1 col. sopa de cuscuz nordestino + queijo branco + 1 ovo cozido + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 kiwi + 5 amêndoas", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango (120g) + cuscuz nordestino (2 col.) + feijão + salada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fruta + 5 nozes", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete de queijo branco e tomate (2 ovos) + abobrinha grelhada", "kcal": null }
        },
        "dica_preparo": "Cuscuz nordestino é típico de Pernambuco, baratíssimo e nutritivo."
      },
      {
        "dia": 18,
        "dia_semana": "Quinta-feira",
        "semana": 3,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com queijo + 2 col. sopa de cuscuz nordestino + café", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 1 col. pasta de amendoim", "kcal": 180 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sardinha grelhada (2 latas) + brócolis + batata-doce (100g)", "kcal": 380 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) com ovo + queijo + café s/ açúcar", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 mamão + 1 pote de coalhada (170g)", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Sardinha grelhada (100g) + arroz integral + couve refogada + salada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "10 castanhas-de-caju + 1 laranja", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Creme de cenoura (sem creme de leite) + 1 torrada integral", "kcal": null }
        },
        "dica_preparo": "Sardinha fresca é muito mais saborosa e barata."
      },
      {
        "dia": 19,
        "dia_semana": "Sexta-feira",
        "semana": 3,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos cozidos + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 10 castanhas-de-caju", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango ao forno com alho e ervas (150g) + purê de batata-doce + salada", "kcal": 410 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos + 1 col. sopa de cuscuz nordestino + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 maçã + 5 amêndoas", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango (120g) + batata-doce assada + feijão + salada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 pote de coalhada (170g) + 1 fruta", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de frango com legumes (cenoura, batata-doce, chuchu)", "kcal": null }
        },
        "dica_preparo": "Assar frango em quantidade para o dia 20 também."
      },
      {
        "dia": 20,
        "dia_semana": "Sábado",
        "semana": 3,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) recheada com ovo e queijo + café", "kcal": 380 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 fruta + 2 col. sopa de cuscuz nordestino + 1 col. pasta de amendoim", "kcal": 230 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe na telha caseiro (tilápia com tomate, cebola, limão, 150g)", "kcal": 360 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Panqueca de aveia com ovo e banana - sem açúcar", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "2 fatias de queijo branco + 1 fruta", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Peixe na telha (120g) + arroz integral + salada completa", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fatia mamão + 5 nozes", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete de legumes (cenoura ralada, chuchu, brócolis, 3 ovos)", "kcal": null }
        },
        "dica_preparo": "Peixe na telha: tilápia coberta com tomate, cebola, pimentão e limão. Assar 25min."
      },
      {
        "dia": 21,
        "dia_semana": "Domingo",
        "semana": 3,
        "tipo": "refeicao_livre",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + queijo + café", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 banana", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango grelhado (150g) + legumes variados assados + salada", "kcal": 350 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina: leite desnatado + morango + banana + aveia", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 col. sopa de cuscuz nordestino com 5 amêndoas", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "REFEIÇÃO LIVRE CONTROLADA: 1 prato, priorizando proteína + salada, evitar frituras", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fruta", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete (2 ovos) + salada verde com tomate cereja + azeite e limão", "kcal": null }
        },
        "dica_preparo": "Domingo: preparar proteínas da semana 4."
      }
    ],
    "lista_compras": {
      "semana": 3,
      "itens": [
        {"item": "Frango (peito + sobrecoxa s/pele)", "qtd": "2,5 kg", "onde": "Mercado / Feira", "custo": 32.0},
        {"item": "Sardinha fresca ou lata", "qtd": "600 g", "onde": "Peixaria / mercado", "custo": 18.0},
        {"item": "Carne bovina magra (patinho)", "qtd": "500 g", "onde": "Açougue", "custo": 18.0},
        {"item": "Atum em lata", "qtd": "3 latas", "onde": "Mercado", "custo": 18.0},
        {"item": "Peixe variado", "qtd": "400 g", "onde": "Feira", "custo": 14.0},
        {"item": "Ovos", "qtd": "2 dúzias", "onde": "Mercado / Feira", "custo": 18.0},
        {"item": "Iogurte grego natural", "qtd": "4 potes", "onde": "Mercado", "custo": 36.0},
        {"item": "Coalhada", "qtd": "2 potes", "onde": "Mercado", "custo": 12.0},
        {"item": "Queijo cottage", "qtd": "1 pote", "onde": "Mercado", "custo": 8.0},
        {"item": "Leite desnatado", "qtd": "2 litros", "onde": "Mercado", "custo": 12.0},
        {"item": "Queijo branco", "qtd": "400 g", "onde": "Mercado", "custo": 15.0},
        {"item": "Cuscuz nordestino", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Pão integral", "qtd": "2 pacotes", "onde": "Mercado", "custo": 14.0},
        {"item": "Feijão branco", "qtd": "500 g", "onde": "Mercado", "custo": 7.0},
        {"item": "Batata-doce", "qtd": "2 kg", "onde": "Feira", "custo": 8.0},
        {"item": "Abóbora", "qtd": "1 kg", "onde": "Feira", "custo": 5.0},
        {"item": "Brócolis", "qtd": "500 g", "onde": "Feira", "custo": 6.0},
        {"item": "Cenoura + chuchu", "qtd": "1 kg cada", "onde": "Feira", "custo": 7.0},
        {"item": "Vagem ou aspargo", "qtd": "300 g", "onde": "Feira / mercado", "custo": 6.0},
        {"item": "Espinafre (maço)", "qtd": "2 maços", "onde": "Feira", "custo": 4.0},
        {"item": "Tomate + cebola + alho", "qtd": "1 kg mix", "onde": "Feira", "custo": 6.0},
        {"item": "Frutas variadas", "qtd": "2 kg", "onde": "Feira", "custo": 12.0},
        {"item": "Castanhas-de-caju", "qtd": "200 g", "onde": "Mercado", "custo": 10.0},
        {"item": "Gengibre (pedaço)", "qtd": "50 g", "onde": "Feira", "custo": 2.0},
        {"item": "Shoyu light", "qtd": "1 garrafa", "onde": "Mercado", "custo": 7.0},
        {"item": "Pasta de amendoim", "qtd": "1 pote", "onde": "Mercado", "custo": 22.0}
      ],
      "total": 324.0
    }
  },
  {
    "semana": 4,
    "dias": [
      {
        "dia": 22,
        "dia_semana": "Segunda-feira",
        "semana": 4,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com espinafre e tomate + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pote de queijo cottage (100g) + 1 maçã", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango desfiado (150g) + cuscuz nordestino + legumes refogados", "kcal": 420 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos com espinafre + 1 col. sopa de cuscuz nordestino + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 laranja + 5 nozes", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango desfiado (120g) + cuscuz (2 col.) + feijão + salada verde", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 pote de queijo cottage (100g) + 1 col. granola s/ açúcar", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Caldo de frango com legumes + 1 torrada integral", "kcal": null }
        },
        "dica_preparo": "Usar frango preparado no domingo. Cuscuz nordestino em 10 minutos."
      },
      {
        "dia": 23,
        "dia_semana": "Terça-feira",
        "semana": 4,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete (3 ovos + peito de peru + queijo) + 2 col. sopa de cuscuz nordestino + café", "kcal": 420 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 10 castanhas-de-caju", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe grelhado (150g) + quinoa (2 col.) + abobrinha e cenoura", "kcal": 400 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina: leite desnatado + banana + aveia + 1 col. pasta de amendoim", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 kiwi + 1 iogurte grego", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Peixe grelhado (120g) + quinoa (2 col.) + salada variada + azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "2 col. homus + cenoura crua + pepino", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de lentilha com tomate e coentro (típica nordestina)", "kcal": null }
        },
        "dica_preparo": "Sopa de lentilha nordestina pronta em 25 min."
      },
      {
        "dia": 24,
        "dia_semana": "Quarta-feira",
        "semana": 4,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos cozidos + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 fruta", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango ao molho shoyu light (150g) + brócolis + arroz integral (2 col.)", "kcal": 430 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "1 col. sopa de cuscuz nordestino com queijo branco + 1 ovo cozido + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 maçã + 5 amêndoas", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango (120g) + arroz integral + feijão + salada completa + azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 pote de coalhada (170g) + 1 fruta", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete de espinafre e queijo branco (2 ovos) + tomate cereja", "kcal": null }
        },
        "dica_preparo": "Molho shoyu light: marinar frango por 30min."
      },
      {
        "dia": 25,
        "dia_semana": "Quinta-feira",
        "semana": 4,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 1 col. pasta de amendoim", "kcal": 180 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Carne bovina magra (150g) com brócolis + batata-doce", "kcal": 400 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos + 1 fatia pão integral + queijo branco + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pera + 2 fatias de queijo branco", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Carne bovina magra (100g) + arroz integral + feijão + couve + salada", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fatia mamão + 5 castanhas-de-caju", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de batata-doce com frango desfiado e coentro", "kcal": null }
        },
        "dica_preparo": "Sopa de batata-doce cremosa e nutritiva."
      },
      {
        "dia": 26,
        "dia_semana": "Sexta-feira",
        "semana": 4,
        "tipo": "normal",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Omelete (3 ovos + cogumelo + espinafre) + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 fruta", "kcal": 190 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Tilápia ao forno com ervas (150g) + legumes assados + salada", "kcal": 360 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina: leite desnatado + morango + aveia", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 col. sopa de cuscuz nordestino com 1 laranja", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Tilápia (120g) + arroz integral + feijão + salada variada + azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 iogurte grego + 10 castanhas-de-caju", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango desfiado (100g) + brócolis grelhado + 1 ovo cozido", "kcal": null }
        },
        "dica_preparo": "Legumes assados: 30min a 180°C."
      },
      {
        "dia": 27,
        "dia_semana": "Sábado",
        "semana": 4,
        "tipo": "normal_revisao",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Tapioca (1 unid.) com ovo + queijo + café", "kcal": 380 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 fruta + 2 col. sopa de cuscuz nordestino + 10 castanhas-de-caju", "kcal": 240 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango grelhado (150g) + cuscuz nordestino + legumes", "kcal": 420 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Panqueca de aveia (2 col. aveia + 2 ovos + banana) s/ açúcar", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "2 fatias de queijo branco + 1 fruta", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango (120g) + cuscuz + feijão + salada verde farta", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "2 col. homus + palitos de legumes (cenoura, pepino, aipo)", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Sopa de legumes variados com ovo poché", "kcal": null }
        },
        "dica_preparo": "Sábado de revisão: avaliar o que funcionou no mês. Pesar-se e comparar com o dia 1."
      },
      {
        "dia": 28,
        "dia_semana": "Domingo",
        "semana": 4,
        "tipo": "refeicao_livre",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com tomate + 2 col. sopa de cuscuz nordestino + queijo + café", "kcal": 410 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 banana", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe grelhado (150g) + purê de abóbora + salada", "kcal": 360 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina de morango com leite desnatado e aveia", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 col. sopa de cuscuz nordestino com 1 fruta", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "REFEIÇÃO LIVRE CONTROLADA: prato equilibrado, priorizando proteína e vegetais", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 fruta pequena", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Salada completa: frango frio (100g) + ovo + legumes + azeite e limão", "kcal": null }
        },
        "dica_preparo": "Domingo final do mês: avaliar resultados, pesar, medir circunferências. Celebrar o progresso!"
      },
      {
        "dia": 29,
        "dia_semana": "Segunda-feira",
        "semana": 4,
        "tipo": "bonus",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 banana + 10 castanhas-de-caju", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango grelhado (150g) + brócolis + arroz integral (2 col.)", "kcal": 410 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "2 ovos mexidos + 1 fatia pão + café", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 pote de queijo cottage (100g) + 1 fruta", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Frango (120g) + arroz integral + feijão + salada + azeite", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 maçã + 5 nozes", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Omelete (2 ovos) + legumes refogados", "kcal": null }
        },
        "dica_preparo": "Preparar proteínas para os últimos dias. Manter ritmo."
      },
      {
        "dia": 30,
        "dia_semana": "Terça-feira",
        "semana": 4,
        "tipo": "ultimo_dia",
        "marcos": {
          "cafe_manha": { "horario": "06:00", "refeicao": "3 ovos mexidos com espinafre + 2 col. sopa de cuscuz nordestino + café", "kcal": 400 },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 iogurte grego + 1 banana", "kcal": 200 },
          "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "fora, fruta ou castanhas se possível", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Peixe grelhado (150g) + legumes assados + salada verde", "kcal": 350 }
        },
        "sandra": {
          "cafe_manha": { "horario": "06:00", "refeicao": "Vitamina especial: leite desnatado + morango + aveia + mel", "kcal": null },
          "lanche_manha": { "horario": "09:00", "refeicao": "1 col. sopa de cuscuz nordestino com 5 castanhas-de-caju", "kcal": null },
          "almoco": { "horario": "12:00", "refeicao": "Peixe grelhado (120g) + arroz integral + feijão + salada farta", "kcal": null },
          "lanche_tarde": { "horario": "15:00", "refeicao": "1 iogurte grego + 1 col. granola s/ açúcar", "kcal": null },
          "jantar": { "horario": "18:30", "refeicao": "Frango grelhado (100g) + legumes variados + salada completa", "kcal": null }
        },
        "dica_preparo": "Dia 30: pesar, medir e fotografar. Comparar com o dia 1. Planejar o mês 2."
      }
    ],
    "lista_compras": {
      "semana": 4,
      "itens": [
        {"item": "Frango (peito)", "qtd": "2,5 kg", "onde": "Mercado / Feira", "custo": 35.0},
        {"item": "Peixe variado", "qtd": "800 g", "onde": "Peixaria", "custo": 24.0},
        {"item": "Carne bovina magra", "qtd": "400 g", "onde": "Açougue", "custo": 15.0},
        {"item": "Ovos", "qtd": "2 dúzias", "onde": "Mercado / Feira", "custo": 18.0},
        {"item": "Iogurte grego natural", "qtd": "5 potes", "onde": "Mercado", "custo": 45.0},
        {"item": "Queijo cottage", "qtd": "2 potes", "onde": "Mercado", "custo": 16.0},
        {"item": "Coalhada", "qtd": "1 pote", "onde": "Mercado", "custo": 6.0},
        {"item": "Leite desnatado", "qtd": "2 litros", "onde": "Mercado", "custo": 12.0},
        {"item": "Queijo branco", "qtd": "400 g", "onde": "Mercado", "custo": 15.0},
        {"item": "Cuscuz nordestino", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Peito de peru", "qtd": "150 g", "onde": "Mercado", "custo": 7.0},
        {"item": "Pão integral", "qtd": "2 pacotes", "onde": "Mercado", "custo": 14.0},
        {"item": "Arroz integral", "qtd": "1 kg", "onde": "Mercado", "custo": 7.0},
        {"item": "Quinoa", "qtd": "250 g", "onde": "Mercado", "custo": 10.0},
        {"item": "Lentilha", "qtd": "200 g", "onde": "Mercado", "custo": 5.0},
        {"item": "Batata-doce", "qtd": "1,5 kg", "onde": "Feira", "custo": 6.0},
        {"item": "Brócolis + couve", "qtd": "500 g", "onde": "Feira", "custo": 6.0},
        {"item": "Abobrinha + cenoura", "qtd": "1 kg", "onde": "Feira", "custo": 5.0},
        {"item": "Abóbora + chuchu", "qtd": "1 kg", "onde": "Feira", "custo": 5.0},
        {"item": "Cogumelo", "qtd": "200 g", "onde": "Feira", "custo": 7.0},
        {"item": "Espinafre", "qtd": "2 maços", "onde": "Feira", "custo": 4.0},
        {"item": "Frutas variadas", "qtd": "2 kg", "onde": "Feira", "custo": 12.0},
        {"item": "Morango", "qtd": "1 bandeja", "onde": "Mercado / feira", "custo": 10.0},
        {"item": "Castanhas-de-caju + nozes", "qtd": "200 g", "onde": "Mercado", "custo": 10.0},
        {"item": "Aveia em flocos", "qtd": "500 g", "onde": "Mercado", "custo": 8.0},
        {"item": "Granola sem açúcar", "qtd": "400 g", "onde": "Mercado", "custo": 14.0}
      ],
      "total": 323.0
    }
  }
];
