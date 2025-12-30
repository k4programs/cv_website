# 🕵️‍♂️ MacCV // Singularity Edition v3.2

> "The portfolio that hacks you back... fully interactive."

Dies ist ein interaktives Portfolio im Stil eines futuristischen Betriebssystems. Die Version **v3.2 (Singularity)** ist der bisher größte Sprung und führt tiefgreifende interaktive Module ein, die technische Kompetenz direkt im Browser beweisen.

---

## 🚀 New Modules (v3.2)

### 1. 🔓 The Code Vault
-   **Source Code Inspector:** Ein Klick auf `SOURCE_CODE` öffnet einen voll funktionsfähigen Code-Editor.
-   **Live Snippets:** Zeigt echten Code aus diesem Projekt (z.B. den `githubService` oder die `SystemDiagnostics`) mit Syntax-Highlighting an. Beweis durch Code.

### 2. 🧠 Neural Skill Graph
-   **Interactive Visualization:** Ein physik-basierter Canvas-Graph, in dem deine Skills (React, Python, AWS) als neuronale Knoten schweben.
-   **Physics Engine:** Knoten reagieren auf Mausbewegungen und simulieren ein lebendiges Netzwerk.

### 3. 📡 Secure Uplink (Contact)
-   **Encrypted Transmission:** Das Kontaktformular simuliert einen verschlüsselten Satelliten-Uplink mit Hacking-Animationen statt langweiliger `mailto`-Links.
-   **Feedback:** Visuelles Feedback über den Verschlüsselungs- und Sendestatus.

### 4. 📄 Classified Report (PDF)
-   **On-Demand Generation:** Der Button `DECRYPT_FULL_PROFILE.PDF` generiert client-seitig (via `jspdf`) einen stilisierten Lebenslauf im "Top Secret"-Look und lädt ihn herunter.

---

## 🌍 Core Features (v3.1)
-   **Live Intelligence:** Wetter & Standort des Besuchers werden live erkannt.
-   **Hardware Scan:** Das System analysiert die Hardware des Besuchers (Cores, GPU, Battery).
-   **Hybrid GitHub Stats:** Kombiniert öffentliche API-Daten mit privaten Konfigurationen für ein vollständiges Bild.

---

## 🛠️ Installation & Config

### Setup
```bash
cd web
npm install
npm run dev
```

### Konfiguration
Persönliche Daten, Private-Repo-Offsets und Tech-Stacks können in `web/src/config.ts` angepasst werden.

### Deployment
```bash
npm run build
pm2 start "npx serve dist -l 5173" --name "mac-cv"
```

---

## ⚠️ System Status
-   **Version:** 3.2 (Singularity)
-   **Status:** ONLINE
-   **Security:** MAXIMUM