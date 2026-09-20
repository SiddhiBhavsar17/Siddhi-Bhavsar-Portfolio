import { Skill } from '../types';

/**
 * ============================================================================
 * CENTRALIZED EDITABLE SKILLS DATA
 * ============================================================================
 * Categories:
 * - Languages (Python, Java, C, C++, SQL, HTML, CSS, JavaScript)
 * - Siddhi's Specialty (Machine Learning, Deep Learning, Generative AI, OpenCV, NLP)
 * - Development (React, Angular, Django, FastAPI, Streamlit)
 * - Tools & Platforms (Git, GitHub, Linux, Figma, Jira, Agile)
 * - Others (MySQL, NumPy, Pandas)
 * ============================================================================
 */
export const skillCategories = [
  "All",
  "Languages",
  "Siddhi's Specialty",
  "Development",
  "Tools & Platforms",
  "Others"
];

/**
 * Curated 10 priority skills shown by default:
 * - Python, C++, Java, Machine Learning, Generative AI, OpenCV, React, FastAPI, Git, SQL
 * (Git & GitHub both belong to the Git/GitHub family requested)
 */
export const prioritySkillNames = [
  "Python",
  "C++",
  "Java",
  "Machine Learning",
  "Generative AI",
  "OpenCV",
  "React",
  "FastAPI",
  "Git",
  "SQL"
];

export const skillsData: Skill[] = [
  // --- Languages ---
  {
    id: "lang-python",
    name: "Python",
    category: "Languages",
    description: "Core programming language for AI/ML, backend microservices, scripts, and algorithms.",
    highlight: true
  },
  {
    id: "lang-cpp",
    name: "C++",
    category: "Languages",
    description: "High-performance object-oriented programming, memory management, and DSA.",
    highlight: true
  },
  {
    id: "lang-java",
    name: "Java",
    category: "Languages",
    description: "Object-oriented design, robust multithreaded systems, and backend foundations.",
    highlight: true
  },
  {
    id: "lang-sql",
    name: "SQL",
    category: "Languages",
    description: "Relational database schema design, complex joins, and query optimization.",
    highlight: true
  },
  {
    id: "lang-c",
    name: "C",
    category: "Languages",
    description: "Procedural programming, low-level memory control, and systems programming.",
    highlight: false
  },
  {
    id: "lang-html",
    name: "HTML",
    category: "Languages",
    description: "Semantic web page structure, accessible layouts, and document hierarchy.",
    highlight: false
  },
  {
    id: "lang-css",
    name: "CSS",
    category: "Languages",
    description: "Modern web styling, responsive flex/grid layouts, animations, and typography.",
    highlight: false
  },
  {
    id: "lang-javascript",
    name: "JavaScript",
    category: "Languages",
    description: "Dynamic frontend interactivity, ES6+ features, and asynchronous runtime execution.",
    highlight: false
  },

  // --- Siddhi's Specialty ---
  {
    id: "spec-machine-learning",
    name: "Machine Learning",
    category: "Siddhi's Specialty",
    description: "Supervised & unsupervised learning, classification, regressions, and predictive modeling.",
    highlight: true
  },
  {
    id: "spec-generative-ai",
    name: "Generative AI",
    category: "Siddhi's Specialty",
    description: "Large Language Models, prompt engineering, fine-tuning, and generative pipelines.",
    highlight: true
  },
  {
    id: "spec-opencv",
    name: "OpenCV",
    category: "Siddhi's Specialty",
    description: "Computer vision, image filtering, contour detection, and real-time video processing.",
    highlight: true
  },
  {
    id: "spec-deep-learning",
    name: "Deep Learning",
    category: "Siddhi's Specialty",
    description: "Neural network architectures, backpropagation, and deep representation learning.",
    highlight: false
  },
  {
    id: "spec-nlp",
    name: "NLP",
    category: "Siddhi's Specialty",
    description: "Natural Language Processing, text tokenization, embeddings, and transformer models.",
    highlight: false
  },

  // --- Development ---
  {
    id: "dev-react",
    name: "React",
    category: "Development",
    description: "Component-driven user interfaces, hooks architecture, and virtual DOM state rendering.",
    highlight: true
  },
  {
    id: "dev-fastapi",
    name: "FastAPI",
    category: "Development",
    description: "High-throughput asynchronous Python RESTful APIs and microservices.",
    highlight: true
  },
  {
    id: "dev-angular",
    name: "Angular",
    category: "Development",
    description: "Full-fledged enterprise TypeScript framework, dependency injection, and reactive forms.",
    highlight: false
  },
  {
    id: "dev-django",
    name: "Django",
    category: "Development",
    description: "Batteries-included secure web framework with ORM and modular architecture.",
    highlight: false
  },
  {
    id: "dev-streamlit",
    name: "Streamlit",
    category: "Development",
    description: "Rapid prototyping and deployment of data science and interactive AI web applications.",
    highlight: false
  },

  // --- Tools & Platforms ---
  {
    id: "tool-git",
    name: "Git",
    category: "Tools & Platforms",
    description: "Distributed version control, atomic commits, branching, and merge workflows.",
    highlight: true
  },
  {
    id: "tool-github",
    name: "GitHub",
    category: "Tools & Platforms",
    description: "Collaborative code reviews, repository management, GitHub Actions, and releases.",
    highlight: false
  },
  {
    id: "tool-linux",
    name: "Linux",
    category: "Tools & Platforms",
    description: "Command-line environments, bash scripting, file system management, and permissions.",
    highlight: false
  },
  {
    id: "tool-figma",
    name: "Figma",
    category: "Tools & Platforms",
    description: "Interface prototyping, wireframing, component design systems, and UX layouts.",
    highlight: false
  },
  {
    id: "tool-jira",
    name: "Jira",
    category: "Tools & Platforms",
    description: "Issue tracking, agile sprint planning, backlog grooming, and project management.",
    highlight: false
  },
  {
    id: "tool-agile",
    name: "Agile",
    category: "Tools & Platforms",
    description: "Iterative development methodology, scrum ceremonies, standups, and rapid delivery.",
    highlight: false
  },

  // --- Others ---
  {
    id: "other-mysql",
    name: "MySQL",
    category: "Others",
    description: "Structured storage, ACID transactions, relational integrity, and indexing.",
    highlight: false
  },
  {
    id: "other-numpy",
    name: "NumPy",
    category: "Others",
    description: "High-performance N-dimensional array processing and mathematical computations.",
    highlight: false
  },
  {
    id: "other-pandas",
    name: "Pandas",
    category: "Others",
    description: "Data wrangling, dataframe transformations, time series analysis, and ETL pipelines.",
    highlight: false
  }
];
