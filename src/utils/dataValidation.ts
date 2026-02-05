import { PortfolioData, WorkExperience, Project, Education, SkillCategory } from '../types';

/**
 * Validation utilities for portfolio data
 * Ensures data integrity and completeness
 */

/**
 * Validates that required personal information fields are present
 */
export function validatePersonalInfo(personal: PortfolioData['personal']): boolean {
  const requiredFields = ['name', 'title', 'summary', 'profileImage'];
  return requiredFields.every(field => {
    const value = personal[field as keyof typeof personal];
    return value && value.toString().trim().length > 0;
  });
}

/**
 * Validates work experience data completeness
 */
export function validateWorkExperience(experience: WorkExperience[]): boolean {
  if (!Array.isArray(experience) || experience.length === 0) {
    return false;
  }

  return experience.every(exp => {
    const requiredFields = ['id', 'company', 'position', 'startDate', 'responsibilities'];
    return requiredFields.every(field => {
      const value = exp[field as keyof WorkExperience];
      if (field === 'responsibilities') {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== undefined && value !== null && value.toString().trim().length > 0;
    });
  });
}

/**
 * Validates project data structure and required fields
 */
export function validateProjects(projects: Project[]): boolean {
  if (!Array.isArray(projects) || projects.length === 0) {
    return false;
  }

  return projects.every(project => {
    const requiredFields = ['id', 'title', 'description', 'technologies'];
    return requiredFields.every(field => {
      const value = project[field as keyof Project];
      if (field === 'technologies') {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== undefined && value !== null && value.toString().trim().length > 0;
    });
  });
}

/**
 * Validates education data structure
 */
export function validateEducation(education: Education[]): boolean {
  if (!Array.isArray(education) || education.length === 0) {
    return false;
  }

  return education.every(edu => {
    const requiredFields = ['id', 'institution', 'degree', 'field', 'startDate', 'endDate'];
    return requiredFields.every(field => {
      const value = edu[field as keyof Education];
      return value !== undefined && value !== null;
    });
  });
}

/**
 * Validates skills data structure and categorization
 */
export function validateSkills(skills: SkillCategory[]): boolean {
  if (!Array.isArray(skills) || skills.length === 0) {
    return false;
  }

  return skills.every(category => {
    if (!category.name || !Array.isArray(category.skills) || category.skills.length === 0) {
      return false;
    }

    return category.skills.every(skill => {
      return skill.name && 
             typeof skill.level === 'number' && 
             skill.level >= 1 && 
             skill.level <= 5;
    });
  });
}

/**
 * Validates contact information completeness
 */
export function validateContactInfo(contact: PortfolioData['contact']): boolean {
  const requiredFields = ['email', 'location', 'socialLinks'];
  
  if (!requiredFields.every(field => contact[field as keyof typeof contact])) {
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact.email)) {
    return false;
  }

  // Validate social links structure
  if (!Array.isArray(contact.socialLinks) || contact.socialLinks.length === 0) {
    return false;
  }

  return contact.socialLinks.every(link => 
    link.platform && link.url && link.icon
  );
}

/**
 * Validates chronological ordering of time-based data
 */
export function validateChronologicalOrder(items: (WorkExperience | Education)[]): boolean {
  if (items.length <= 1) return true;

  for (let i = 0; i < items.length - 1; i++) {
    const currentEndDate = items[i].endDate || new Date();
    const nextEndDate = items[i + 1].endDate || new Date();
    
    // Should be in reverse chronological order (most recent first)
    if (currentEndDate < nextEndDate) {
      return false;
    }
  }
  
  return true;
}

/**
 * Validates that featured projects are properly marked
 */
export function validateFeaturedProjects(projects: Project[]): boolean {
  const featuredProjects = projects.filter(p => p.featured);
  
  // Should have at least one featured project but not more than 5
  return featuredProjects.length >= 1 && featuredProjects.length <= 5;
}

/**
 * Comprehensive validation of entire portfolio data structure
 */
export function validatePortfolioData(data: PortfolioData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!validatePersonalInfo(data.personal)) {
    errors.push('Personal information is incomplete or invalid');
  }

  if (!validateWorkExperience(data.experience)) {
    errors.push('Work experience data is incomplete or invalid');
  }

  if (!validateProjects(data.projects)) {
    errors.push('Projects data is incomplete or invalid');
  }

  if (!validateEducation(data.education)) {
    errors.push('Education data is incomplete or invalid');
  }

  if (!validateSkills(data.skills)) {
    errors.push('Skills data is incomplete or invalid');
  }

  if (!validateContactInfo(data.contact)) {
    errors.push('Contact information is incomplete or invalid');
  }

  if (!validateChronologicalOrder(data.experience)) {
    errors.push('Work experience is not in reverse chronological order');
  }

  if (!validateChronologicalOrder(data.education)) {
    errors.push('Education is not in reverse chronological order');
  }

  if (!validateFeaturedProjects(data.projects)) {
    errors.push('Featured projects configuration is invalid (should have 1-5 featured projects)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Utility function to get data statistics for debugging
 */
export function getDataStatistics(data: PortfolioData) {
  return {
    totalExperience: data.experience.length,
    totalProjects: data.projects.length,
    featuredProjects: data.projects.filter(p => p.featured).length,
    totalEducation: data.education.length,
    totalSkillCategories: data.skills.length,
    totalSkills: data.skills.reduce((sum, category) => sum + category.skills.length, 0),
    socialLinks: data.contact.socialLinks.length,
    hasResume: !!data.personal.resumeUrl,
    hasPhone: !!data.contact.phone
  };
}