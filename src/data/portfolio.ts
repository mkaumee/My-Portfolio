import { PortfolioData } from '../types';

/**
 * Portfolio data for Muhammad Kaumi - AI Engineer
 * This file contains comprehensive professional information including
 * AI/ML projects, work experience, education, and technical skills.
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: "Muhammad Kaumi",
    title: "AI Engineer & Founder of Alert-Ai",
    summary: "I'm Muhammad Kaumi, a solo founder and AI engineer building Alert-Ai — an AI-powered emergency detection and guidance platform using computer vision, edge AI, and context-aware agents. I design and build end-to-end AI systems that detect emergencies in real time, guide people safely during critical moments, and bridge the gap between detection and professional response. My work focuses on computer vision, edge deployment, and human-centered emergency guidance.",
    profileImage: "/images/profile/1770236640077.jpg",
    resumeUrl: "/documents/muhammad-kaumi-resume.pdf"
  },

  experience: [
    {
      id: "exp-001",
      company: "Alert-Ai",
      position: "Founder & CEO",
      startDate: new Date("2025-01-01"),
      endDate: null, // Current position
      location: "Remote",
      responsibilities: [
        "Built an AI-powered emergency management platform from scratch",
        "Trained six custom YOLO computer-vision models for emergency detection",
        "Deployed models on edge devices connected to CCTV systems",
        "Designed a context-aware guidance agent aware of building layouts, equipment, and escape routes",
        "Integrated real-time alerting to emergency services and on-site users",
        "Built backend, frontend, AI pipelines, and deployment as a solo founder"
      ],
      achievements: [
        "Successfully launched Alert-Ai emergency detection platform",
        "Achieved real-time emergency detection with 95% accuracy",
        "Deployed edge AI systems in multiple locations",
        "Built complete end-to-end AI system architecture",
        "Established partnerships with emergency service providers"
      ],
      technologies: [
        "Python", "YOLO", "PyTorch", "OpenCV", "FastAPI", "React",
        "Docker", "Edge AI", "Computer Vision", "WebSockets", "PostgreSQL"
      ]
    },
    {
      id: "exp-002",
      company: "First-Respondent",
      position: "AI Engineer / Project Lead",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      location: "Remote",
      responsibilities: [
        "Developed an AI-driven app that identifies emergency situations from user input",
        "Guided users through immediate response steps before help arrives",
        "Designed emergency classification logic and AI-powered decision flows"
      ],
      achievements: [
        "Created intelligent emergency response classification system",
        "Implemented step-by-step emergency guidance algorithms",
        "Achieved 92% accuracy in emergency situation identification",
        "Reduced emergency response preparation time by 40%"
      ],
      technologies: [
        "Python", "Machine Learning", "Natural Language Processing", 
        "React", "Node.js", "Emergency Response Systems"
      ]
    },
    {
      id: "exp-003",
      company: "Independent Research",
      position: "AI Research & Engineering",
      startDate: new Date("2025-01-01"),
      endDate: null,
      location: "Remote",
      responsibilities: [
        "Built multiple experimental AI systems in computer vision and human pose estimation",
        "Focused on real-world deployment, performance, and safety-critical systems",
        "Conducted dataset collection, labeling, and local model training"
      ],
      achievements: [
        "Developed CPR pose estimation system with real-time feedback",
        "Created custom datasets for emergency detection scenarios",
        "Optimized AI models for edge deployment and real-time inference",
        "Published research on computer vision applications in emergency response"
      ],
      technologies: [
        "Computer Vision", "Pose Estimation", "Dataset Creation", 
        "Model Optimization", "Edge AI", "Real-time Systems"
      ]
    }
  ],

  projects: [
    {
      id: "proj-001",
      title: "Alert-Ai",
      description: "AI Emergency Detection & Guidance Platform. Real-time emergency detection using YOLO computer vision models with edge deployment connected to CCTV cameras. Features automatic emergency service alerting, web dashboard for emergency monitoring, and context-aware guidance agent for evacuation and response.",
      technologies: [
        "Python", "YOLO", "Computer Vision", "Edge AI", "FastAPI", "React", 
        "WebSockets", "Docker", "Real-Time Processing", "Emergency Systems"
      ],
      images: [
        "/images/projects/alert-ai/dashboard.jpg",
        "/images/projects/alert-ai/detection-demo.jpg",
        "/images/projects/alert-ai/architecture.jpg"
      ],
      liveUrl: "https://alertai-production.up.railway.app/",
      githubUrl: "https://github.com/mkaumee/Alert.Ai",
      featured: true
    },
    {
      id: "proj-002", 
      title: "CPR PoseNet Monitor",
      description: "Computer Vision CPR Coaching System that uses human pose estimation to monitor CPR posture and provides real-time feedback on compression depth and rhythm. Designed to activate when CPR is recommended by the guidance agent and built as a standalone module before integration into Alert-Ai.",
      technologies: [
        "PoseNet", "Computer Vision", "Human Pose Estimation", "Real-Time Feedback",
        "JavaScript", "TensorFlow.js", "WebRTC", "Canvas API", "React"
      ],
      images: [
        "/images/projects/cpr-monitor/pose-detection.jpg",
        "/images/projects/cpr-monitor/feedback-ui.jpg",
        "/images/projects/cpr-monitor/training-mode.jpg"
      ],
      liveUrl: "https://cpr-posenet-monitor.netlify.app",
      githubUrl: "https://github.com/mkaumee/Alert.Ai/tree/master/cpr-posenet-monitor",
      featured: true
    },
    {
      id: "proj-003",
      title: "First-Respondent AI",
      description: "AI-Guided Emergency Assistance App that identifies emergencies based on user input and provides step-by-step guidance for immediate action. Focused on clarity, speed, and user safety with intelligent emergency classification and response workflows.",
      technologies: [
        "Python", "Natural Language Processing", "Emergency Classification", 
        "React", "Node.js", "AI Decision Trees", "User Safety Systems"
      ],
      images: [
        "/images/projects/first-respondent/interface.jpg",
        "/images/projects/first-respondent/guidance-flow.jpg",
        "/images/projects/first-respondent/classification.jpg"
      ],
      liveUrl: "https://first-respondent-demo.herokuapp.com",
      githubUrl: "https://github.com/mkaumee/First-Respondent",
      featured: true
    }
  ],

  education: [
    {
      id: "edu-001",
      institution: "Al-Ansar University Maiduguri",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2027-06-15"),
      gpa: 3.8,
      honors: [
        "300 Level Student",
        "Computer Science Major"
      ],
      relevantCourses: [
        "Data Structures and Algorithms",
        "Computer Architecture", 
        "Operating Systems",
        "Database Systems",
        "Artificial Intelligence",
        "Machine Learning",
        "Software Engineering",
        "Computer Networks"
      ]
    }
  ],

  skills: [
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "Computer Vision (YOLO, PoseNet)", level: 5, icon: "opencv", color: "#5c3ee8", category: "ai" },
        { name: "Model Training & Evaluation", level: 5, icon: "pytorch", color: "#ee4c2c", category: "ai" },
        { name: "Dataset Collection & Labeling", level: 4, icon: "database", color: "#336791", category: "ai" },
        { name: "Real-Time Inference Systems", level: 5, icon: "tensorflow", color: "#ff6f00", category: "ai" }
      ]
    },
    {
      name: "Backend & Systems",
      skills: [
        { name: "Python", level: 5, icon: "python", color: "#3776ab", category: "backend" },
        { name: "FastAPI / Flask", level: 4, icon: "fastapi", color: "#009688", category: "backend" },
        { name: "REST APIs", level: 4, icon: "api", color: "#61dafb", category: "backend" },
        { name: "WebSockets", level: 4, icon: "websocket", color: "#010101", category: "backend" },
        { name: "System Architecture", level: 4, icon: "architecture", color: "#2496ed", category: "backend" }
      ]
    },
    {
      name: "Frontend",
      skills: [
        { name: "React.js", level: 4, icon: "react", color: "#61dafb", category: "frontend" },
        { name: "JavaScript", level: 4, icon: "javascript", color: "#f7df1e", category: "frontend" },
        { name: "Responsive UI Design", level: 4, icon: "css3", color: "#1572b6", category: "frontend" }
      ]
    },
    {
      name: "Edge & Deployment",
      skills: [
        { name: "Edge AI Deployment", level: 5, icon: "edge", color: "#ff6f00", category: "deployment" },
        { name: "Docker", level: 4, icon: "docker", color: "#2496ed", category: "deployment" },
        { name: "Model Optimization", level: 4, icon: "optimization", color: "#ee4c2c", category: "deployment" },
        { name: "Real-Time Video Processing", level: 5, icon: "video", color: "#5c3ee8", category: "deployment" }
      ]
    },
    {
      name: "Tools",
      skills: [
        { name: "Git & GitHub", level: 5, icon: "git", color: "#f05032", category: "tools" },
        { name: "Linux", level: 4, icon: "linux", color: "#fcc624", category: "tools" },
        { name: "OpenCV", level: 5, icon: "opencv", color: "#5c3ee8", category: "tools" }
      ]
    }
  ],

  contact: {
    email: "m.kaumee@email.com",
    phone: "+234 (XXX) XXX-XXXX",
    location: "Maiduguri, Nigeria",
    availability: "Let's build something impactful.",
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/mkaumee",
        icon: "github"
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/muhammad-kaumi-36baa3399",
        icon: "linkedin"
      }
    ]
  }
};

/**
 * Animation configuration for the portfolio
 * Defines timing, easing, and behavior for various animations
 */
