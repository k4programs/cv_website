# GEMINI.md - Project Context & Guidelines

## 1. Project Identity: "MacCV" (Cyberpunk Portfolio)
This project is a high-performance, immersive portfolio website styled like a futuristic hacker terminal / OS. It uses a "Cyberpunk/Matrix" aesthetic with green neon colors, scanlines, and glitch effects.

## 2. Tech Stack
-   **Framework:** React 18
-   **Build Tool:** Vite
-   **Language:** JavaScript (ES6+), JSX
-   **Styling:** Bootstrap 5 (Grid/Layout), Custom CSS (Theming), Framer Motion (Animations)
-   **Production Server:** `serve` (Static File Serving)
-   **Process Management:** PM2 (Service name: `mac-cv`)

## 3. Architecture & File Structure (`/web`)
The project has been refactored from a monolithic `App.jsx` to a modular structure:

-   **`src/main.jsx`**: Entry point.
-   **`src/App.jsx`**: Main layout controller. Handles global state and renders the layout grid.
-   **`src/components/`**:
    -   `BootSequence.jsx`: Renders an initial "boot-up" animation.
    -   `DecryptionMinigame.jsx`: A simple sequence-matching game to "decrypt" the page.
    -   `InteractiveBackground.jsx`: Creates a subtle, animated particle background.
    -   `HoloModal.jsx`: The 3D-styled modal for displaying detailed project/bio info.
    -   `TechCard.jsx`: Reusable container for grid items with "HUD" borders.
    -   `Terminal.jsx`: The interactive CLI overlay.
    -   `Typewriter.jsx`: Effect component for text typing animation.
-   **`src/data/`**:
    -   `database.jsx`: Contains all static content (`PROJECTS_DATA`, `ABOUT_DATA`, `HISTORY_DATA`).
-   **`src/index.css`**: Global styles, CRT effects, animations, and component-specific styles.

## 4. Deployment & Security (HARDENED)
The project runs in **Production Mode** for security and performance.
-   **Dev Mode:** `vite dev` (Only for local development/coding).
-   **Production:** `npm run build` -> `dist/` folder -> Served via `npx serve`.
-   **PM2 Command:** `pm2 start "npx serve dist -l 5173" --name "mac-cv"`
-   **Server Config:** A `serve.json` file in the `/web` directory handles SPA routing and direct access to static pages like `/resume`.

## 5. Coding Conventions for AI Agents
-   **Style:** Functional Components with Hooks.
-   **Naming:** PascalCase for components, camelCase for functions/vars.
-   **Safety:** Always escape output in the Terminal to prevent injection. Use `serve` for production exposure.
-   **Modularity:** Do not add logic back into `App.jsx` if it belongs in a sub-component.
-   **Styling:** Use `src/index.css` variables (`var(--neon-green)`) instead of hardcoded hex values.

## 6. Update Workflow
To apply changes to the live site:
1.  Modify Code/Content.
2.  Run `npm run build` (Compiles to `/dist`).
3.  (Optional) `pm2 restart mac-cv` (Usually not needed for static files, but good practice).

## 7. Current State (v2.5 - Finalized)
-   **Encrypted by Default:** The site now loads into a "decryption" screen after the boot sequence, requiring user interaction to view the main content.
-   **Gamified Decryption:** A minigame (`DecryptionMinigame.jsx`) is presented as the primary method to decrypt the site. It includes a bypass button for direct access.
-   **Clean App Logic:** The main `App.jsx` component now cleanly separates the three application states: Booting, Encrypted/Minigame, and Decrypted/Main Content.
-   **Expanded Portfolio:** The portfolio contains 6 sample projects.
-   **Bug Fixes:** Resolved all known rendering loops and reference errors.
-   **Security Hardening:** Active. Running on a static build via `serve`.