// Core data types for the portfolio system

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  profileImage: string;
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  gpa?: number;
  honors?: string[];
  relevantCourses?: string[];
}

export interface Skill {
  name: string;
  level: SkillLevel; // 1-5 proficiency scale with type safety
  icon?: string;
  color?: string;
  category?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface ContactMethod {
  type: ContactType;
  value: string;
  icon: string;
  label?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
  availability: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  contact: ContactInfo;
}

// Component prop interfaces
export interface NavigationProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  isMobile?: boolean;
  isScrolled?: boolean;
}

export interface NavigationItem {
  id: SectionId;
  label: string;
  href: string;
  icon?: string;
}

export interface HeroProps {
  name: string;
  title: string;
  summary: string;
  profileImage: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
  animationConfig?: AnimationConfig['hero'];
}

export interface TimelineProps {
  items: TimelineItem[];
  variant: TimelineVariant;
  animationConfig?: TimelineAnimationConfig;
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  startDate: Date;
  endDate: Date | null;
  description: string[];
  achievements?: string[];
  technologies?: string[];
  location?: string;
}

export interface SkillsDisplayProps {
  skillCategories: SkillCategory[];
  animationTrigger: boolean;
  animationConfig?: SkillsAnimationConfig;
}

export interface ProjectShowcaseProps {
  projects: Project[];
  layout: ProjectLayout;
  showFilter?: boolean;
  maxItems?: number;
}

export interface ContactProps {
  contactMethods: ContactMethod[];
  socialLinks: SocialLink[];
  showContactForm: boolean;
}

// Animation configuration types
export interface AnimationConfig {
  fadeIn: {
    duration: number;
    delay: number;
    easing: string;
  };
  skillsScroll: {
    speed: number;
    direction: 'left' | 'right';
    pauseOnHover: boolean;
  };
  timeline: {
    staggerDelay: number;
    slideDistance: number;
  };
  hero: {
    typingSpeed: number;
    typingDelay: number;
  };
  project: {
    hoverScale: number;
    transitionDuration: number;
  };
}

// Additional animation types for specific components
export interface FadeInConfig {
  duration: number;
  delay: number;
  easing: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface SkillsAnimationConfig {
  speed: number;
  direction: 'left' | 'right';
  pauseOnHover: boolean;
  rows: number;
  gap: number;
}

export interface TimelineAnimationConfig {
  staggerDelay: number;
  slideDistance: number;
  fadeThreshold: number;
}

// Utility types for better type safety
export type SectionId = 'hero' | 'experience' | 'projects' | 'education' | 'skills' | 'contact';

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type ContactType = 'email' | 'phone' | 'location';

export type ProjectLayout = 'grid' | 'masonry';

export type TimelineVariant = 'work' | 'education';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export type ScrollDirection = 'left' | 'right';

// Theme and styling types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    section: string;
    component: string;
    element: string;
  };
}

// Responsive breakpoint types
export interface BreakpointConfig {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

// SEO and metadata types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  image: string;
}

// Form and interaction types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormValidationError {
  field: keyof ContactFormData;
  message: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

// Intersection Observer types for animations
export interface IntersectionConfig {
  threshold: number;
  rootMargin: string;
  triggerOnce: boolean;
}

// Performance and optimization types
export interface ImageOptimization {
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  sizes: string;
  priority: boolean;
}

export interface LazyLoadConfig {
  threshold: number;
  rootMargin: string;
  placeholder: string;
}