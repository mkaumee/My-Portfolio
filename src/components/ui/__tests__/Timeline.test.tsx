import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TimelineItem } from '@/types';
import Timeline from '../Timeline';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, whileHover, transition, ...props }: any) => 
      <div {...props}>{children}</div>,
    span: ({ children, variants, initial, animate, whileHover, transition, ...props }: any) => 
      <span {...props}>{children}</span>,
  },
  useInView: () => true,
  Variants: {},
}));

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiCalendar: () => <div data-testid="calendar-icon" />,
  FiMapPin: () => <div data-testid="mappin-icon" />,
  FiAward: () => <div data-testid="award-icon" />,
  FiCode: () => <div data-testid="code-icon" />,
  FiExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe('Timeline Component', () => {
  const mockWorkExperience: TimelineItem[] = [
    {
      id: 'exp-001',
      title: 'Senior AI Engineer',
      organization: 'AI Solutions Lab',
      startDate: new Date('2023-01-15'),
      endDate: null, // Current position
      location: 'Remote',
      description: [
        'Lead development of computer vision systems',
        'Design and implement deep learning models',
      ],
      achievements: [
        'Developed Alert-AI system that improved response time by 40%',
        'Built CPR monitoring system with 95% accuracy',
      ],
      technologies: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV'],
    },
    {
      id: 'exp-002',
      title: 'Machine Learning Engineer',
      organization: 'TechVision Innovations',
      startDate: new Date('2021-06-01'),
      endDate: new Date('2022-12-31'),
      location: 'San Francisco, CA',
      description: [
        'Developed computer vision models for real-time detection',
        'Implemented data pipelines for ML workflows',
      ],
      achievements: [
        'Created emergency detection system with 92% accuracy',
        'Improved object detection models by 25%',
      ],
      technologies: ['Python', 'Scikit-learn', 'OpenCV', 'Flask'],
    },
  ];

  const mockEducation: TimelineItem[] = [
    {
      id: 'edu-001',
      title: 'Master of Science',
      organization: 'Stanford University',
      startDate: new Date('2018-09-01'),
      endDate: new Date('2020-06-15'),
      location: 'Stanford, CA',
      description: ['Artificial Intelligence specialization'],
      achievements: [
        "Dean's List (4 semesters)",
        'Outstanding Graduate Student Award',
      ],
      technologies: ['Machine Learning', 'Computer Vision', 'Deep Learning'],
    },
  ];

  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders timeline with work experience items', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      expect(screen.getByRole('region', { name: /work experience timeline/i })).toBeInTheDocument();
      expect(screen.getByText('Senior AI Engineer')).toBeInTheDocument();
      expect(screen.getByText('AI Solutions Lab')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning Engineer')).toBeInTheDocument();
      expect(screen.getByText('TechVision Innovations')).toBeInTheDocument();
    });

    it('renders timeline with education items', () => {
      render(<Timeline items={mockEducation} variant="education" />);
      
      expect(screen.getByRole('region', { name: /education timeline/i })).toBeInTheDocument();
      expect(screen.getByText('Master of Science')).toBeInTheDocument();
      expect(screen.getByText('Stanford University')).toBeInTheDocument();
    });

    it('renders empty timeline when no items provided', () => {
      render(<Timeline items={[]} variant="work" />);
      
      expect(screen.getByRole('region', { name: /work experience timeline/i })).toBeInTheDocument();
      // Should not crash and should render the container
    });
  });

  describe('Chronological Ordering', () => {
    it('displays items in reverse chronological order (most recent first)', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      const timelineItems = screen.getAllByRole('heading', { level: 3 });
      
      // First item should be the most recent (Senior AI Engineer - current position)
      expect(timelineItems[0]).toHaveTextContent('Senior AI Engineer');
      // Second item should be older (Machine Learning Engineer - ended 2022)
      expect(timelineItems[1]).toHaveTextContent('Machine Learning Engineer');
    });

    it('handles mixed current and past positions correctly', () => {
      const mixedItems: TimelineItem[] = [
        {
          id: 'exp-old',
          title: 'Junior Developer',
          organization: 'Old Company',
          startDate: new Date('2020-01-01'),
          endDate: new Date('2021-01-01'),
          description: [],
        },
        {
          id: 'exp-current',
          title: 'Senior Developer',
          organization: 'Current Company',
          startDate: new Date('2023-01-01'),
          endDate: null, // Current
          description: [],
        },
        {
          id: 'exp-middle',
          title: 'Mid-level Developer',
          organization: 'Middle Company',
          startDate: new Date('2021-06-01'),
          endDate: new Date('2022-12-31'),
          description: [],
        },
      ];

      render(<Timeline items={mixedItems} variant="work" />);
      
      const timelineItems = screen.getAllByRole('heading', { level: 3 });
      
      // Should be ordered: Current (2023-present), Middle (2022), Old (2021)
      expect(timelineItems[0]).toHaveTextContent('Senior Developer');
      expect(timelineItems[1]).toHaveTextContent('Mid-level Developer');
      expect(timelineItems[2]).toHaveTextContent('Junior Developer');
    });
  });

  describe('Date Formatting', () => {
    it('displays current position with "Present" end date', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Should show "Jan 2023 - Present" for current position
      expect(screen.getByText(/Jan 2023 - Present/)).toBeInTheDocument();
    });

    it('displays completed position with end date', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Should show both start and end dates for completed position
      expect(screen.getByText(/Jun 2021 - Dec 2022/)).toBeInTheDocument();
    });

    it('calculates and displays duration correctly', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Should calculate duration for completed position (Jun 2021 - Dec 2022 = 1 year, 6 months)
      expect(screen.getByText(/1 year, 6 months/)).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('displays all required information fields', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Check for job title, company, location
      expect(screen.getByText('Senior AI Engineer')).toBeInTheDocument();
      expect(screen.getByText('AI Solutions Lab')).toBeInTheDocument();
      expect(screen.getByText('Remote')).toBeInTheDocument();
      
      // Check for responsibilities
      expect(screen.getByText('Lead development of computer vision systems')).toBeInTheDocument();
      expect(screen.getByText('Design and implement deep learning models')).toBeInTheDocument();
    });

    it('displays achievements when provided', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      expect(screen.getByText('Key Achievements')).toBeInTheDocument();
      expect(screen.getByText('Developed Alert-AI system that improved response time by 40%')).toBeInTheDocument();
      expect(screen.getByText('Built CPR monitoring system with 95% accuracy')).toBeInTheDocument();
    });

    it('displays technologies when provided', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      expect(screen.getByText('Technologies Used')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('PyTorch')).toBeInTheDocument();
      expect(screen.getByText('TensorFlow')).toBeInTheDocument();
      expect(screen.getByText('OpenCV')).toBeInTheDocument();
    });

    it('handles missing optional fields gracefully', () => {
      const minimalItem: TimelineItem[] = [
        {
          id: 'minimal',
          title: 'Basic Position',
          organization: 'Basic Company',
          startDate: new Date('2023-01-01'),
          endDate: null,
          description: ['Basic description'],
          // No achievements, technologies, or location
        },
      ];

      render(<Timeline items={minimalItem} variant="work" />);
      
      expect(screen.getByText('Basic Position')).toBeInTheDocument();
      expect(screen.getByText('Basic Company')).toBeInTheDocument();
      expect(screen.getByText('Basic description')).toBeInTheDocument();
      
      // Should not show sections for missing data
      expect(screen.queryByText('Key Achievements')).not.toBeInTheDocument();
      expect(screen.queryByText('Technologies Used')).not.toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('includes responsive classes for mobile and desktop layouts', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Check for responsive classes in the timeline structure
      const timelineContainer = screen.getByRole('region');
      expect(timelineContainer).toHaveClass('max-w-6xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });

    it('renders timeline lines for both mobile and desktop', () => {
      const { container } = render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Should have both mobile and desktop timeline lines
      const timelineLines = container.querySelectorAll('.bg-gradient-to-b');
      expect(timelineLines).toHaveLength(2); // One for mobile, one for desktop
    });
  });

  describe('Accessibility', () => {
    it('includes proper ARIA labels', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      expect(screen.getByRole('region', { name: /work experience timeline/i })).toBeInTheDocument();
    });

    it('uses semantic HTML structure', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Should use proper heading hierarchy
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2); // Job titles
      expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(2); // Company names
      expect(screen.getAllByRole('heading', { level: 5 })).toHaveLength(6); // Section headers
    });

    it('includes descriptive text for screen readers', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Icons should have accessible alternatives through the mocked components
      expect(screen.getAllByTestId('calendar-icon')).toHaveLength(2);
      expect(screen.getAllByTestId('mappin-icon')).toHaveLength(2);
      expect(screen.getAllByTestId('award-icon')).toHaveLength(2);
      expect(screen.getAllByTestId('code-icon')).toHaveLength(2);
    });
  });

  describe('Animation Configuration', () => {
    it('accepts custom animation configuration', () => {
      const customConfig = {
        staggerDelay: 0.5,
        slideDistance: 100,
        fadeThreshold: 0.2,
      };

      render(
        <Timeline 
          items={mockWorkExperience} 
          variant="work" 
          animationConfig={customConfig}
        />
      );
      
      // Component should render without errors with custom config
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('uses default animation configuration when not provided', () => {
      render(<Timeline items={mockWorkExperience} variant="work" />);
      
      // Should render successfully with default configuration
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles items with same dates correctly', () => {
      const sameDateItems: TimelineItem[] = [
        {
          id: 'item1',
          title: 'Position A',
          organization: 'Company A',
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-12-31'),
          description: [],
        },
        {
          id: 'item2',
          title: 'Position B',
          organization: 'Company B',
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-12-31'),
          description: [],
        },
      ];

      render(<Timeline items={sameDateItems} variant="work" />);
      
      expect(screen.getByText('Position A')).toBeInTheDocument();
      expect(screen.getByText('Position B')).toBeInTheDocument();
    });

    it('handles very short durations correctly', () => {
      const shortDurationItem: TimelineItem[] = [
        {
          id: 'short',
          title: 'Short Position',
          organization: 'Company',
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-01-31'), // Exactly 1 month
          description: [],
        },
      ];

      render(<Timeline items={shortDurationItem} variant="work" />);
      
      // Should show "1 month" for short duration
      expect(screen.getByText(/1 month/)).toBeInTheDocument();
    });

    it('handles very long durations correctly', () => {
      const longDurationItem: TimelineItem[] = [
        {
          id: 'long',
          title: 'Long Position',
          organization: 'Company',
          startDate: new Date('2020-01-01'),
          endDate: new Date('2025-01-01'),
          description: [],
        },
      ];

      render(<Timeline items={longDurationItem} variant="work" />);
      
      // Should show years for long duration
      expect(screen.getByText(/5 years/)).toBeInTheDocument();
    });
  });
});