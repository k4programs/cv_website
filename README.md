# 🕵️‍♂️ MacCV // Singularity Edition v3.3

> "The portfolio that hacks you back... fully interactive."

Dies ist ein interaktives Portfolio im Stil eines futuristischen Betriebssystems. Die Version **v3.3** perfektioniert die User Experience durch einen vollständig überarbeiteten **Serious Mode** und ein immersives **Terminal v2.0**.

---

## 🚀 New Modules (v3.3)

### 1. 👔 Serious Mode v2
- **High Contrast:** Umschaltbar auf ein professionelles, weißes Design für maximale Lesbarkeit.
- **Dynamic Content:** Cyber-Elemente weichen einem seriösen Profilbild ("Max Mustermann" Avatar) und klaren Datenstrukturen.
- **Adaptive UI:** Alle Modals (Terminal, Code Vault, Kontakt) passen sich thematisch an.

### 2. 📟 Terminal v2.0
- **Real Shell Experience:** Simuliert ein echtes Filesystem.
- **Commands:** `ls`, `cd`, `pwd`, `cat`, `top`, `whoami`, `date`, `git status` und mehr funktionieren wie erwartet.
- **Easter Eggs:** Probier mal `sudo`, `matrix` oder `rm -rf`.

### 3. 🧠 Neural Skill Graph (Enhanced)
- **High Density:** Deutlich vernetztere Knoten für eine imposantere Darstellung der Skills.
- **Thematic Adaptation:** Wechselt im Serious Mode automatisch zu einem dezenten, professionellen Farbschema.

### 4. 🔓 The Code Vault
- **Source Code Inspector:** Ein Klick auf `SOURCE_CODE` öffnet einen Code-Editor im VS-Code-Stil.
- **Live Snippets:** Zeigt echten Code aus diesem Projekt mit Syntax-Highlighting.

### 5. 📡 Secure Uplink (Contact)
- **Encrypted Transmission:** Simuliert einen verschlüsselten Satelliten-Uplink.
- **Feedback:** Visuelles Feedback über den Verschlüsselungs- und Sendestatus.

---

## 🌍 Core Features
- **Live Intelligence:** Wetter & Standort des Besuchers werden live erkannt (via IP).
- **Hardware Scan:** Das System analysiert die Hardware des Besuchers (Cores, GPU, Battery).
- **Hybrid GitHub Stats:** Zeigt live die Top-Sprachen und Repositories des Nutzers an ("Top Nodes").

---

## 🛠️ Installation & Config

### Setup
```bash
cd web
npm install
npm run dev
```

### Konfiguration
Persönliche Daten und Tech-Stacks in `web/src/config.ts` anpassen.

### Deployment (Raspberry Pi / Linux)
Das Projekt ist für PM2 optimiert.

```bash
# Production Build
npm run build

# Start with PM2
pm2 start "npx serve dist -l 5173" --name "mac-cv"
```

---

## ⚠️ System Status
- **Version:** 3.3 (Singularity Refined)
- **Status:** ONLINE
- **Deployment:** Raspberry Pi (Port 5173)