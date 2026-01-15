# 🗺️ Project Roadmap: MacCV

Ziele für die zukünftige Entwicklung des Portfolios.

## 🟢 Phase 1: Polishing & Consistency (Done)
- [x] **Serious Mode:** Vollständige Anpassung aller Modals (Terminal, Kontakt, Code) an das helle Design.
- [x] **Terminal:** Implementation echter Shell-Befehle (`ls`, `cat`, `cd`).
- [x] **UI Stability:** Behebung von Layout-Shifts ("Vibrieren") bei Hover-Effekten.
- [x] **Deployment:** Erfolgreicher Rollout auf Raspberry Pi.

## 🟡 Phase 2: Content & Personalization (Next)
- [ ] **Custom Profile Image:** Upload-Möglichkeit oder Config-Option für ein echtes Foto statt des DiceBear-Avatars.
- [ ] **Project Gallery:** Erweiterung der Projekt-Karten um Screenshots/Thumbnails (im Hover-Preview).
- [ ] **Blog Module:** Einbindung eines Markdown-basierten Blogs, lesbar via Terminal (`cat blog/post1.md`) oder UI.
- [ ] **Downloadable Assets:** Echte vCards (`.vcf`) zum Download im Kontakt-Bereich.

## 🟠 Phase 3: Advanced Interactivity
- [ ] **AI Assistant:** Integration einer lokalen LLM (oder API), mit der Besucher im Terminal chatten können ("Talk to Max's AI").
- [ ] **Game Mode:** Ein kleines, verstecktes Spiel (Snake oder Pong) im Terminal oder als Modal.
- [ ] **Visitor Log:** Ein "Guestbook", in das sich Besucher via Terminal (`echo "Hello" >> guestbook.txt`) eintragen können (benötigt Backend).

## 🔴 Phase 4: Backend & Infrastructure
- [ ] **Real Backend:** Ablösung der statischen Daten durch ein Node.js/Python Backend für dynamische Inhalte.
- [ ] **Analytics Dashboard:** Ein Admin-Bereich, der anzeigt, wer die Seite besucht hat (IP-Log, Geo-Map).
- [ ] **Dockerization:** Containerisierung der gesamten App für einfacheres Deployment.
