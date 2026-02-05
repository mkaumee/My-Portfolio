import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../Hero';
import { HeroProps } from '@/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock SocialIcon component
jest.mock('@/components/ui/SocialIcon', () => {
  return function MockSocialIcon({ platform, url }: { platform: string; url: string }) {
    return (
      <a href={url} data-testid={`social-${platform.toLowerCase()}`}>
        {platform}
      </a>
    );
  };
});

// Mock Button component
jest.mock('@/components/ui/Button', () => {
  return function MockButton({ children, onClick, ...props }: any) {
    return (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    );
  };
});

const mockProps: HeroProps = {
  name: 'Muhammad Kaumi',
  title: 'AI Engineer & Machine Learning Specialist',
  summary: 'Passionate AI Engineer with expertise in computer vision, deep learning, and intelligent systems.',
  profileImage: '/images/profile/placeholder.svg',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/muhammadkaumi', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/muhammadkaumi', icon: 'linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/muhammadkaumi', icon: 'twitter' },
  ],
  resumeUrl: '/documents/resume.pdf',
  animationConfig: { typingSpeed: 10, typingDelay: 100 }, // Faster for testing
};

describe('Hero Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders personal information correctly', () => {
    render(<Hero {...mockProps} />);
    
    expect(screen.getByRole('heading', { name: 'Muhammad Kaumi' })).toBeInTheDocument();
    expect(screen.getByText(/Passionate AI Engineer with expertise/)).toBeInTheDocument();
    expect(screen.getByText('Hello, I\'m')).toBeInTheDocument();
  });

  it('displays profile image with correct alt text', () => {
    render(<Hero {...mockProps} />);
    
    const profileImage = screen.getByAltText('Muhammad Kaumi - Profile Picture');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/images/profile/placeholder.svg');
  });

  it('renders call-to-action buttons', () => {
    render(<Hero {...mockProps} />);
    
    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('handles View Projects button click', () => {
    // Mock getElementById to return a mock element
    const mockElement = { scrollIntoView: jest.fn() };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    render(<Hero {...mockProps} />);
    
    const viewProjectsButton = screen.getByText('View Projects');
    fireEvent.click(viewProjectsButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('projects');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles Contact Me button click', () => {
    // Mock getElementById to return a mock element
    const mockElement = { scrollIntoView: jest.fn() };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    render(<Hero {...mockProps} />);
    
    const contactButton = screen.getByText('Contact Me');
    fireEvent.click(contactButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('renders social media links', () => {
    render(<Hero {...mockProps} />);
    
    expect(screen.getByTestId('social-github')).toBeInTheDocument();
    expect(screen.getByTestId('social-linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('social-twitter')).toBeInTheDocument();
  });

  it('displays typing animation for title', async () => {
    render(<Hero {...mockProps} />);
    
    // Initially, the title should be empty or partially typed
    await waitFor(() => {
      const titleElement = screen.getByText(/AI Engineer/);
      expect(titleElement).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows scroll indicator', () => {
    render(<Hero {...mockProps} />);
    
    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
  });

  it('handles missing social links gracefully', () => {
    const propsWithoutSocial = { ...mockProps, socialLinks: [] };
    render(<Hero {...propsWithoutSocial} />);
    
    // Should render without errors even with empty social links
    expect(screen.getByRole('heading', { name: 'Muhammad Kaumi' })).toBeInTheDocument();
  });

  it('handles missing resume URL gracefully', () => {
    const propsWithoutResume = { ...mockProps, resumeUrl: undefined };
    render(<Hero {...propsWithoutResume} />);
    
    // Should render without errors even without resume URL
    expect(screen.getByRole('heading', { name: 'Muhammad Kaumi' })).toBeInTheDocument();
  });

  it('applies custom animation configuration', () => {
    const customAnimationConfig = { typingSpeed: 5, typingDelay: 50 };
    const propsWithCustomAnimation = { ...mockProps, animationConfig: customAnimationConfig };
    
    render(<Hero {...propsWithCustomAnimation} />);
    
    // Component should render without errors with custom animation config
    expect(screen.getByRole('heading', { name: 'Muhammad Kaumi' })).toBeInTheDocument();
  });
});