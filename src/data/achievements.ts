import { Achievement } from '../types';
import certHackACE from '../assets/achievements/cert-hackace-2026.svg';
import certAdobeHackathon from '../assets/achievements/cert-adobe-hackathon.svg';
import certIeeeAcss from '../assets/achievements/cert-ieee-acss.svg';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE ACHIEVEMENTS DATA
 * ============================================================================
 * Displayed in exact order:
 * 1. HackACE 2026 — Finalist (Project: Journey Bhai)
 * 2. Adobe University Hackathon 2026 — Qualified — Round 2: Case Study
 * 3. IEEE ACSS Ideathon — Finalist (Project: Microbial Energy Generation)
 * 
 * Rules:
 * - NO year displayed.
 * - NO generic secondary descriptions.
 * - Focused strictly on: Event → Status → Project (when applicable) → Certificate.
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
    thumbnail: certHackACE,
    certificateUrl: certHackACE
  },
  {
    id: "ach-adobe-2026",
    title: "Adobe University Hackathon 2026",
    status: "Qualified — Round 2: Case Study",
    badge: "Qualified — Round 2",
    category: "Hackathon",
    thumbnail: certAdobeHackathon,
    certificateUrl: certAdobeHackathon
  },
  {
    id: "ach-ieee-acss",
    title: "IEEE ACSS Ideathon",
    status: "Finalist",
    badge: "Finalist",
    project: "Microbial Energy Generation",
    description: "An idea exploring energy generation using the movement of microorganisms.",
    category: "Competition",
    thumbnail: certIeeeAcss,
    certificateUrl: certIeeeAcss
  }
];
