# GEMINI.md - Project Context & Guidelines (v3.1)

## 1. Project Identity: "MacCV" (Live Intelligence Edition)
This project is a high-performance, immersive portfolio website styled like a futuristic hacker terminal / OS. It has been upgraded to **v3.1**, introducing real-time environmental awareness, hardware fingerprinting, and a hybrid data layer for GitHub statistics.

## 2. Tech Stack (v3.1)
-   **Framework:** React 18+
-   **Language:** TypeScript (Strict Mode)
-   **Build Tool:** Vite
-   **Styling:** Bootstrap 5, Custom CSS, Framer Motion
-   **3D Rendering:** `react-three-fiber` / `three.js`
-   **Live Data:** Open-Meteo (Weather), IP-API (Location), GitHub REST API
-   **State Management:** React Hooks + LocalStorage Persistence

## 3. Architecture & File Structure (`/web`)
The project follows a modular, type-safe architecture with a new configuration layer:

-   **`src/config.ts`**: **NEW** - Central configuration for private data offsets (GitHub) and manual stack definitions.
-   **`src/services/`**:
    -   `githubService.ts`: **UPDATED** - Fetches live stats, top languages, and last push date. Merges with `config.ts`.
    -   `environmentService.ts`: **NEW** - Fetches user location and local weather conditions.
-   **`src/components/`**:
    -   `RealSystemDiagnostics.tsx`: **NEW** - Analyzes visitor's hardware (Cores, Threads, Battery, UserAgent).
    -   `SystemMonitor.tsx`: **UPDATED** - Displays live GitHub "Top Languages" instead of fake processes.
    -   `TechCard.tsx`: **UPDATED** - Supports custom styling/sizing (used for resizing "About Me").
-   **`src/data/database.tsx`**: Static content (Project descriptions). System Status description is now dynamic.

## 4. Key Features (v3.1)
-   **Hybrid GitHub Stats:** Combines live public API data with configured private repository counts/languages to show a complete portfolio picture without exposing private keys.
-   **Real-Time Environment:** Detects visitor's location and local weather to display dynamic system messages (e.g., "ATMOSPHERE: 22°C // CLEAR SKY").
-   **Hardware Fingerprinting:** The "System Status" modal scans the visitor's actual device (OS, Browser Engine, Logical Threads, Battery Level).
-   **Responsive Layout:** "About Me" section optimized for better screen real estate usage.

## 5. Coding Conventions
-   **Style:** Functional Components with Hooks. Type everything.
-   **Configuration:** Use `src/config.ts` for static values that might need tuning (like private repo counts).
-   **Privacy:** NEVER expose private API keys in the frontend. Use the Hybrid approach for private stats.
-   **UI:** Use `RealSystemDiagnostics` for hardware data; avoid hardcoded system specs in UI components.

## 6. Update Workflow
To apply changes to the live site:
1.  Modify Code/Content.
2.  Update `src/config.ts` if personal stats change.
3.  Run `npm run build`.
4.  Restart PM2 process.

## 7. Current State (v3.1 - Live Intelligence)
-   **Live:** GitHub stats are live (user: `k4programs`).
-   **Environment:** Weather/Location services active.
-   **Diagnostics:** Hardware scan active.
-   **Optimized:** Layout shifts fixed (Typewriter), Box sizes adjusted.