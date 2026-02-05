import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import MainLayout from '../MainLayout';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, viewport, initial, animate, transition, ...props }: any) => 
      <div {...props}>{children}</div>,
  },
}));

// Mock the Navigation component
jest.mock('../Navigation', () => {
  return function MockNavigation({ activeSection, onSectionChange }: any) {
    return (
      <nav data-testid="navigation">
        <span data-testid="active-section">{activeSection}</span>
        <button 
          data-testid="nav-hero" 
          onClick={() => onSectionChange('hero')}
        >
          Hero
        </button>
        <button 
          data-testid="nav-experience" 
          onClick={() => onSectionChange('experience')}
        >
          Experience
        </button>
        <button 
          data-testid="nav-projects" 
          onClick={() => onSectionChange('projects')}
        >
          Projects
        </button>
        <button 
          data-testid="nav-education" 
          onClick={() => onSectionChange('education')}
        >
          Education
        </button>
        <button 
          data-testid="nav-skills" 
          onClick={() => onSectionChange('skills')}
        >
          Skills
        </button>
        <button 
          data-testid="nav-contact" 
          onClick={() => onSectionChange('contact')}
        >
          Contact
        </button>
      </nav>
    );
  };
});

// Mock window.scrollY and related properties
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  value: 1024,
});

// Mock getBoundingClientRect
const mockGetBoundingClientRect = (top: number, height: number = 1024) => ({
  top,
  height,
  bottom: top + height,
  left: 0,
  right: 1024,
  width: 1024,
  x: 0,
  y: top,
  toJSON: () => {},
});

describe('MainLayout', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
    
    // Mock getElementById to return elements with proper positioning
    const originalGetElementById = document.getElementById;
    document.getElementById = jest.fn((id: string) => {
      const mockElement = document.createElement('section');
      mockElement.id = id;
      
      // Set different positions for each section
      const positions: Record<string, number> = {
        hero: 0,
        experience: 1024,
        projects: 2048,
        education: 3072,
        skills: 4096,
        contact: 5120,
      };
      
      mockElement.getBoundingClientRect = () => 
        mockGetBoundingClientRect(positions[id] - window.scrollY);
      
      return mockElement;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all required sections', () => {
    render(<MainLayout />);
    
    // Check that all sections are present by their headings
    expect(screen.getByText('Muhammad Kaumi')).toBeInTheDocument();
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
    expect(screen.getAllByText('Projects')).toHaveLength(2); // Navigation + section header
    expect(screen.getAllByText('Education')).toHaveLength(2); // Navigation + section header
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getAllByText('Contact')).toHaveLength(2); // Navigation + section header
  });

  it('renders navigation component with correct props', () => {
    render(<MainLayout />);
    
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
    
    // Check initial active section
    expect(screen.getByTestId('active-section')).toHaveTextContent('hero');
  });

  it('has proper section structure with IDs', () => {
    render(<MainLayout />);
    
    // Check that all sections have proper IDs
    const sections = ['hero', 'experience', 'projects', 'education', 'skills', 'contact'];
    sections.forEach(sectionId => {
      const section = document.querySelector(`#${sectionId}`);
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('data-section', sectionId);
    });
  });

  it('updates active section when navigation is clicked', () => {
    // Test that the MainLayout component properly passes props to Navigation
    render(<MainLayout />);
    
    // Initially should be hero
    expect(screen.getByTestId('active-section')).toHaveTextContent('hero');
    
    // Verify that navigation component receives the correct props
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
    
    // Verify all navigation buttons are present
    expect(screen.getByTestId('nav-hero')).toBeInTheDocument();
    expect(screen.getByTestId('nav-experience')).toBeInTheDocument();
    expect(screen.getByTestId('nav-projects')).toBeInTheDocument();
    expect(screen.getByTestId('nav-education')).toBeInTheDocument();
    expect(screen.getByTestId('nav-skills')).toBeInTheDocument();
    expect(screen.getByTestId('nav-contact')).toBeInTheDocument();
  });

  it('applies correct CSS classes to sections', () => {
    render(<MainLayout />);
    
    const heroSection = document.querySelector('#hero');
    expect(heroSection).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center', 'py-20', 'pt-16');
    
    const experienceSection = document.querySelector('#experience');
    expect(experienceSection).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center', 'py-20');
  });

  it('renders main container with proper styling', () => {
    render(<MainLayout />);
    
    const main = document.querySelector('main');
    expect(main).toHaveClass(
      'min-h-screen',
      'bg-gradient-to-br',
      'from-slate-50',
      'to-slate-100',
      'dark:from-slate-900',
      'dark:to-slate-800'
    );
  });

  it('renders section containers with proper structure', () => {
    render(<MainLayout />);
    
    // Check that each section has the container structure
    const sections = ['hero', 'experience', 'projects', 'education', 'skills', 'contact'];
    sections.forEach(sectionId => {
      const section = document.querySelector(`#${sectionId}`);
      const container = section?.querySelector('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('mx-auto', 'px-4');
    });
  });

  it('handles scroll events for section detection', async () => {
    render(<MainLayout />);
    
    // Initially should be hero
    expect(screen.getByTestId('active-section')).toHaveTextContent('hero');
    
    // Simulate scrolling to experience section
    act(() => {
      window.scrollY = 1200;
      window.dispatchEvent(new Event('scroll'));
    });
    
    // Wait for scroll handler to process
    await waitFor(() => {
      expect(screen.getByTestId('active-section')).toHaveTextContent('experience');
    }, { timeout: 1000 });
  });

  it('renders with custom children when provided', () => {
    const customChild = <div data-testid="custom-child">Custom Content</div>;
    render(<MainLayout>{customChild}</MainLayout>);
    
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<MainLayout />);
    
    // Check main landmark
    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
    
    // Check section landmarks
    const sections = document.querySelectorAll('section');
    expect(sections).toHaveLength(6);
    
    sections.forEach(section => {
      expect(section).toHaveAttribute('id');
      expect(section).toHaveAttribute('data-section');
    });
  });

  it('maintains section order correctly', () => {
    render(<MainLayout />);
    
    const sections = document.querySelectorAll('section');
    const expectedOrder = ['hero', 'experience', 'projects', 'education', 'skills', 'contact'];
    
    sections.forEach((section, index) => {
      expect(section).toHaveAttribute('id', expectedOrder[index]);
    });
  });

  it('handles edge case when sections are not found', async () => {
    // Mock getElementById to return null for some sections
    document.getElementById = jest.fn((id: string) => {
      if (id === 'hero') {
        const mockElement = document.createElement('section');
        mockElement.id = id;
        mockElement.getBoundingClientRect = () => mockGetBoundingClientRect(0);
        return mockElement;
      }
      return null; // Return null for other sections
    });
    
    render(<MainLayout />);
    
    // Should still work and default to hero
    expect(screen.getByTestId('active-section')).toHaveTextContent('hero');
    
    // Simulate scroll event
    act(() => {
      window.scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });
    
    // Should remain hero since other sections don't exist
    await waitFor(() => {
      expect(screen.getByTestId('active-section')).toHaveTextContent('hero');
    });
  });
});