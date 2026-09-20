import { ExperienceItem } from '../types';

/**
 * ============================================================================
 * 23. CENTRALIZED EDITABLE EXPERIENCE DATA
 * ============================================================================
 * Add or edit your internships, student research roles, and technical
 * experience here.
 * 
 * - Upload your documents to /public/assets/experience/
 * - Reference documentUrl: "/assets/experience/YOUR_DOCUMENT.pdf"
 * ============================================================================
 */
export const experienceData: ExperienceItem[] = [
  {
    id: "exp-labmentix",
    role: "AI/ML Intern",
    organization: "Labmentix",
    location: "Pune, Maharashtra, India",
    period: "2 Months",
    duration: "2 Months",
    type: "Remote · Part-time",
    description: "Worked on multiple AI/ML projects, gaining practical experience in developing and applying machine learning solutions.",
    technologies: [],
    certificateUrl: "/assets/experience/lab-maintenance-certificate.pdf",
    certificateTitle: "Experience Certificate",
    offerLetterUrl: "/assets/experience/lab-maintenance-offer-letter.pdf",
    offerLetterTitle: "Offer Letter",
    documentUrl: "/assets/experience/lab-maintenance-certificate.pdf"
  },
  {
    id: "exp-tata-forage",
    role: "Gen AI Powered Data Analytics",
    organization: "Tata Group × Forage",
    location: "Virtual",
    period: "Virtual Job Simulation",
    duration: "Virtual Job Simulation",
    type: "Virtual",
    description: "Completed a job simulation involving GenAI-powered data analytics, focusing on AI strategy, data interpretation, and model validation.",
    technologies: [],
    certificateUrl: "/assets/experience/tata-forage-certificate.pdf",
    certificateTitle: "Certificate",
    documentUrl: "/assets/experience/tata-forage-certificate.pdf"
  }
];
