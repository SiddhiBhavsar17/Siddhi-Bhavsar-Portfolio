=============================================================================
PROJECT ASSETS & OPTIONAL MEDIA DIRECTORY (/public/assets/projects/)
=============================================================================

CURRENT PRIMARY VISUALS (Working in production):
- Journey Bhai:             journey-bhai.png
- NovaSentinel:             novasentinel-concept.png
- Sign Language Translator: sign-language-concept.png
- Constellation Explorer:   constellation-concept.png

OPTIONAL ADDITIONAL MEDIA SUBFOLDERS:
- public/assets/projects/journey-bhai/
- public/assets/projects/novasentinel/
- public/assets/projects/sign-language/
- public/assets/projects/constellation/

Supported formats: PNG, JPG, JPEG, WEBP, GIF, SVG, MP4, WebM
Supported media types:
- Screenshots
- Architecture / system diagrams
- Workflow diagrams
- Video / demo walkthroughs

HOW TO CONNECT ADDITIONAL MEDIA:
In src/data/projects.ts, append items to the project's mediaGallery array:
{
  id: "jb-arch-diagram",
  type: "image", // or "video"
  title: "System Architecture",
  url: "/assets/projects/journey-bhai/architecture.png",
  caption: "End-to-end FastAPI and React Native architecture flow."
}
=============================================================================
