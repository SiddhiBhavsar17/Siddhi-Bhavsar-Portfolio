import { ExperienceItem } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE EXPERIENCE DATA
 * ============================================================================
 * Add or edit your internships, student research roles, and technical
 * experience here.
 * 
 * Storage directory for experience PDFs:
 *   /public/assets/experience/
 * 
 * Each experience entry maps its documents explicitly to their specific purpose:
 * - Offer Letters
 * - Internship Certificates
 * - Experience Certificates
 * - Recommendation Letters
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
    technologies: ["Python", "Machine Learning", "AI"],
    documents: [
      {
        id: "labmentix-offer-letter",
        title: "Offer Letter",
        label: "View Offer Letter",
        url: "/assets/experience/LabMentix_Offer_Letter.pdf",
        type: "offer-letter",
        downloadName: "LabMentix_Offer_Letter.pdf"
      },
      {
        id: "labmentix-certificate",
        title: "Certificate",
        label: "View Certificate",
        url: "/assets/experience/LabMentix_Certificate.pdf",
        type: "internship-certificate",
        downloadName: "LabMentix_Internship_Certificate.pdf"
      }
    ],
    // Backward compatibility fallback fields
    offerLetterUrl: "/assets/experience/LabMentix_Offer_Letter.pdf",
    offerLetterTitle: "Offer Letter",
    certificateUrl: "/assets/experience/LabMentix_Certificate.pdf",
    certificateTitle: "Certificate",
    documentUrl: "/assets/experience/LabMentix_Certificate.pdf"
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
    technologies: ["Gen AI", "Data Analytics", "Strategy"],
    documents: [
      {
        id: "tata-forage-certificate",
        title: "Certificate",
        label: "View Certificate",
        url: "/assets/experience/Tata_Forage_Certificate.pdf",
        type: "internship-certificate",
        downloadName: "Tata_Forage_Certificate.pdf"
      }
    ],
    // Backward compatibility fallback fields
    certificateUrl: "/assets/experience/Tata_Forage_Certificate.pdf",
    certificateTitle: "Certificate",
    documentUrl: "/assets/experience/Tata_Forage_Certificate.pdf"
  }
];
