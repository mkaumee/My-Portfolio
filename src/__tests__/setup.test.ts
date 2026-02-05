/**
 * Basic setup test to verify the testing environment is working correctly
 */

describe('Project Setup', () => {
  it('should have a working test environment', () => {
    expect(true).toBe(true);
  });

  it('should be able to import types', () => {
    const { SKILL_LEVELS } = require('@/utils/constants');
    expect(SKILL_LEVELS.EXPERT).toBe(5);
  });

  it('should handle basic TypeScript features', () => {
    interface TestInterface {
      name: string;
      value: number;
    }

    const testObject: TestInterface = {
      name: 'test',
      value: 42,
    };

    expect(testObject.name).toBe('test');
    expect(testObject.value).toBe(42);
  });
});