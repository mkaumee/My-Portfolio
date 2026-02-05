import { portfolioData } from '../data/portfolio';
import { Project, WorkExperience, SkillCategory } from '../types';

/**
 * Helper functions for working with portfolio data
 * Provides convenient access to filtered and processed data
 */

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return portfolioData.projects.filter(project => project.featured);
}

/**
 * Get projects by technology
 */
export function getProjectsByTechnology(technology: string): Project[] {
  return portfolioData.projects.filter(project =>
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}

/**
 * Get current work position
 */
export function getCurrentPosition(): WorkExperience | null {
  return portfolioData.experience.find(exp => exp.endDate === null) || null;
}

/**
 * Get work experience duration in months
 */
export function getExperienceDuration(experience: WorkExperience): number {
  const startDate = new Date(experience.startDate);
  const endDate = experience.endDate ? new Date(experience.endDate) : new Date();
  
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
  
  return diffMonths;
}

/**
 * Get total years of experience
 */
export function getTotalExperienceYears(): number {
  const totalMonths = portfolioData.experience.reduce((total, exp) => {
    return total + getExperienceDuration(exp);
  }, 0);
  
  return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal place
}

/**
 * Get skills by category name
 */
export function getSkillsByCategory(categoryName: string): SkillCategory | null {
  return portfolioData.skills.find(category => 
    category.name.toLowerCase().includes(categoryName.toLowerCase())
  ) || null;
}

/**
 * Get all skills flattened with their categories
 */
export function getAllSkillsFlattened() {
  return portfolioData.skills.flatMap(category =>
    category.skills.map(skill => ({
      ...skill,
      categoryName: category.name
    }))
  );
}

/**
 * Get skills by proficiency level
 */
export function getSkillsByLevel(level: number) {
  return getAllSkillsFlattened().filter(skill => skill.level === level);
}

/**
 * Get expert level skills (level 5)
 */
export function getExpertSkills() {
  return getSkillsByLevel(5);
}

/**
 * Get social link by platform
 */
export function getSocialLink(platform: string) {
  return portfolioData.contact.socialLinks.find(link =>
    link.platform.toLowerCase() === platform.toLowerCase()
  );
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
}

/**
 * Format date range for experience/education
 */
export function formatDateRange(startDate: Date, endDate: Date | null): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
}

/**
 * Get projects with GitHub links
 */
export function getProjectsWithGitHub(): Project[] {
  return portfolioData.projects.filter(project => project.githubUrl);
}

/**
 * Get projects with live demos
 */
export function getProjectsWithLiveDemo(): Project[] {
  return portfolioData.projects.filter(project => project.liveUrl);
}

/**
 * Search projects by keyword
 */
export function searchProjects(keyword: string): Project[] {
  const searchTerm = keyword.toLowerCase();
  
  return portfolioData.projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get education by degree level
 */
export function getEducationByDegree(degreeType: 'Bachelor' | 'Master' | 'PhD') {
  return portfolioData.education.filter(edu =>
    edu.degree.toLowerCase().includes(degreeType.toLowerCase())
  );
}

/**
 * Get most recent education
 */
export function getMostRecentEducation() {
  return portfolioData.education[0]; // Already sorted in reverse chronological order
}

/**
 * Calculate age from education dates (approximate)
 */
export function getApproximateAge(): number {
  const bachelorStart = portfolioData.education.find(edu => 
    edu.degree.toLowerCase().includes('bachelor')
  );
  
  if (bachelorStart) {
    const startYear = new Date(bachelorStart.startDate).getFullYear();
    const currentYear = new Date().getFullYear();
    // Assuming typical college start age of 18
    return currentYear - startYear + 18;
  }
  
  return 0; // Unable to calculate
}

/**
 * Get summary statistics for the portfolio
 */
export function getPortfolioSummary() {
  return {
    name: portfolioData.personal.name,
    title: portfolioData.personal.title,
    totalExperience: getTotalExperienceYears(),
    totalProjects: portfolioData.projects.length,
    featuredProjects: getFeaturedProjects().length,
    expertSkills: getExpertSkills().length,
    totalSkills: getAllSkillsFlattened().length,
    education: portfolioData.education.length,
    socialPresence: portfolioData.contact.socialLinks.length,
    currentPosition: getCurrentPosition()?.position || 'Not specified',
    currentCompany: getCurrentPosition()?.company || 'Not specified'
  };
}