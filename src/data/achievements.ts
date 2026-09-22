import { Achievement } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE ACHIEVEMENTS DATA — CONNECTED TO AUTHENTIC PROOFS
 * ============================================================================
 * 1. HackACE 2026 — Finalist (Project: Journey Bhai)
 * 2. Adobe University Hackathon 2026 — Qualified — Round 2: Case Study
 * 3. IEEE ACSS Ideathon — Finalist (Project: Microbial Energy Generation)
 * ============================================================================
 */
export const achievementsData: Achievement[] = [
  {
    id: "ach-hackace-2026",
    title: "HackACE 2026",
    status: "Finalist",
    badge: "Finalist",
    project: "Journey Bhai",
    category: "Hackathon",
    thumbnail: "/assets/achievements/hackace-2026/preview.png",
    certificateUrl: "/assets/achievements/hackace-2026/preview.png",
    documentUrl: "/assets/achievements/hackace-2026/certificate.pdf",
    fileType: "pdf",
    files: [
      {
        id: "hackace-cert",
        name: "Finalist Certificate (PDF)",
        url: "/assets/achievements/hackace-2026/certificate.pdf",
        previewUrl: "/assets/achievements/hackace-2026/preview.png",
        type: "pdf",
        isPrimary: true
      }
    ]
  },
  {
    id: "ach-adobe-2026",
    title: "Adobe University Hackathon 2026",
    status: "Qualified — Round 2: Case Study",
    badge: "Qualified — Round 2",
    category: "Hackathon",
    thumbnail: "/assets/achievements/adobe-2026/preview.png",
    certificateUrl: "/assets/achievements/adobe-2026/preview.png",
    documentUrl: "/assets/achievements/adobe-2026/round-2-proof.pdf",
    fileType: "pdf",
    files: [
      {
        id: "adobe-round-2-proof",
        name: "Round 2 Qualification Proof (PDF)",
        url: "/assets/achievements/adobe-2026/round-2-proof.pdf",
        previewUrl: "/assets/achievements/adobe-2026/preview.png",
        type: "pdf",
        isPrimary: true
      }
    ]
  },
  {
    id: "ach-ieee-acss",
    title: "IEEE ACSS Ideathon",
    status: "Finalist",
    badge: "Finalist",
    project: "Microbial Energy Generation",
    description: "An idea exploring energy generation using the movement of microorganisms.",
    category: "Competition",
    thumbnail: "/assets/achievements/ieee-acss/preview.jpg",
    certificateUrl: "/assets/achievements/ieee-acss/certificate.jpg",
    documentUrl: "/assets/achievements/ieee-acss/certificate.jpg",
    fileType: "image",
    files: [
      {
        id: "ieee-acss-cert",
        name: "Finalist Certificate",
        url: "/assets/achievements/ieee-acss/certificate.jpg",
        previewUrl: "/assets/achievements/ieee-acss/preview.jpg",
        type: "image",
        isPrimary: true
      }
    ]
  }
];
