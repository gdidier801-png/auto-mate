# Auto-mate — Portfolio de Gaspard Didier

Site portfolio one-page : automatisation n8n pour consultants et coachs indépendants.

## Tester en local

Ouvre simplement `index.html` dans ton navigateur (double-clic), ou lance un petit serveur :

```bash
cd auto-mate
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Mettre en ligne sur GitHub Pages

1. Crée un repo **public** nommé `auto-mate` sur github.com
2. Dans le dossier du site :
   ```bash
   git init
   git add .
   git commit -m "Site v1"
   git branch -M main
   git remote add origin https://github.com/TON_PSEUDO/auto-mate.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → Branch : main / (root) → Save**
4. Le site sera en ligne sous ~2 min à : `https://TON_PSEUDO.github.io/auto-mate/`

## Placeholders à remplacer

| Quoi | Où | Comment |
|------|-----|---------|
| **3 vidéos** | `assets/videos/` | Ajoute `facture-relance.mp4`, `rdv-confirmation.mp4`, `onboarding.mp4` (exports CapCut compressés, **< 50 Mo chacun** — 720p, bitrate modéré, sinon GitHub refuse les fichiers > 100 Mo) |
| **Photo** | `assets/images/photo.jpg` | Ta photo, idéalement carrée |
| **LinkedIn** | `index.html`, footer | Remplace `href="#"` par l'URL de ton profil |
| **Analytics** | `index.html`, en bas | Crée un compte gratuit sur [goatcounter.com](https://www.goatcounter.com), remplace `MONCOMPTE` par ton code |

Le lien Cal.com (`https://cal.com/gaspard-didier-aiuucr/appel-de-decouverte`) est déjà intégré partout.

## Structure

```
/
├── index.html          # toute la page (6 sections)
├── css/style.css       # styles (palette + typo des Guidelines)
├── js/main.js          # animations au scroll (Intersection Observer)
├── assets/images/      # favicon.svg + photo.jpg (à ajouter)
└── assets/videos/      # 3 vidéos .mp4 (à ajouter)
```
