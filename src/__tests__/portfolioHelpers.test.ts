import {
  getFeaturedProjects,
  getProjectsByTechnology,
  getCurrentPosition,
  getTotalExperienceYears,
  getSkillsByCategory,
  getExpertSkills,
  getSocialLink,
  formatDate,
  formatDateRange,
  searchProjects,
  getPortfolioSummary
} from '../utils/portfolioHelpers';

describe('Portfolio Helper Functions', () => {
  describe('Project Helpers', () => {
    it('should get featured projects', () => {
      const featured = getFeaturedProjects();
      expect(featured.length).toBeGreaterThan(0);
      expect(featured.every(p => p.featured)).toBe(true);
    });

    it('should find projects by technology', () => {
      const pythonProjects = getProjectsByTechnology('Python');
      expect(pythonProjects.length).toBeGreaterThan(0);
      
      const reactProjects = getProjectsByTechnology('React');
      expect(reactProjects.length).toBeGreaterThan(0);
    });

    it('should search projects by keyword', () => {
      const aiProjects = searchProjects('AI');
      expect(aiProjects.length).toBeGreaterThan(0);
      
      const emergencyProjects = searchProjects('emergency');
      expect(emergencyProjects.length).toBeGreaterThan(0);
    });
  });

  describe('Experience Helpers', () => {
    it('should get current position', () => {
      const current = getCurrentPosition();
      expect(current).toBeDefined();
      expect(current?.endDate).toBeNull();
    });

    it('should calculate total experience years', () => {
      const totalYears = getTotalExperienceYears();
      expect(totalYears).toBeGreaterThan(0);
      expect(typeof totalYears).toBe('number');
    });
  });

  describe('Skills Helpers', () => {
    it('should get skills by category', () => {
      const programmingSkills = getSkillsByCategory('Programming');
      expect(programmingSkills).toBeDefined();
      expect(programmingSkills?.skills.length).toBeGreaterThan(0);
    });

    it('should get expert level skills', () => {
      const expertSkills = getExpertSkills();
      expect(expertSkills.length).toBeGreaterThan(0);
      expect(expertSkills.every(skill => skill.level === 5)).toBe(true);
    });
  });

  describe('Contact Helpers', () => {
    it('should get social link by platform', () => {
      const github = getSocialLink('GitHub');
      expect(github).toBeDefined();
      expect(github?.url).toContain('github.com');

      const linkedin = getSocialLink('LinkedIn');
      expect(linkedin).toBeDefined();
      expect(linkedin?.url).toContain('linkedin.com');
    });
  });

  describe('Date Formatting', () => {
    it('should format dates correctly', () => {
      const testDate = new Date('2023-01-15');
      const formatted = formatDate(testDate);
      expect(formatted).toContain('January');
      expect(formatted).toContain('2023');
    });

    it('should format date ranges correctly', () => {
      const startDate = new Date('2023-01-15');
      const endDate = new Date('2023-12-31');
      const range = formatDateRange(startDate, endDate);
      expect(range).toContain('January 2023');
      expect(range).toContain('December 2023');

      const currentRange = formatDateRange(startDate, null);
      expect(currentRange).toContain('Present');
    });
  });

  describe('Portfolio Summary', () => {
    it('should generate comprehensive portfolio summary', () => {
      const summary = getPortfolioSummary();
      
      expect(summary.name).toBe('Muhammad Kaumi');
      expect(summary.title).toContain('AI');
      expect(summary.totalExperience).toBeGreaterThan(0);
      expect(summary.totalProjects).toBeGreaterThan(0);
      expect(summary.featuredProjects).toBeGreaterThan(0);
      expect(summary.expertSkills).toBeGreaterThan(0);
      expect(summary.totalSkills).toBeGreaterThan(0);
      expect(summary.education).toBeGreaterThan(0);
      expect(summary.socialPresence).toBeGreaterThan(0);
      expect(summary.currentPosition).toBeTruthy();
      expect(summary.currentCompany).toBeTruthy();
    });
  });

  describe('Data Integrity', () => {
    it('should have consistent data across helper functions', () => {
      const featured = getFeaturedProjects();
      const summary = getPortfolioSummary();
      
      expect(featured.length).toBe(summary.featuredProjects);
    });

    it('should handle edge cases gracefully', () => {
      const nonExistentTech = getProjectsByTechnology('NonExistentTechnology');
      expect(nonExistentTech).toEqual([]);

      const nonExistentCategory = getSkillsByCategory('NonExistentCategory');
      expect(nonExistentCategory).toBeNull();

      const nonExistentPlatform = getSocialLink('NonExistentPlatform');
      expect(nonExistentPlatform).toBeUndefined();
    });
  });
});