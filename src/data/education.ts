import { EducationItem, InterestItem } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE EDUCATION DATA
 * ============================================================================
 * Exactly 3 education entries without invented coursework or subjects.
 * ============================================================================
 */
export const educationData: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Pimpri Chinchwad University",
    period: "2024 – 2028",
    cgpa: "9.07",
    status: "Current Student"
  },
  {
    degree: "Higher Secondary / 12th Standard",
    institution: "Kendriya Vidyalaya",
    period: "2023 – 2024",
    percentage: "71%",
    status: "Completed"
  },
  {
    degree: "10th Standard",
    institution: "Kendriya Vidyalaya",
    period: "2021 – 2022",
    percentage: "78%",
    status: "Completed"
  }
];

/**
 * Exactly 5 Hobbies requested:
 * - Reading Books
 * - Playing Games
 * - Dancing
 * - Listening to Music
 * - Exploring New Domains
 */
export const hobbiesData: InterestItem[] = [
  {
    id: "reading-books",
    title: "Reading Books",
    icon: "BookOpen",
    color: "indigo"
  },
  {
    id: "playing-games",
    title: "Playing Games",
    icon: "Gamepad2",
    color: "emerald"
  },
  {
    id: "dancing",
    title: "Dancing",
    icon: "Sparkles",
    color: "pink"
  },
  {
    id: "listening-to-music",
    title: "Listening to Music",
    icon: "Headphones",
    color: "cyan"
  },
  {
    id: "exploring-new-domains",
    title: "Exploring New Domains",
    icon: "Compass",
    color: "purple"
  }
];

// Alias for backward compatibility
export const interestsData = hobbiesData;

