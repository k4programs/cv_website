# 🗺️ Project Roadmap: MacCV

Ziele für die zukünftige Entwicklung des Portfolios.

## 🟢 Phase 1: Polishing & Consistency (Done)
- [x] **Serious Mode:** Vollständige Anpassung aller Modals (Terminal, Kontakt, Code) an das helle Design.
- [x] **Terminal:** Implementation echter Shell-Befehle (`ls`, `cat`, `cd`).
- [x] **UI Stability:** Behebung von Layout-Shifts ("Vibrieren") bei Hover-Effekten.
- [x] **Deployment:** Erfolgreicher Rollout auf Raspberry Pi.

## 🟡 Phase 2: Visuals & Static Content (Next)
*Fokus: Optische Aufwertung ohne komplexe Server-Logik.*
- [ ] **Custom Profile Image:** Upload-Möglichkeit oder Config-Option für ein echtes Foto statt des DiceBear-Avatars.
- [ ] **Project Gallery:** Erweiterung der Projekt-Karten um Screenshots/Thumbnails (im Hover-Preview).
- [ ] **Downloadable Assets:** Echte vCards (`.vcf`) und PDF-Lebenslauf zum Download im Kontakt-Bereich.
- [ ] **Static Blog:** Einbindung eines Markdown-basierten Blogs, den das Terminal lesen kann (`cat blog/article1.md`).

## 🟠 Phase 3: Infrastructure & Backend Core
*Fokus: Das technische Fundament für dynamische Daten.*
- [ ] **Dockerization:** Containerisierung der App (Frontend + Nginx), um Deployment-Probleme auf dem Pi zu eliminieren.
- [ ] **Real Backend (API):** Aufbau einer leichten Python (FastAPI) oder Node.js API für echte Datenverarbeitung.
- [ ] **Visitor Log (Guestbook):** Besucher können sich via Terminal verewigen (`echo "Hi" >> guestbook`). *Benötigt Backend.*
- [ ] **Database:** Anbindung einer SQLite oder MongoDB für das Gästebuch und Analytics.

## 🔴 Phase 4: Advanced Intelligence
*Fokus: High-End Features, die auf dem Backend aufbauen.*
- [ ] **AI Assistant:** Integration einer lokalen LLM (Ollama auf dem Pi) oder OpenAI API für den Chat im Terminal.
- [ ] **Analytics Dashboard:** Ein Admin-Bereich (geschützt), der Besucherströme und Geo-Daten visualisiert.
- [ ] **Game Mode:** Ein kleines, verstecktes Spiel (Snake oder Hacking-Puzzle) als Easter Egg.