# GEMINI.md - Project Context & Guidelines (v3.3)

## 1. Project Identity: "MacCV" (Singularity Edition)
High-performance, immersive portfolio styled like a futuristic hacker terminal / OS.
**Current Version:** v3.3

## 2. Tech Stack
-   **Frontend:** React 18+ (Vite), TypeScript.
-   **Styling:** Bootstrap 5, Custom CSS (`index.css`), Framer Motion.
-   **Deployment:** Raspberry Pi (Ubuntu/Debian), served via `pm2` on port 5173.

## 3. Key Modules
-   **Terminal v2.0:** Fully interactive shell simulation (`Terminal.tsx`). Supports `ls`, `cd`, `cat`, etc.
-   **Serious Mode:** Global CSS override class `.serious-mode` for high-contrast, professional readability.
-   **Skill Graph:** Canvas-based neural network visualization (`SkillGraph.tsx`). Adapts colors to theme.
-   **System Monitor:** Displays real CPU/Mem simulation and GitHub Stats (`SystemMonitor.tsx`).

## 4. Architecture & State
-   **`App.tsx`:** Main entry point. Manages global state (`isSeriousMode`, `showTerminal`, `modalData`).
-   **`index.css`:** Contains critical overrides for "Serious Mode" (white theme) and Hacker Mode (neon green).
-   **`githubService.ts`:** Fetches live data from GitHub API.

## 5. Recent Changes (v3.3)
-   **Deployment:** Git repo initialized on Raspberry Pi. Application deployed and running via PM2.
-   **UI Fixes:** Removed layout vibration on hover. Fixed fixed-height issues in TechCards.
-   **Serious Mode:** Complete overhaul. Now affects CodeVault, ContactModal, and Terminal for perfect readability.
-   **Content:** "Active Protocols" now lists languages as "Top Nodes". "About Me" uses a dynamic avatar in serious mode.

## 6. Update Workflow (Raspberry Pi)
To apply changes to the live site:
1.  **Local:** Commit & Push changes (`git push`).
2.  **Remote (Pi):**
    ```bash
    ssh teleportadmin@192.168.112.170
    cd ~/projects/mac-cv
    git pull
    cd web
    npm install (if dependencies changed)
    npm run build
    ./node_modules/.bin/pm2 restart mac-cv
    ```
