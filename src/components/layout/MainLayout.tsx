'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Timeline from '@/components/ui/Timeline';
import ErrorBoundary, { SectionErrorFallback } from '@/components/ui/ErrorBoundary';
import { SectionId } from '@/types';
import { portfolioData } from '@/data/portfolio';

interface MainLayoutProps {
  children?: ReactNode;
}

interface SectionProps {
  id: SectionId;
  className?: string;
  children: ReactNode;
}

/**
 * Section wrapper component that provides consistent styling and structure
 * for each portfolio section with proper scroll spy integration
 */
function Section({ id, className = '', children }: SectionProps) {
  return (
    <section 
      id={id}
      className={`min-h-screen flex items-center justify-center py-20 ${className}`}
      data-section={id}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

/**
 * Main layout component that organizes all portfolio sections and provides
 * scroll spy functionality for active section detection
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  // Enhanced scroll spy functionality with improved section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'education', 'skills', 'contact'] as SectionId[];
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Better detection point
      
      // Find the section that's currently most visible
      let currentSection: SectionId = 'hero';
      let maxVisibility = 0;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(elementTop, window.scrollY);
          const visibleBottom = Math.min(elementBottom, window.scrollY + window.innerHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / rect.height;
          
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentSection = sectionId;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [activeSection]);

  const handleSectionChange = (section: SectionId) => {
    setActiveSection(section);
  };

  return (
    <ErrorBoundary>
      <div className="relative">
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          {/* Hero Section */}
          <Section id="hero" className="pt-0">
            <ErrorBoundary fallback={<SectionErrorFallback sectionName="hero section" />}>
              <Hero
                name={portfolioData.personal.name}
                title={portfolioData.personal.title}
                summary={portfolioData.personal.summary}
                profileImage={portfolioData.personal.profileImage}
                socialLinks={portfolioData.contact.socialLinks}
                resumeUrl={portfolioData.personal.resumeUrl}
              />
            </ErrorBoundary>
          </Section>

          {/* Experience Section */}
          <Section id="experience" className="bg-white dark:bg-gray-800">
            <ErrorBoundary fallback={<SectionErrorFallback sectionName="experience section" />}>
              <Timeline 
                items={portfolioData.experience.map(exp => ({
                  id: exp.id,
                  title: exp.position,
                  organization: exp.company,
                  startDate: exp.startDate,
                  endDate: exp.endDate,
                  location: exp.location,
                  description: exp.responsibilities,
                  achievements: exp.achievements,
                  technologies: exp.technologies
                }))}
                variant="work"
              />
            </ErrorBoundary>
          </Section>

          {/* Projects Section */}
          <Section id="projects">
            <ErrorBoundary fallback={<SectionErrorFallback sectionName="projects section" />}>
              <Projects projects={portfolioData.projects} />
            </ErrorBoundary>
          </Section>

          {/* Education Section */}
          <Section id="education">
            <ErrorBoundary fallback={<SectionErrorFallback sectionName="education section" />}>
              <Education education={portfolioData.education} />
            </ErrorBoundary>
          </Section>

          {/* Skills Section */}
          <Section id="skills" className="bg-white dark:bg-gray-800">
            <ErrorBoundary fallback={<SectionErrorFallback sectionName="skills section" />}>
              <Skills skillCategories={portfolioData.skills} />
            </ErrorBoundary>
          </Section>

          {/* Contact Section */}
          <Section id="contact">
            <ErrorBoundary fallback={<SectionErrorFallback sectionName="contact section" />}>
              <Contact contactInfo={portfolioData.contact} />
            </ErrorBoundary>
          </Section>

          {/* Custom children can be added here if needed */}
          {children}
        </main>
      </div>
    </ErrorBoundary>
  );
}