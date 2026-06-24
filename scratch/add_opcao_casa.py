import re

with open(r'c:\Users\aurel\Documents\AppSaude\AppSaude\src\data\meals.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find: "almoco": { "horario": "12:00", "refeicao": "fora de casa, priorize proteína + salada, evite frituras e refrigerante", "kcal": null }
# And append the opcaoCasa property to it.

def replacer(match):
    original = match.group(0)
    # the replacement options
    opcao = """ "opcaoCasa": {
              "descricao": "Almoço caseiro nordestino",
              "alimentos": ["Arroz (2 col.)", "Feijão (1 concha)", "Carne bovina, frango ou peixe (120g)", "Ovo frito ou mexido", "Legume cozido (cenoura, chuchu, maxixe)"],
              "observacao": "Refeição balanceada equivalente para quando estiver em casa."
            }"""
    return original[:-1] + "," + opcao + " }"

# Regex to match the exact string for Marcos' almoco
pattern = r'"almoco":\s*{\s*"horario":\s*"12:00",\s*"refeicao":\s*"fora de casa, priorize proteína \+ salada, evite frituras e refrigerante",\s*"kcal":\s*null\s*}'

new_content = re.sub(pattern, replacer, content)

with open(r'c:\Users\aurel\Documents\AppSaude\AppSaude\src\data\meals.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Done!")
