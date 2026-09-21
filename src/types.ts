export interface ProjectMediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface InterestItem {
  id: string;
  title: string;
  icon: string;
  color?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  image: string;
  logo?: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  mediaGallery?: ProjectMediaItem[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
  thumbnail: string;
  previewUrl?: string;
  documentUrl?: string;
  skillsCovered: string[];
  featured: boolean;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  status: string; // e.g., 'Finalist', 'Qualified — Round 2: Case Study'
  badge: string; // Short badge label
  project?: string; // Optional related project (e.g. Journey Bhai, Microbial Energy Generation)
  category?: 'Hackathon' | 'Competition' | 'Academic' | 'Recognition';
  description?: string; // Short project description when needed
  certificateUrl?: string; // Real certificate image or PDF
  thumbnail?: string; // Preview image
  event?: string;
  year?: string;
  highlight?: boolean;
  documentUrl?: string;
  proofImage?: string;
}

export type ExperienceDocumentType = 
  | 'offer-letter' 
  | 'internship-certificate' 
  | 'experience-certificate' 
  | 'letter-of-recommendation'
  | 'other';

export interface ExperienceDocument {
  id: string;
  title: string;              // e.g., "Offer Letter", "Experience Certificate", "Certificate"
  label: string;              // Button display text, e.g., "View Offer Letter", "View Certificate"
  url: string;                // PDF path, e.g., "/assets/experience/LabMentix_Offer_Letter.pdf"
  type: ExperienceDocumentType; // Categorical document type
  downloadName?: string;      // Optional custom filename when downloaded
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  duration?: string;
  type?: string;
  description: string;
  technologies: string[];
  documents?: ExperienceDocument[]; // Structured, purpose-mapped documents
  certificateUrl?: string;          // Backward compatibility
  certificateTitle?: string;        // Backward compatibility
  offerLetterUrl?: string;          // Backward compatibility
  offerLetterTitle?: string;        // Backward compatibility
  documentUrl?: string;             // Backward compatibility
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  status?: string;
  score?: string;
  cgpa?: string;
  percentage?: string;
  details?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  description?: string;
  highlight?: boolean;
}

export interface PersonalData {
  name: string;
  shortName: string;
  title: string;
  headline?: string;
  college: string;
  specialization: string[];
  brandTagline: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  heroSecondary: string;
  motto: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  university?: string;
  degree?: string;
  graduationYear?: string;
  github: string;
  linkedin: string;
  resume: string;
  hackerrank?: string;
  leetcode?: string;
  footerQuote?: string;
  socials?: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
    hackerrank?: string;
    leetcode?: string;
  };
  profileImage: string;
  resumeUrl?: string;
}
