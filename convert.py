import json
import re
# Lire le fichier texte
chemin_fichier = 'ciluuu.github.io/mots5.txt'
with open(chemin_fichier, 'r', encoding='utf-8') as f:
    texte = f.read()

# Extraire tous les mots (séparés par virgules et/ou sauts de ligne)
mots = re.split(r'[,\n]+', texte)

# Nettoyer : enlever espaces, minuscules, garder seulement 5 lettres
mots_propres = [
    mot.strip().upper()  # upper() au lieu de lower()
    for mot in mots 
    if mot.strip() and len(mot.strip()) == 5
]

# Enlever les doublons et trier
mots_propres = sorted(list(set(mots_propres)))

# Sauvegarder en JSON
with open('mots5.json', 'w', encoding='utf-8') as f:
    json.dump(mots_propres, f, ensure_ascii=False)

print(f"✅ {len(mots_propres)} mots convertis en mots5.json")