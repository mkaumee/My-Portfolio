// Application constants

export const SITE_CONFIG = {
  name: 'Muhammad Kaumi',
  title: 'AI Engineer Portfolio',
  description: 'Personal portfolio showcasing AI engineering projects, work experience, and technical skills.',
  url: 'https://your-domain.com',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'your.email@example.com',
  },
};

export const NAVIGATION_SECTIONS = [
  'hero',
  'experience',
  'projects',
  'education',
  'skills',
  'contact',
] as const;

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

export const SKILL_LEVELS = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  PROFICIENT: 3,
  ADVANCED: 4,
  EXPERT: 5,
} as const;

export const PROJECT_CATEGORIES = [
  'All',
  'AI/ML',
  'Web Development',
  'Mobile',
  'Computer Vision',
  'Data Science',
] as const;

export const CONTACT_METHODS = {
  EMAIL: 'email',
  PHONE: 'phone',
  LOCATION: 'location',
} as const;

export const SOCIAL_PLATFORMS = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
} as const;