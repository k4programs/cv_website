# 🕵️‍♂️ MacCV // Live Intelligence Edition v3.1

> "The portfolio that hacks you back... now with real-time intelligence."

Dies ist ein interaktives Portfolio im Stil eines futuristischen Betriebssystems. In der Version **v3.1** verschmilzt es Fiktion mit Realität, indem es Live-Daten aus der Umgebung des Besuchers und echte GitHub-Statistiken verarbeitet.

---

## 🚀 New Features (v3.1)

### 1. 🌍 Environment Awareness
-   **Live Location & Weather:** Das System erkennt automatisch den Standort des Besuchers und zeigt das lokale Wetter an (via `Open-Meteo` & `IP-API`).
-   **Dynamic Header:** Der Begrüßungstext passt sich den Umgebungsdaten an (z.B. "SCANNING ATMOSPHERE... 12°C").

### 2. 🧬 Hardware Fingerprinting
-   **Real System Diagnostics:** Ein Klick auf "System Status" startet einen echten Scan des Besucher-Geräts.
-   **Metrics:** Zeigt Betriebssystem, Browser-Engine, logische CPU-Threads (Hyperthreading-aware), Akkuladestand und Bildschirmauflösung an.

### 3. 🐙 Hybrid GitHub Intelligence
-   **Smart Stats:** Kombiniert Daten aus der öffentlichen GitHub-API (Live-Sterne, Follower) mit konfigurierten Werten für private Repositories.
-   **Active Stack:** Der "System Monitor" zeigt dynamisch die meistgenutzten Programmiersprachen und den Zeitpunkt des letzten Code-Pushes an.

---

## 🛠️ Installation & Config

### Setup
```bash
cd web
npm install
npm run dev
```

### Konfiguration
Persönliche Daten und GitHub-Offsets können in `web/src/config.ts` angepasst werden:
```typescript
export const SYSTEM_CONFIG = {
  github: {
    username: "your-username",
    privateRepoOffset: 15, // Add your private repos here
    manualStack: [["TypeScript", 10], ["Rust", 5]]
  }
};
```

### Deployment (Produktion) 🛡️
```bash
# 1. Build erstellen
npm run build

# 2. Prozess starten
pm2 start "npx serve dist -l 5173" --name "mac-cv"
```

---

## 📚 Tech Stack
-   **Core:** React 18, TypeScript, Vite
-   **UI:** Bootstrap 5, Framer Motion
-   **3D:** React-Three-Fiber
-   **Data:** REST APIs (GitHub, Open-Meteo)

---

## ⚠️ System Status
-   **Version:** 3.1 (Live Intelligence)
-   **Status:** ONLINE
-   **Security:** MAXIMUM
