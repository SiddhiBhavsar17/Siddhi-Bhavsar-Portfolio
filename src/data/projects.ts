import { Project } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE PROJECTS DATA
 * ============================================================================
 * All visual assets are stored directly in public/assets/projects/ and public/assets/logos/
 * 
 * 1. Journey Bhai (Flagship project with authentic logo & brand visual)
 * 2. NovaSentinel (AI Drone Surveillance — Concept Visual)
 * 3. Sign Language Translator (AI-Based Computer Vision — Concept Visual)
 * 4. Constellation Explorer (Image Processing + Interactive Game — Concept Visual)
 * ============================================================================
 */
export const projectsData: Project[] = [
  {
    id: "journey-bhai",
    name: "Journey Bhai",
    tagline: "AI Travel Assistant",
    category: "AI Travel Assistant",
    description: "An AI-powered travel assistant that plans, guides, and adapts your entire journey with personalized recommendations and intelligent route planning.",
    technologies: [
      "Python",
      "FastAPI",
      "React Native",
      "TypeScript",
      "PostgreSQL",
      "NLP/LLM",
      "Speech-to-Text",
      "OSMnx"
    ],
    keyFeatures: [
      "Personalized multi-day travel itinerary generation adapting dynamically to budget, pacing, and preferences.",
      "Real-time route navigation and map graph analysis powered by OSMnx and intelligent geospatial algorithms.",
      "Hands-free conversational assistance using Speech-to-Text and fine-tuned domain NLP/LLM pipelines.",
      "Robust asynchronous backend built with FastAPI, PostgreSQL relational persistence, and cross-platform React Native app."
    ],
    image: "/assets/projects/journey-bhai.png",
    logo: "/assets/logos/journey-bhai-logo.jpeg",
    githubUrl: "https://github.com/SiddhiBhavsar17/Journey-Bhai",
    featured: true,
    visualType: "real",
    mediaGallery: [
      {
        id: "jb-media-1",
        type: "image",
        title: "Journey Bhai Project Visual",
        url: "/assets/projects/journey-bhai.png",
        caption: "AI-powered travel companion architecture featuring personalized itinerary generation and intelligent routing."
      },
      {
        id: "jb-media-2",
        type: "image",
        title: "Journey Bhai Official Logo",
        url: "/assets/logos/journey-bhai-logo.jpeg",
        caption: "Official brand identity logo for Journey Bhai travel assistant."
      }
    ]
  },
  {
    id: "novasentinel",
    name: "NovaSentinel",
    tagline: "AI Drone Surveillance",
    category: "AI Drone Surveillance",
    description: "An AI-powered surveillance system for real-time human detection, facial recognition, multi-person tracking, and automated threat alerts.",
    technologies: [
      "Python",
      "OpenCV",
      "YOLOv8",
      "Computer Vision"
    ],
    keyFeatures: [
      "Real-time object and human detection processing aerial video feeds with high precision using YOLOv8.",
      "Multi-person tracking pipeline correlating bounding boxes across camera frames with low latency.",
      "Facial recognition and identity verification modules built with OpenCV and deep feature embeddings.",
      "Automated threat alert system triggering instant visual and telemetry notifications upon perimeter intrusion."
    ],
    image: "/assets/projects/novasentinel-concept.png",
    githubUrl: "https://github.com/SiddhiBhavsar17/NovaSentinel-AI-Powered-Drone-Surveillance-System",
    featured: false,
    visualType: "concept",
    mediaGallery: [
      {
        id: "ns-media-1",
        type: "image",
        title: "NovaSentinel Drone Surveillance — Concept Visual",
        url: "/assets/projects/novasentinel-concept.png",
        caption: "System concept visual illustrating real-time aerial computer vision, object detection, and threat telemetry monitoring."
      }
    ]
  },
  {
    id: "sign-language-translator",
    name: "Sign Language Translator",
    tagline: "AI-Based Computer Vision",
    category: "AI-Based Computer Vision",
    description: "A vision-based sign language system that interprets hand gestures from video and converts recognized signs into text.",
    technologies: [
      "Python",
      "OpenCV",
      "NLP",
      "Computer Vision"
    ],
    keyFeatures: [
      "Continuous hand landmark tracking extracting 21 spatial coordinates per hand from live video streams.",
      "Gesture classification translating complex spatial movement patterns into discrete character and word tokens.",
      "Natural Language Processing pipeline synthesizing recognized token sequences into grammatically coherent sentences.",
      "Accessible visual interface converting recognized signs into real-time text output for seamless communication."
    ],
    image: "/assets/projects/sign-language-concept.png",
    githubUrl: "https://github.com/SiddhiBhavsar17/sign-language-translator",
    featured: false,
    visualType: "concept",
    mediaGallery: [
      {
        id: "slt-media-1",
        type: "image",
        title: "Sign Language Translator — Concept Visual",
        url: "/assets/projects/sign-language-concept.png",
        caption: "System concept visual illustrating hand landmark coordinate mapping, gesture classification, and text translation pipeline."
      }
    ]
  },
  {
    id: "constellation-explorer",
    name: "Constellation Explorer",
    tagline: "Image Processing + Interactive Game",
    category: "Image Processing + Interactive Game",
    description: "An image-processing project that reduces noise in sky images to reveal stars and celestial bodies, followed by an interactive constellation-finding game with score-based gameplay.",
    technologies: [
      "Python",
      "Digital Image Processing",
      "Computer Vision"
    ],
    keyFeatures: [
      "Multi-stage digital image noise reduction removing high-frequency atmospheric noise from low-light sky captures.",
      "Adaptive thresholding and contrast enhancement revealing faint stars, nebulae, and celestial bodies.",
      "Constellation identification engine mapping detected geometric star nodes against astronomical star catalogs.",
      "Interactive gamified scoring system rewarding precision, speed, and accuracy in identifying constellations."
    ],
    image: "/assets/projects/constellation-concept.png",
    githubUrl: "https://github.com/SiddhiBhavsar17/DIP-project",
    featured: false,
    visualType: "concept",
    mediaGallery: [
      {
        id: "ce-media-1",
        type: "image",
        title: "Constellation Explorer — Concept Visual",
        url: "/assets/projects/constellation-concept.png",
        caption: "System concept visual illustrating astronomical image denoising, celestial star detection, and gamified constellation discovery."
      }
    ]
  }
];
