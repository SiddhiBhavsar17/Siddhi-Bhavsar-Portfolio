import { Project } from '../types';
import journeyBhaiImg from '../assets/projects/journey-bhai.svg';
import journeyBhaiLogo from '../assets/logos/journey-bhai-logo.svg';
import novaSentinelImg from '../assets/projects/novasentinel.svg';
import signLanguageImg from '../assets/projects/sign-language.svg';
import constellationImg from '../assets/projects/constellation.svg';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE PROJECTS DATA
 * ============================================================================
 * 1. Journey Bhai (Featured flagship project with logo & enhanced prominence)
 * 2. NovaSentinel (AI Drone Surveillance)
 * 3. Sign Language Translator (AI-Based Computer Vision)
 * 4. Constellation Explorer (Image Processing + Interactive Game)
 * 
 * - Update GitHub repo links with your actual URLs.
 * - Replace images in src/assets/projects/ or assign any image URL/import.
 * - Media paths are editable in mediaGallery for screenshots, images, & videos.
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
    image: journeyBhaiImg,
    logo: journeyBhaiLogo,
    githubUrl: "https://github.com/YOUR_GITHUB_URL/journey-bhai",
    featured: true,
    mediaGallery: [
      {
        id: "jb-media-1",
        type: "image",
        title: "Journey Bhai Architecture & Itinerary Engine",
        url: journeyBhaiImg,
        caption: "Full journey planning interface with AI route adaptation and dynamic budget estimator."
      },
      {
        id: "jb-media-2",
        type: "image",
        title: "Official Brand Identity & Logo",
        url: journeyBhaiLogo,
        caption: "Brandmark representing modern intelligent travel companionship."
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
    image: novaSentinelImg,
    githubUrl: "https://github.com/YOUR_GITHUB_URL/novasentinel",
    featured: false,
    mediaGallery: [
      {
        id: "ns-media-1",
        type: "image",
        title: "NovaSentinel Drone Vision Feed",
        url: novaSentinelImg,
        caption: "Real-time edge detection overlay showing bounding boxes, tracking IDs, and threat telemetry."
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
    image: signLanguageImg,
    githubUrl: "https://github.com/YOUR_GITHUB_URL/sign-language-translator",
    featured: false,
    mediaGallery: [
      {
        id: "slt-media-1",
        type: "image",
        title: "Gesture Recognition & Landmark Pipeline",
        url: signLanguageImg,
        caption: "Computer vision tracking analyzing hand pose landmarks and rendering immediate translated text."
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
    image: constellationImg,
    githubUrl: "https://github.com/YOUR_GITHUB_URL/constellation-explorer",
    featured: false,
    mediaGallery: [
      {
        id: "ce-media-1",
        type: "image",
        title: "Constellation Denoising & Interactive Game HUD",
        url: constellationImg,
        caption: "Digital image processing denoising filter revealing celestial star nodes with interactive score tracking."
      }
    ]
  }
];
