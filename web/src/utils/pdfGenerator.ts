import { jsPDF } from 'jspdf';
import { PROJECTS_DATA, HISTORY_DATA } from '../data/database';

export const generateClassifiedPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Helper for centered text
  const centerText = (text: string, y: number) => {
    const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // --- HEADER ---
  doc.setFont("courier", "bold");
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  centerText("TOP SECRET // CLASSIFIED", 20);

  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  centerText("PERSONNEL FILE: MAX MUSTERMANN", 28);
  centerText("SUBJECT_ID: K4-PROGRAMS-882", 33);

  doc.setLineWidth(0.5);
  doc.line(20, 38, pageWidth - 20, 38);

  // --- CONFIDENTIAL STAMP ---
  doc.setTextColor(255, 0, 0);
  doc.setFontSize(30);
  doc.text("CONFIDENTIAL", 40, 60, { angle: 25, align: "center" });
  doc.setTextColor(0, 0, 0); // Reset

  // --- SUMMARY ---
  doc.setFontSize(14);
  doc.setFont("courier", "bold");
  doc.text("1. MISSION PROFILE (SUMMARY)", 20, 55);
  
  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  const summary = "Highly skilled Full-Stack Architect specialized in secure, scalable cloud systems. Proven track record in cyber-security and automated warfare (DevOps). Current Status: OPERATIONAL.";
  const splitSummary = doc.splitTextToSize(summary, 170);
  doc.text(splitSummary, 20, 65);

  // --- TECH STACK ---
  doc.setFontSize(14);
  doc.setFont("courier", "bold");
  doc.text("2. WEAPONRY (TECH STACK)", 20, 90);
  
  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  const skills = [
    "Frontend: React, TypeScript, Three.js, Bootstrap",
    "Backend: Node.js, Python, Go, Rust",
    "Infra: AWS, Docker, Kubernetes, Terraform",
    "Security: Penetration Testing, Cryptography"
  ];
  skills.forEach((skill, i) => {
    doc.text(`- ${skill}`, 25, 100 + (i * 6));
  });

  // --- EXPERIENCE ---
  doc.setFontSize(14);
  doc.setFont("courier", "bold");
  doc.text("3. OPERATION LOG (EXPERIENCE)", 20, 135);

  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  // Hardcoded for PDF style, normally parsed from HISTORY_DATA
  const history = [
    "[2022-PRES] LEAD ARCHITECT @ TECH_CORE // CLASSIFIED",
    "[2019-2022] SENIOR DEV @ GLOBAL_SYSTEMS",
    "[2017-2019] JUNIOR AGENT @ STARTUP_HUB"
  ];
  history.forEach((h, i) => {
    doc.text(h, 25, 145 + (i * 6));
  });

  // --- PROJECTS ---
  doc.setFontSize(14);
  doc.setFont("courier", "bold");
  doc.text("4. DEPLOYED ASSETS (PROJECTS)", 20, 175);
  
  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  PROJECTS_DATA.slice(0, 5).forEach((proj, i) => {
    const title = `${proj.title} [${proj.type}]`;
    doc.text(`> ${title}`, 25, 185 + (i * 6));
  });

  // --- FOOTER ---
  doc.setFontSize(8);
  doc.text("WARNING: UNAUTHORIZED DISTRIBUTION IS PUNISHABLE BY LAW.", 20, 280);
  doc.text(`GENERATED: ${new Date().toISOString()}`, 20, 285);

  // Save
  doc.save("personnel_file_k4programs_classified.pdf");
};