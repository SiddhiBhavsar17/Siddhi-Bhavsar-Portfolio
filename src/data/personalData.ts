import profileImagePlaceholder from '../assets/profile/profile-placeholder.svg';
import { PersonalData } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE PERSONAL DATA
 * ============================================================================
 * All personal information for the portfolio is stored and edited here.
 * Update your information, links, and titles in this single file.
 * ============================================================================
 */
export const personalData: PersonalData = {
  // Full Name (used in Navbar, Hero, and Footer)
  name: "SIDDHI BHAVSAR",

  // Short/First Name (used in friendly greetings, e.g. "Hi! I'm Siddhi")
  shortName: "Siddhi",

  // Current academic role/title (e.g. "B.Tech CSE Student")
  title: "B.Tech CSE Student",

  // University / College name
  college: "Pimpri Chinchwad University",

  // Specialization tags displayed under profile and in badges
  specialization: [
    "AI/ML",
    "Generative AI",
    "Python"
  ],

  // Brand motto under logo in navbar and footer
  brandTagline: "Code · Create · Explore · Repeat",

  // Large Hero Heading: "Turning Ideas into Impact"
  heroHeadline: "Turning Ideas into",
  heroHeadlineHighlight: "Impact",

  // Hero introduction statement
  heroSubtitle: "A CSE student exploring the endless possibilities of AI, code, and imagination.",

  // Hero secondary statement (algorithms, books, games, physics, magic)
  heroSecondary: "Same person who loves algorithms, books, games, physics and a little bit of magic ✨",

  // Motto displayed in italics under the hero avatar profile
  motto: "“Building intelligent systems for a better tomorrow.”",

  // About Me paragraph
  bio: "Hi, I’m Siddhi Bhavsar, a curious and driven Computer Science and Engineering student passionate about AI/ML, technology, problem-solving, and continuous learning. I am currently pursuing my B.Tech in Computer Science and Engineering at Pimpri Chinchwad University with a CGPA of 9.07.\n\nMy goal is to build a strong career in AI/ML, gain valuable industry experience, and eventually turn my ideas into a technology-driven startup.",

  // Contact details & Coding profiles
  email: "bhavsarsiddhi14@gmail.com",
  github: "https://github.com/SiddhiBhavsar17",
  linkedin: "https://www.linkedin.com/in/siddhi-bhavsar-187285309/",
  hackerrank: "https://www.hackerrank.com/profile/bhavsarsiddhi14",
  leetcode: "https://leetcode.com/u/bhavsarsiddhi14/",

  // Path to your resume PDF (upload your real resume to /public/assets/resume/resume.pdf)
  resume: "/assets/resume/resume.pdf",

  // Path to your profile picture (upload your real photo to /public/assets/profile/profile.jpg)
  profileImage: "/assets/profile/profile.jpg",

  // Location
  location: "Pune, Maharashtra, India"
};

// Also export alias for backward compatibility with existing imports
export const personalInfo = personalData;
