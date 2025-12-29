# GEMINI.md - Project Context & Guidelines (v3.0)

## 1. Project Identity: "MacCV" (Enterprise Edition)
This project is a high-performance, immersive portfolio website styled like a futuristic hacker terminal / OS. It has been upgraded from a simple React App to an enterprise-level showcase featuring a TypeScript-first architecture, live API integrations, and a 3D rendering engine.

## 2. Tech Stack (v3.0)
-   **Framework:** React 18+ (upgraded)
-   **Language:** TypeScript (Full Migration)
-   **Build Tool:** Vite (upgraded)
-   **Styling:** Bootstrap 5, Custom CSS, Framer Motion
-   **3D Rendering:** `react-three-fiber` / `three.js`
-   **Production Server:** `serve` (Static File Serving)
-   **Process Management:** PM2 (Service name: `mac-cv`)

## 3. Architecture & File Structure (`/web`)
The project has been refactored into a professional, modular, and type-safe structure:

-   **`src/main.tsx`**: Entry point.
-   **`src/App.tsx`**: Main layout controller. Handles global state (Modals, Theming).
-   **`src/types.ts`**: Centralized TypeScript interfaces (`ProjectData`, `GitHubStats`).
-   **`src/components/`**: All UI components are now `.tsx` files, fully typed.
    -   `CyberGlobe.tsx`: New 3D avatar component.
    -   `SystemMonitor.tsx`: Standalone system metrics display.
    -   ... (other components like `HoloModal`, `Terminal`, etc.)
-   **`src/hooks/`**: Reusable logic encapsulated in custom hooks.
    -   `useSystemStats.ts`: Simulates live system metric updates.
    -   `useSoundEffects.ts`: Generates synthetic audio feedback.
-   **`src/services/`**: For fetching data from external APIs.
    -   `githubService.ts`: Fetches live user data from the GitHub API.
-   **`src/data/database.tsx`**: Contains all static content, now fully typed.
-   **`src/index.css`**: Global styles, including the new `.serious-mode` for accessibility.

## 4. Deployment & Security (HARDENED)
-   **Dependencies:** All known vulnerabilities have been patched via `npm audit fix`.
-   **TypeScript:** Reduces runtime errors and improves code reliability.
-   **Production Build:** The `npm run build` command creates a static, optimized build in `/dist`. This folder is served directly. No dev servers should be exposed to the public.

## 5. Coding Conventions for AI Agents
-   **Style:** Functional Components with Hooks. Type everything.
-   **Naming:** PascalCase for components, `IInterface` for interfaces (if preferred, or just `InterfaceName`), camelCase for functions/vars.
-   **Data Flow:** Use services for API calls, pass typed data down through props. Avoid `any`.
-   **Modularity:** Keep components small and focused. Complex logic belongs in hooks or services.
-   **Styling:** Use `src/index.css` variables. The `.serious-mode` class overrides these for the clean theme.

## 6. Update Workflow (Unchanged)
To apply changes to the live site:
1.  Modify Code/Content.
2.  Run `npm run build`.
3.  (Optional) `pm2 restart mac-cv` (if server config changes).

## 7. Current State (v3.0 - Enterprise)
-   **TypeScript First:** The entire codebase is now type-safe.
-   **Live Data:** The terminal integrates live data from the GitHub API.
-   **3D Enabled:** A `react-three-fiber` scene replaces the static avatar.
-   **Dual-Theme:** A "Serious Mode" for accessibility and professional viewing is available.
-   **Modular & Clean:** Architecture is separated by concerns (components, hooks, services).
-   **Vulnerabilities Patched:** All reported npm vulnerabilities have been fixed.