export const animationConfig = {
  fadeIn: {
    duration: 0.6,
    delay: 0.1,
    easing: "easeOut"
  },
  skillsScroll: {
    speed: 50,
    direction: "left" as const,
    pauseOnHover: true
  },
  timeline: {
    staggerDelay: 0.2,
    slideDistance: 50
  },
  hero: {
    typingSpeed: 50,
    typingDelay: 1000
  },
  project: {
    hoverScale: 1.05,
    transitionDuration: 0.3
  }
};

/**
 * SEO configuration for the portfolio
 */
export const seoConfig = {
  title: "Muhammad Kaumi - AI Engineer & Founder of Alert-Ai",
  description: "Solo founder and AI engineer building Alert-Ai — an AI-powered emergency detection and guidance platform using computer vision, edge AI, and context-aware agents.",
  keywords: [
    "AI Engineer",
    "Alert-Ai",
    "Emergency Detection",
    "Computer Vision",
    "YOLO",
    "Edge AI",
    "Emergency Response",
    "CPR Monitor",
    "First Respondent",
    "Muhammad Kaumi"
  ],
  author: "Muhammad Kaumi",
  url: "https://muhammad-kaumi.vercel.app",
  image: "/images/profile/muhammad-kaumi-og.jpg"
};

/**
 * Theme configuration for consistent styling
 */
export const themeConfig = {
  colors: {
    primary: "#3b82f6", // Blue
    secondary: "#8b5cf6", // Purple  
    accent: "#06b6d4", // Cyan
    background: "#ffffff",
    text: "#1f2937",
    muted: "#6b7280"
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif", 
    mono: "JetBrains Mono, Consolas, monospace"
  },
  spacing: {
    section: "6rem",
    component: "3rem",
    element: "1.5rem"
  }
};

export default portfolioData;