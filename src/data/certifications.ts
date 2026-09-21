import { Certification } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE CERTIFICATIONS DATA — EXACTLY 6 REAL CREDENTIALS
 * ============================================================================
 * All 6 entries map directly to authentic certificate documents uploaded
 * to public/assets/certificates/ with high-resolution real certificate
 * previews rendered in public/assets/certificates/previews/.
 * 
 * TOP 3 FEATURED:
 * 1. AI Engineer Course — Complete AI Engineer Bootcamp (Udemy / 365 Careers, 2026)
 * 2. Introduction to Computer Vision and Image Processing (IBM / Coursera, 2025)
 * 3. Google Cybersecurity Professional Certificate (Google / Coursera, 2024)
 * 
 * REMAINING 3 (Revealed when expanded):
 * 4. Crash Course on Python (Google / Coursera, 2024)
 * 5. Django Framework (Meta / Coursera, 2024)
 * 6. Programming with C++ (Simplilearn / Coursera, 2024)
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
    thumbnail: "/assets/certificates/previews/cert-ai-engineer-bootcamp.png",
    previewUrl: "/assets/certificates/previews/cert-ai-engineer-bootcamp.png",
    documentUrl: "/assets/certificates/cert-ai-engineer-bootcamp.pdf",
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
    id: "cert-ibm-computer-vision",
    name: "Introduction to Computer Vision and Image Processing",
    issuer: "IBM • Coursera",
    year: "2025",
    thumbnail: "/assets/certificates/previews/cert-ibm-computer-vision.png",
    previewUrl: "/assets/certificates/previews/cert-ibm-computer-vision.png",
    documentUrl: "/assets/certificates/cert-ibm-computer-vision.pdf",
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
  {
    id: "cert-google-cybersecurity",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google • Coursera",
    year: "2024",
    thumbnail: "/assets/certificates/previews/cert-google-cybersecurity.png",
    previewUrl: "/assets/certificates/previews/cert-google-cybersecurity.png",
    documentUrl: "/assets/certificates/cert-google-cybersecurity.pdf",
    skillsCovered: [
      "Cybersecurity",
      "Network Security",
      "Linux & Bash",
      "SQL for Security",
      "Threat Detection & SIEM",
      "Incident Response"
    ],
    featured: true,
    description: "A comprehensive 9-course professional certificate program authorized by Google on Coursera, providing end-to-end training in security frameworks, threat intelligence, network architecture, and security operations."
  },

  // --------------------------------------------------------------------------
  // REMAINING 3 CERTIFICATES (Expanded via View All Certifications)
  // --------------------------------------------------------------------------
  {
    id: "cert-google-python",
    name: "Crash Course on Python",
    issuer: "Google • Coursera",
    year: "2024",
    thumbnail: "/assets/certificates/previews/cert-google-python.png",
    previewUrl: "/assets/certificates/previews/cert-google-python.png",
    documentUrl: "/assets/certificates/cert-google-python.pdf",
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
    id: "cert-meta-django",
    name: "Django Framework",
    issuer: "Meta • Coursera",
    year: "2024",
    thumbnail: "/assets/certificates/previews/cert-meta-django.png",
    previewUrl: "/assets/certificates/previews/cert-meta-django.png",
    documentUrl: "/assets/certificates/cert-meta-django.pdf",
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
    thumbnail: "/assets/certificates/previews/cert-simplilearn-cpp.png",
    previewUrl: "/assets/certificates/previews/cert-simplilearn-cpp.png",
    documentUrl: "/assets/certificates/cert-simplilearn-cpp.pdf",
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
