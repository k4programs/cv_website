# GEMINI.md - Project Context & Guidelines (v3.2)

## 1. Project Identity: "MacCV" (Singularity Edition)
This project is a high-performance, immersive portfolio website styled like a futuristic hacker terminal / OS. It has been upgraded to **v3.2**, featuring advanced interactive modules like a Code Vault, Skill Graph, and encrypted communications.

## 2. Tech Stack (v3.2)
-   **Framework:** React 18+
-   **Language:** TypeScript (Strict Mode)
-   **Build Tool:** Vite
-   **Styling:** Bootstrap 5, Custom CSS, Framer Motion
-   **Visualization:** Canvas (Skill Graph), react-syntax-highlighter (Code Vault)
-   **Utilities:** jsPDF (PDF Generation)
-   **Live Data:** Open-Meteo, IP-API, GitHub REST API

## 3. New Modules (v3.2)
-   **Code Vault (`CodeVault.tsx`):** A modal code editor showcasing live project snippets with syntax highlighting.
-   **Skill Graph (`SkillGraph.tsx`):** A physics-based canvas visualization of technical skills (Nodes & Edges).
-   **Secure Uplink (`ContactModal.tsx`):** An animated, hacker-themed contact form simulation.
-   **Classified Report (`pdfGenerator.ts`):** Client-side generation of a styled PDF resume ("CONFIDENTIAL").

## 4. Architecture & Config
-   **`src/config.ts`**: Central configuration for private data offsets (GitHub) and manual stack definitions.
-   **`src/components/`**: Modularized UI components for all new features.
-   **`src/services/`**: Separated logic for GitHub and Environment data fetching.

## 5. Coding Conventions
-   **Safety:** Template literals in code strings (for display) must be handled carefully to avoid runtime reference errors (use string concatenation).
-   **Performance:** Canvas animations should handle resize events and cleanup on unmount.

## 6. Update Workflow
To apply changes to the live site:
1.  Modify Code/Content.
2.  Update `src/config.ts` if personal stats change.
3.  Run `npm run build`.
4.  Restart PM2 process.

## 7. Current State (v3.2 - Singularity)
-   **Live:** GitHub stats, Weather, Location, Hardware Scan.
-   **Interactive:** Code Vault, Skill Graph, Contact Form, PDF Download.
-   **Layout:** Optimized right column (Experience -> Projects -> Skill Graph).
