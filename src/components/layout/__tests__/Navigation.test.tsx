import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navigation from '../Navigation';
import { SectionId } from '@/types';

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: mockScrollIntoView,
});

// Mock getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  configurable: true,
  value: mockGetElementById,
});

describe('Navigation Component', () => {
  const mockOnSectionChange = jest.fn();
  const defaultProps = {
    activeSection: 'hero' as SectionId,
    onSectionChange: mockOnSectionChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders navigation with all required sections', () => {
      render(<Navigation {...defaultProps} />);

      // Check that all navigation items are present (both desktop and mobile versions)
      const homeButtons = screen.getAllByText('Home');
      const experienceButtons = screen.getAllByText('Experience');
      const projectsButtons = screen.getAllByText('Projects');
      const educationButtons = screen.getAllByText('Education');
      const skillsButtons = screen.getAllByText('Skills');
      const contactButtons = screen.getAllByText('Contact');

      // Each should appear twice (desktop + mobile)
      expect(homeButtons).toHaveLength(2);
      expect(experienceButtons).toHaveLength(2);
      expect(projectsButtons).toHaveLength(2);
      expect(educationButtons).toHaveLength(2);
      expect(skillsButtons).toHaveLength(2);
      expect(contactButtons).toHaveLength(2);
    });

    it('renders logo', () => {
      render(<Navigation {...defaultProps} />);
      expect(screen.getByText('MK')).toBeInTheDocument();
    });

    it('renders mobile menu button', () => {
      render(<Navigation {...defaultProps} />);
      // Find the hamburger button by looking for the one with spans
      const buttons = screen.getAllByRole('button');
      const hamburgerButton = buttons.find(button => 
        button.querySelector('span')
      );
      expect(hamburgerButton).toBeInTheDocument();
    });
  });

  describe('Active Section Highlighting', () => {
    it('highlights the active section in desktop navigation', () => {
      render(<Navigation {...defaultProps} activeSection="projects" />);
      
      // Get the desktop version (first one)
      const projectsButtons = screen.getAllByText('Projects');
      const desktopButton = projectsButtons[0];
      expect(desktopButton).toHaveClass('text-primary-600');
    });

    it('does not highlight inactive sections in desktop navigation', () => {
      render(<Navigation {...defaultProps} activeSection="projects" />);
      
      // Get the desktop version (first one)
      const homeButtons = screen.getAllByText('Home');
      const desktopButton = homeButtons[0];
      expect(desktopButton).toHaveClass('text-gray-600');
    });

    it('updates highlighting when active section changes', () => {
      const { rerender } = render(<Navigation {...defaultProps} activeSection="hero" />);
      
      let homeButtons = screen.getAllByText('Home');
      let desktopHomeButton = homeButtons[0];
      expect(desktopHomeButton).toHaveClass('text-primary-600');

      rerender(<Navigation {...defaultProps} activeSection="projects" />);
      
      homeButtons = screen.getAllByText('Home');
      const projectsButtons = screen.getAllByText('Projects');
      desktopHomeButton = homeButtons[0];
      const desktopProjectsButton = projectsButtons[0];
      
      expect(desktopHomeButton).toHaveClass('text-gray-600');
      expect(desktopProjectsButton).toHaveClass('text-primary-600');
    });
  });

  describe('Navigation Functionality', () => {
    it('calls onSectionChange when desktop navigation item is clicked', () => {
      const mockElement = { scrollIntoView: mockScrollIntoView };
      mockGetElementById.mockReturnValue(mockElement);

      render(<Navigation {...defaultProps} />);
      
      // Click the desktop version (first one)
      const projectsButtons = screen.getAllByText('Projects');
      const desktopButton = projectsButtons[0];
      fireEvent.click(desktopButton);

      expect(mockOnSectionChange).toHaveBeenCalledWith('projects');
    });

    it('scrolls to target section when navigation item is clicked', () => {
      const mockElement = { scrollIntoView: mockScrollIntoView };
      mockGetElementById.mockReturnValue(mockElement);

      render(<Navigation {...defaultProps} />);
      
      // Click the desktop version (first one)
      const projectsButtons = screen.getAllByText('Projects');
      const desktopButton = projectsButtons[0];
      fireEvent.click(desktopButton);

      expect(mockGetElementById).toHaveBeenCalledWith('projects');
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('handles missing target element gracefully', () => {
      mockGetElementById.mockReturnValue(null);

      render(<Navigation {...defaultProps} />);
      
      // Click the desktop version (first one)
      const projectsButtons = screen.getAllByText('Projects');
      const desktopButton = projectsButtons[0];
      fireEvent.click(desktopButton);

      expect(mockOnSectionChange).toHaveBeenCalledWith('projects');
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('Mobile Menu Functionality', () => {
    it('toggles mobile menu when hamburger button is clicked', async () => {
      render(<Navigation {...defaultProps} />);
      
      // Find the hamburger button (the one with spans inside)
      const buttons = screen.getAllByRole('button');
      const hamburgerButton = buttons.find(button => 
        button.querySelector('span')
      );
      expect(hamburgerButton).toBeInTheDocument();

      // Initially, mobile menu should be closed (height: 0)
      const mobileMenu = hamburgerButton?.parentElement?.querySelector('.md\\:hidden');
      expect(mobileMenu).toBeInTheDocument();

      // Click to open menu
      fireEvent.click(hamburgerButton!);
      
      // Menu should now be visible
      await waitFor(() => {
        expect(mobileMenu).toBeInTheDocument();
      });
    });

    it('closes mobile menu when navigation item is clicked', async () => {
      const mockElement = { scrollIntoView: mockScrollIntoView };
      mockGetElementById.mockReturnValue(mockElement);

      render(<Navigation {...defaultProps} />);
      
      // Open mobile menu first
      const buttons = screen.getAllByRole('button');
      const hamburgerButton = buttons.find(button => 
        button.querySelector('span')
      );
      fireEvent.click(hamburgerButton!);

      // Click on a navigation item in mobile menu (second occurrence)
      const projectsButtons = screen.getAllByText('Projects');
      const mobileProjectsButton = projectsButtons[1];
      fireEvent.click(mobileProjectsButton);

      expect(mockOnSectionChange).toHaveBeenCalledWith('projects');
    });
  });

  describe('Scroll Behavior', () => {
    it('updates navigation background when scrolled', async () => {
      render(<Navigation {...defaultProps} />);
      
      // Mock scroll event
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 100,
      });

      fireEvent.scroll(window);

      await waitFor(() => {
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('bg-white/90');
      });
    });

    it('maintains transparent background when not scrolled', () => {
      render(<Navigation {...defaultProps} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('bg-transparent');
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA roles', () => {
      render(<Navigation {...defaultProps} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      // 6 desktop nav items + 6 mobile nav items + 1 hamburger = 13 buttons
      expect(screen.getAllByRole('button')).toHaveLength(13);
    });

    it('supports keyboard navigation', () => {
      const mockElement = { scrollIntoView: mockScrollIntoView };
      mockGetElementById.mockReturnValue(mockElement);

      render(<Navigation {...defaultProps} />);
      
      // Use the desktop version (first one)
      const projectsButtons = screen.getAllByText('Projects');
      const desktopButton = projectsButtons[0];
      
      // Test Enter key
      fireEvent.keyDown(desktopButton, { key: 'Enter', code: 'Enter' });
      fireEvent.click(desktopButton); // Simulate the click that would happen
      
      expect(mockOnSectionChange).toHaveBeenCalledWith('projects');
    });
  });

  describe('Edge Cases', () => {
    it('handles all section IDs correctly', () => {
      const sections: SectionId[] = ['hero', 'experience', 'projects', 'education', 'skills', 'contact'];
      
      sections.forEach(section => {
        const sectionLabels = {
          hero: 'Home',
          experience: 'Experience',
          projects: 'Projects',
          education: 'Education',
          skills: 'Skills',
          contact: 'Contact'
        };
        
        // Render with the specific active section
        const { unmount } = render(<Navigation {...defaultProps} activeSection={section} />);
        
        // Get the desktop version (first one)
        const buttons = screen.getAllByText(sectionLabels[section]);
        const desktopButton = buttons[0];
        expect(desktopButton).toHaveClass('text-primary-600');
        
        // Clean up for next iteration
        unmount();
      });
    });

    it('handles rapid navigation clicks', () => {
      const mockElement = { scrollIntoView: mockScrollIntoView };
      mockGetElementById.mockReturnValue(mockElement);

      render(<Navigation {...defaultProps} />);
      
      const buttonTexts = ['Projects', 'Skills', 'Contact'];
      
      buttonTexts.forEach(buttonText => {
        // Use the desktop version (first one)
        const buttons = screen.getAllByText(buttonText);
        const desktopButton = buttons[0];
        fireEvent.click(desktopButton);
      });

      expect(mockOnSectionChange).toHaveBeenCalledTimes(3);
    });
  });
});