import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '../Projects';
import { Project } from '../../../types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onError, ...props }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        onError={onError}
        {...props}
        data-testid="project-image"
      />
    );
  },
}));

const mockProjects: Project[] = [
  {
    id: 'proj-001',
    title: 'Alert-AI System',
    description: 'Advanced AI system for emergency detection using computer vision.',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'React'],
    images: ['/images/alert-ai.jpg'],
    liveUrl: 'https://alert-ai-demo.com',
    githubUrl: 'https://github.com/user/alert-ai',
    featured: true,
  },
  {
    id: 'proj-002',
    title: 'CPR Monitor',
    description: 'Healthcare AI application for CPR technique monitoring.',
    technologies: ['JavaScript', 'TensorFlow.js', 'MediaPipe'],
    images: ['/images/cpr-monitor.jpg'],
    githubUrl: 'https://github.com/user/cpr-monitor',
    featured: true,
  },
  {
    id: 'proj-003',
    title: 'Traffic Analysis',
    description: 'AI-powered traffic monitoring system.',
    technologies: ['Python', 'YOLO', 'OpenCV'],
    images: [],
    githubUrl: 'https://github.com/user/traffic-analysis',
    featured: false,
  },
];

describe('Projects Component', () => {
  it('renders the projects section with correct heading', () => {
    render(<Projects projects={mockProjects} />);
    
    expect(screen.getByRole('heading', { name: 'Featured Projects', level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Innovative AI solutions that make a real-world impact/)).toBeInTheDocument();
  });

  it('displays all projects with correct information', () => {
    render(<Projects projects={mockProjects} />);
    
    // Check that all project titles are rendered as headings
    expect(screen.getByRole('heading', { name: 'Alert-AI System' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CPR Monitor' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Traffic Analysis' })).toBeInTheDocument();
    
    // Check that descriptions are rendered
    expect(screen.getByText(/Advanced AI system for emergency detection/)).toBeInTheDocument();
    expect(screen.getByText(/Healthcare AI application for CPR technique/)).toBeInTheDocument();
    expect(screen.getByText(/AI-powered traffic monitoring system/)).toBeInTheDocument();
  });

  it('separates featured and regular projects correctly', () => {
    render(<Projects projects={mockProjects} />);
    
    // Should have "Featured Projects" and "Other Projects" sections
    expect(screen.getByRole('heading', { name: /Featured Projects/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Other Projects/i, level: 3 })).toBeInTheDocument();
  });

  it('displays technology tags for each project', () => {
    render(<Projects projects={mockProjects} />);
    
    // Check for technology tags (look for them within project cards, not filter buttons)
    const projectSection = screen.getByRole('region', { name: /projects/i });
    
    // Use getAllByText to find all instances and verify they exist
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PyTorch').length).toBeGreaterThan(0);
    expect(screen.getAllByText('JavaScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TensorFlow.js').length).toBeGreaterThan(0);
  });

  it('shows correct links for projects with live demos and GitHub', () => {
    render(<Projects projects={mockProjects} />);
    
    // Check for live demo links
    const liveDemoLinks = screen.getAllByText('Live Demo');
    expect(liveDemoLinks).toHaveLength(1); // Only Alert-AI has live demo
    
    // Check for GitHub links
    const githubLinks = screen.getAllByText('Source Code');
    expect(githubLinks).toHaveLength(3); // All projects have GitHub links
  });

  it('handles projects without images by showing placeholder', () => {
    render(<Projects projects={mockProjects} />);
    
    // Traffic Analysis project has no images, should show placeholder
    // Check that the project title exists as a heading
    expect(screen.getByRole('heading', { name: 'Traffic Analysis' })).toBeInTheDocument();
    
    // Check that placeholder text exists
    expect(screen.getByText('Project Preview')).toBeInTheDocument();
  });

  it('filters projects by technology when filter is applied', () => {
    render(<Projects projects={mockProjects} />);
    
    // Click on Python filter button (more specific selector)
    const pythonFilterButton = screen.getByRole('button', { name: 'Python' });
    fireEvent.click(pythonFilterButton);
    
    // Should show projects with Python
    expect(screen.getByRole('heading', { name: 'Alert-AI System' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Traffic Analysis' })).toBeInTheDocument();
    
    // Should not show CPR Monitor (doesn't use Python)
    expect(screen.queryByRole('heading', { name: 'CPR Monitor' })).not.toBeInTheDocument();
  });

  it('shows all projects when "All Projects" filter is selected', () => {
    render(<Projects projects={mockProjects} />);
    
    // Click on React filter first
    const reactFilterButton = screen.getByRole('button', { name: 'React' });
    fireEvent.click(reactFilterButton);
    
    // Then click "All Projects"
    const allProjectsFilter = screen.getByRole('button', { name: 'All Projects' });
    fireEvent.click(allProjectsFilter);
    
    // Should show all projects again
    expect(screen.getByRole('heading', { name: 'Alert-AI System' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CPR Monitor' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Traffic Analysis' })).toBeInTheDocument();
  });

  it('displays featured badge for featured projects', () => {
    render(<Projects projects={mockProjects} />);
    
    // Should have featured badges (text content)
    const featuredBadges = screen.getAllByText('Featured');
    expect(featuredBadges.length).toBeGreaterThan(0);
  });

  it('handles empty projects array gracefully', () => {
    render(<Projects projects={[]} />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    // Should not crash and should show the section header
  });

  it('limits technology tags display and shows overflow indicator', () => {
    const projectWithManyTechs: Project = {
      id: 'proj-many-techs',
      title: 'Complex Project',
      description: 'A project with many technologies.',
      technologies: ['React', 'Node.js', 'Python', 'Docker', 'AWS', 'MongoDB', 'Redis', 'GraphQL', 'TypeScript', 'Jest'],
      images: [],
      featured: false,
    };

    render(<Projects projects={[projectWithManyTechs]} />);
    
    // Should show overflow indicator for non-featured project (limit 6)
    expect(screen.getByText('+4 more')).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', () => {
    render(<Projects projects={mockProjects} />);
    
    // Check that the main section has responsive classes
    const section = screen.getByRole('region', { name: /projects/i });
    expect(section).toHaveClass('py-20');
  });

  it('provides proper accessibility attributes', () => {
    render(<Projects projects={mockProjects} />);
    
    // Check for proper ARIA labels on external links
    const liveDemoLink = screen.getByLabelText(/View live demo of Alert-AI System/);
    expect(liveDemoLink).toBeInTheDocument();
    
    const githubLink = screen.getByLabelText(/View source code of Alert-AI System/);
    expect(githubLink).toBeInTheDocument();
  });
});

describe('Projects Component Edge Cases', () => {
  it('handles projects with missing optional fields', () => {
    const minimalProject: Project = {
      id: 'minimal',
      title: 'Minimal Project',
      description: 'A project with minimal information.',
      technologies: ['JavaScript'],
      images: [],
      featured: false,
    };

    render(<Projects projects={[minimalProject]} />);
    
    // Use more specific selectors to avoid conflicts with placeholder text
    expect(screen.getByRole('heading', { name: 'Minimal Project' })).toBeInTheDocument();
    expect(screen.getByText('A project with minimal information.')).toBeInTheDocument();
    
    // Should not have live demo or GitHub links
    expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
    expect(screen.queryByText('Source Code')).not.toBeInTheDocument();
  });

  it('handles image loading errors gracefully', () => {
    render(<Projects projects={mockProjects} />);
    
    // Simulate image error
    const images = screen.getAllByTestId('project-image');
    if (images.length > 0) {
      fireEvent.error(images[0]);
      // Should fall back to placeholder without crashing
    }
  });
});