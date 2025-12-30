// SYSTEM CONFIGURATION LAYER
// Hier konfigurieren wir Daten, die die öffentliche API nicht sehen darf/kann.

export const SYSTEM_CONFIG = {
  github: {
    username: "k4programs",
    // Datenschutz: Da die API nur öffentliche Repos sieht, addieren wir hier 
    // die Anzahl deiner privaten Projekte für die korrekte Statistik.
    privateRepoOffset: 15, 
    
    // Da private Repos nicht gescannt werden können, definieren wir hier 
    // deine Haupt-Sprachen manuell, damit der "Stack" nicht leer aussieht.
    // Format: [Sprache, Gewichtung/Anzahl Projekte]
    manualStack: [
      ["TypeScript", 10],
      ["Python", 8],
      ["Rust", 3],
      ["C#", 5]
    ] as [string, number][]
  }
};