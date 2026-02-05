import { portfolioData } from '../data/portfolio';
import { 
  validatePortfolioData, 
  validatePersonalInfo,
  validateWorkExperience,
  validateProjects,
  validateEducation,
  validateSkills,
  validateContactInfo,
  validateChronologicalOrder,
  validateFeaturedProjects,
  getDataStatistics
} from '../utils/dataValidation';

describe('Portfolio Data Validation', () => {
  describe('Personal Information', () => {
    it('should have all required personal information fields', () => {
      expect(validatePersonalInfo(portfolioData.personal)).toBe(true);
    });

    it('should have name, title, and summary', () => {
      expect(portfolioData.personal.name).toBeTruthy();
      expect(portfolioData.personal.title).toBeTruthy();
      expect(portfolioData.personal.summary).toBeTruthy();
      expect(portfolioData.personal.profileImage).toBeTruthy();
    });

    it('should have Muhammad Kaumi as the name', () => {
      expect(portfolioData.personal.name).toBe('Muhammad Kaumi');
    });

    it('should have AI-related title', () => {
      expect(portfolioData.personal.title.toLowerCase()).toContain('ai');
    });
  });

  describe('Work Experience', () => {
    it('should have valid work experience data', () => {
      expect(validateWorkExperience(portfolioData.experience)).toBe(true);
    });

    it('should have at least one work experience entry', () => {
      expect(portfolioData.experience.length).toBeGreaterThan(0);
    });

    it('should be in reverse chronological order', () => {
      expect(validateChronologicalOrder(portfolioData.experience)).toBe(true);
    });

    it('should have current position with null endDate', () => {
      const currentPosition = portfolioData.experience.find(exp => exp.endDate === null);
      expect(currentPosition).toBeDefined();
    });

    it('should have responsibilities and achievements for each position', () => {
      portfolioData.experience.forEach(exp => {
        expect(exp.responsibilities.length).toBeGreaterThan(0);
        expect(exp.achievements.length).toBeGreaterThan(0);
        expect(exp.technologies.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Projects', () => {
    it('should have valid projects data', () => {
      expect(validateProjects(portfolioData.projects)).toBe(true);
    });

    it('should include Alert-AI project', () => {
      const alertAi = portfolioData.projects.find(p => 
        p.title.toLowerCase().includes('alert-ai') || 
        p.title.toLowerCase().includes('alert ai')
      );
      expect(alertAi).toBeDefined();
      expect(alertAi?.featured).toBe(true);
    });

    it('should include CPR PoseNet Monitor project', () => {
      const cprMonitor = portfolioData.projects.find(p => 
        p.title.toLowerCase().includes('cpr') && 
        p.title.toLowerCase().includes('posenet')
      );
      expect(cprMonitor).toBeDefined();
      expect(cprMonitor?.featured).toBe(true);
    });

    it('should include First-Respondent project', () => {
      const firstRespondent = portfolioData.projects.find(p => 
        p.title.toLowerCase().includes('first-respondent') ||
        p.title.toLowerCase().includes('first respondent')
      );
      expect(firstRespondent).toBeDefined();
      expect(firstRespondent?.featured).toBe(true);
    });

    it('should have valid featured projects configuration', () => {
      expect(validateFeaturedProjects(portfolioData.projects)).toBe(true);
    });

    it('should have technologies listed for each project', () => {
      portfolioData.projects.forEach(project => {
        expect(project.technologies.length).toBeGreaterThan(0);
      });
    });

    it('should have descriptions for all projects', () => {
      portfolioData.projects.forEach(project => {
        expect(project.description).toBeTruthy();
        expect(project.description.length).toBeGreaterThan(50);
      });
    });
  });

  describe('Education', () => {
    it('should have valid education data', () => {
      expect(validateEducation(portfolioData.education)).toBe(true);
    });

    it('should have at least one education entry', () => {
      expect(portfolioData.education.length).toBeGreaterThan(0);
    });

    it('should be in reverse chronological order', () => {
      expect(validateChronologicalOrder(portfolioData.education)).toBe(true);
    });

    it('should have degree and field information', () => {
      portfolioData.education.forEach(edu => {
        expect(edu.degree).toBeTruthy();
        expect(edu.field).toBeTruthy();
        expect(edu.institution).toBeTruthy();
      });
    });
  });

  describe('Skills', () => {
    it('should have valid skills data', () => {
      expect(validateSkills(portfolioData.skills)).toBe(true);
    });

    it('should have multiple skill categories', () => {
      expect(portfolioData.skills.length).toBeGreaterThan(0);
    });

    it('should have AI/ML related skills', () => {
      const aiCategory = portfolioData.skills.find(cat => 
        cat.name.toLowerCase().includes('ai') || 
        cat.name.toLowerCase().includes('ml') ||
        cat.name.toLowerCase().includes('machine learning')
      );
      expect(aiCategory).toBeDefined();
    });

    it('should have programming languages category', () => {
      const langCategory = portfolioData.skills.find(cat => 
        cat.name.toLowerCase().includes('programming') ||
        cat.name.toLowerCase().includes('language')
      );
      expect(langCategory).toBeDefined();
    });

    it('should have Python as a skill', () => {
      const pythonSkill = portfolioData.skills
        .flatMap(cat => cat.skills)
        .find(skill => skill.name.toLowerCase() === 'python');
      expect(pythonSkill).toBeDefined();
      expect(pythonSkill?.level).toBeGreaterThanOrEqual(4);
    });

    it('should have valid skill levels (1-5)', () => {
      portfolioData.skills.forEach(category => {
        category.skills.forEach(skill => {
          expect(skill.level).toBeGreaterThanOrEqual(1);
          expect(skill.level).toBeLessThanOrEqual(5);
        });
      });
    });
  });

  describe('Contact Information', () => {
    it('should have valid contact information', () => {
      expect(validateContactInfo(portfolioData.contact)).toBe(true);
    });

    it('should have email address', () => {
      expect(portfolioData.contact.email).toBeTruthy();
      expect(portfolioData.contact.email).toContain('@');
    });

    it('should have location', () => {
      expect(portfolioData.contact.location).toBeTruthy();
    });

    it('should have social links', () => {
      expect(portfolioData.contact.socialLinks.length).toBeGreaterThan(0);
    });

    it('should have GitHub link', () => {
      const github = portfolioData.contact.socialLinks.find(link => 
        link.platform.toLowerCase() === 'github'
      );
      expect(github).toBeDefined();
      expect(github?.url).toContain('github.com');
    });

    it('should have LinkedIn link', () => {
      const linkedin = portfolioData.contact.socialLinks.find(link => 
        link.platform.toLowerCase() === 'linkedin'
      );
      expect(linkedin).toBeDefined();
      expect(linkedin?.url).toContain('linkedin.com');
    });
  });

  describe('Comprehensive Validation', () => {
    it('should pass comprehensive validation', () => {
      const validation = validatePortfolioData(portfolioData);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should have reasonable data statistics', () => {
      const stats = getDataStatistics(portfolioData);
      
      expect(stats.totalExperience).toBeGreaterThan(0);
      expect(stats.totalProjects).toBeGreaterThanOrEqual(3);
      expect(stats.featuredProjects).toBeGreaterThanOrEqual(3);
      expect(stats.totalEducation).toBeGreaterThan(0);
      expect(stats.totalSkillCategories).toBeGreaterThan(0);
      expect(stats.totalSkills).toBeGreaterThan(10);
      expect(stats.socialLinks).toBeGreaterThan(0);
    });
  });

  describe('Requirements Validation', () => {
    it('validates Requirement 1.1: Personal introduction section data', () => {
      expect(portfolioData.personal.name).toBeTruthy();
      expect(portfolioData.personal.title).toBeTruthy();
      expect(portfolioData.personal.summary).toBeTruthy();
      expect(portfolioData.personal.profileImage).toBeTruthy();
    });

    it('validates Requirement 3.1: Work experience in reverse chronological order', () => {
      expect(validateChronologicalOrder(portfolioData.experience)).toBe(true);
      expect(portfolioData.experience.length).toBeGreaterThan(0);
    });

    it('validates Requirement 4.1: Projects with descriptions and technologies', () => {
      portfolioData.projects.forEach(project => {
        expect(project.description).toBeTruthy();
        expect(project.technologies.length).toBeGreaterThan(0);
      });
    });

    it('validates Requirement 5.1: Education background data', () => {
      expect(portfolioData.education.length).toBeGreaterThan(0);
      portfolioData.education.forEach(edu => {
        expect(edu.institution).toBeTruthy();
        expect(edu.degree).toBeTruthy();
        expect(edu.field).toBeTruthy();
      });
    });

    it('validates Requirement 6.2: Skills categorized by type', () => {
      expect(portfolioData.skills.length).toBeGreaterThan(0);
      portfolioData.skills.forEach(category => {
        expect(category.name).toBeTruthy();
        expect(category.skills.length).toBeGreaterThan(0);
      });
    });
  });
});
