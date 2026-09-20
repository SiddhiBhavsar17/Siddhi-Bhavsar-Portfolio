import { Certification } from '../types';
import certAiEngineer from '../assets/certificates/cert-ai-engineer-bootcamp.svg';
import certMlAi from '../assets/certificates/cert-ml-nlp-ai.svg';
import certIbmCv from '../assets/certificates/cert-ibm-computer-vision.svg';
import certGooglePython from '../assets/certificates/cert-google-python.svg';
import certGoogleCyber from '../assets/certificates/cert-google-cybersecurity.svg';
import certMetaDjango from '../assets/certificates/cert-meta-django.svg';
import certSimplilearnCpp from '../assets/certificates/cert-simplilearn-cpp.svg';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE CERTIFICATIONS DATA
 * ============================================================================
 * TOP 3 FEATURED:
 * 1. AI Engineer Course — Complete AI Engineer Bootcamp (Udemy / 365 Careers, 2026) [PRIMARY/FEATURED]
 * 2. Machine Learning, NLP & Deep Learning (Actual ML/AI topics)
 * 3. Introduction to Computer Vision and Image Processing (IBM / Coursera)
 * 
 * REMAINING CERTIFICATES (Revealed when expanded):
 * 4. Crash Course on Python (Google / Coursera)
 * 5. Google Cybersecurity Professional Certificate (Google / Coursera, 9-course program)
 * 6. Django Framework (Meta / Coursera)
 * 7. Programming with C++ (Simplilearn / Coursera)
 * 
 * Note: Credential IDs and Verification URLs are only included when authentic.
 * No fabricated IDs or placeholder strings.
 * ============================================================================
 */
export const certificationsData: Certification[] = [
  // --------------------------------------------------------------------------
  // TOP 3 FEATURED CERTIFICATES
  // --------------------------------------------------------------------------
  {
    id: "cert-ai-engineer-bootcamp",
    name: "AI Engineer Course — Complete AI Engineer Bootcamp",
    issuer: "Udemy • 365 Careers",
    year: "2026",
    thumbnail: certAiEngineer,
    skillsCovered: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Large Language Models",
      "Prompt Engineering",
      "AI Systems Architecture"
    ],
    featured: true,
    description: "Comprehensive AI engineering specialization delivered by 365 Careers on Udemy, covering foundational AI principles through modern deep architectures, LLM integration, and full-cycle intelligent system development."
  },
  {
    id: "cert-ml-nlp-ai",
    name: "Machine Learning, NLP & AI Specialization",
    issuer: "Machine Learning & AI Topics",
    year: "2025",
    thumbnail: certMlAi,
    skillsCovered: [
      "Machine Learning",
      "Natural Language Processing",
      "Deep Learning",
      "Neural Networks",
      "Feature Engineering"
    ],
    featured: true,
    description: "In-depth training across core Machine Learning algorithms, predictive modeling, Natural Language Processing pipelines, vector embeddings, and deep neural network architectures."
  },
  {
    id: "cert-ibm-computer-vision",
    name: "Introduction to Computer Vision and Image Processing",
    issuer: "IBM • Coursera",
    year: "2025",
    thumbnail: certIbmCv,
    skillsCovered: [
      "Computer Vision",
      "Image Processing",
      "OpenCV",
      "Feature Extraction",
      "Object Detection"
    ],
    featured: true,
    description: "Authorized by IBM and offered through Coursera, covering fundamental digital image processing techniques, mathematical transformations, contour analysis, and computer vision model implementations."
  },

  // --------------------------------------------------------------------------
  // REMAINING CERTIFICATES (Expanded via View All Certifications)
  // --------------------------------------------------------------------------
  {
    id: "cert-google-python",
    name: "Crash Course on Python",
    issuer: "Google • Coursera",
    year: "2024",
    thumbnail: certGooglePython,
    skillsCovered: [
      "Python Programming",
      "Data Structures",
      "Object-Oriented Programming",
      "Algorithms",
      "Automation"
    ],
    featured: false,
    description: "Authorized by Google and delivered via Coursera, establishing programming fundamentals, standard data structures, object-oriented design patterns, and automated scripting."
  },
  {
    id: "cert-google-cybersecurity",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google • Coursera",
    year: "2024",
    thumbnail: certGoogleCyber,
    skillsCovered: [
      "Cybersecurity",
      "Network Security",
      "Linux & Bash",
      "SQL for Security",
      "Threat Detection & SIEM",
      "Incident Response"
    ],
    featured: false,
    description: "A comprehensive 9-course professional certificate program authorized by Google on Coursera, providing end-to-end training in security frameworks, threat intelligence, network architecture, and security operations."
  },
  {
    id: "cert-meta-django",
    name: "Django Framework",
    issuer: "Meta • Coursera",
    year: "2024",
    thumbnail: certMetaDjango,
    skillsCovered: [
      "Django",
      "Python Backend",
      "ORM & Databases",
      "REST APIs",
      "Model-View-Template"
    ],
    featured: false,
    description: "Authorized by Meta on Coursera, detailing backend development using Python and the Django framework, database modeling with ORM, view routing, templating, and secure authentication flows."
  },
  {
    id: "cert-simplilearn-cpp",
    name: "Programming with C++",
    issuer: "Simplilearn • Coursera",
    year: "2024",
    thumbnail: certSimplilearnCpp,
    skillsCovered: [
      "C++",
      "Object-Oriented Programming",
      "Memory Management",
      "Pointers & References",
      "Standard Template Library (STL)"
    ],
    featured: false,
    description: "Offered by Simplilearn through Coursera, focusing on high-performance C++ programming, memory handling, data structures, pointer mechanics, and the Standard Template Library."
  }
];
