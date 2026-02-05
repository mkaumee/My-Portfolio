'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Education as EducationType } from '@/types';
import Timeline from '@/components/ui/Timeline';
import { useScrollAnimation } from '@/hooks/useIntersectionObserver';

interface EducationProps {
  education: EducationType[];
  className?: string;
}

/**
 * Education Timeline Component
 * 
 * Displays educational background in chronological format
 * including degree, institution, and expected graduation.
 * 
 * Validates Requirements: 5.1, 5.3
 */
export default function Education({ education, className = '' }: EducationProps) {
  const { elementRef, shouldAnimate } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-50px',
    animationDelay: 0.1
  });

  // Convert education data to timeline format
  const timelineItems = education.map(edu => ({
    id: edu.id,
    title: `${edu.degree} in ${edu.field}`,
    organization: edu.institution,
    startDate: edu.startDate,
    endDate: edu.endDate,
    location: '', // Education doesn't have location in the type
    description: edu.relevantCourses ? [
      'Relevant Coursework:',
      ...edu.relevantCourses
    ] : [],
    achievements: edu.honors || [],
    technologies: [], // Education doesn't typically have technologies
    gpa: edu.gpa
  }));

  return (
    <section 
      ref={elementRef}
      className={`py-20 bg-gray-50 dark:bg-gray-900 ${className}`}
      id="education"
      role="region"
      aria-labelledby="education-heading"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            id="education-heading"
          >
            Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Academic foundation and continuous learning journey in computer science, 
            artificial intelligence, and software engineering.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Timeline 
            items={timelineItems}
            variant="education"
            animationConfig={{
              staggerDelay: 0.3,
              slideDistance: 60,
              fadeThreshold: 0.2
            }}
          />
        </motion.div>

        {/* Additional Education Info */}
        {education.some(edu => edu.gpa) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Academic Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.filter(edu => edu.gpa).map((edu) => (
                  <div key={edu.id} className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {edu.gpa?.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      GPA - {edu.degree}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Certifications or Additional Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Committed to staying current with emerging technologies through online courses, 
              workshops, and hands-on projects. Always exploring new frameworks, tools, 
              and methodologies in AI and software development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}