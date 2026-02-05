'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { SkillCategory } from '@/types';
import { useIntersectionObserver, useScrollAnimation } from '@/hooks/useIntersectionObserver';

interface SkillsProps {
  skillCategories: SkillCategory[];
  className?: string;
}

/**
 * Skills Animation Component
 * 
 * Features continuous scrolling animation with multiple rows,
 * different scroll speeds for parallax effect, and hover effects
 * that pause animation and highlight skills.
 * 
 * Validates Requirements: 6.1, 6.2, 6.3, 6.4
 */
export default function Skills({ skillCategories, className = '' }: SkillsProps) {
  const { elementRef: containerRef, shouldAnimate } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-100px',
    animationDelay: 0.2
  });

  // Flatten all skills for the animation
  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.name
    }))
  );

  // Create multiple rows with different skills
  const createSkillRows = () => {
    const rows = [];
    const skillsPerRow = Math.ceil(allSkills.length / 3);
    
    for (let i = 0; i < 3; i++) {
      const rowSkills = allSkills.slice(i * skillsPerRow, (i + 1) * skillsPerRow);
      // Duplicate skills to create seamless loop
      const duplicatedSkills = [...rowSkills, ...rowSkills, ...rowSkills];
      rows.push(duplicatedSkills);
    }
    
    return rows;
  };

  const skillRows = createSkillRows();

  return (
    <section 
      ref={containerRef}
      className={`py-20 overflow-hidden ${className}`} 
      id="skills"
      role="region"
      aria-labelledby="skills-heading"
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
            id="skills-heading"
          >
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks, 
            constantly evolving with the latest industry standards and best practices.
          </p>
        </motion.div>

        {/* Skills Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, index) => (
            <SkillCategoryCard 
              key={category.name} 
              category={category} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Animated Skills Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Technology Stack in Motion
          </h3>
          
          {skillRows.map((skills, rowIndex) => (
            <SkillMarqueeRow 
              key={rowIndex}
              skills={skills}
              direction={rowIndex % 2 === 0 ? 'left' : 'right'}
              speed={30 + rowIndex * 10}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {category.name}
      </h3>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {skill.name}
            </span>
            <div className="flex items-center gap-2">
              {/* Skill level indicator */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < skill.level
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface SkillMarqueeRowProps {
  skills: Array<{
    name: string;
    level: number;
    icon?: string;
    color?: string;
    category: string;
  }>;
  direction: 'left' | 'right';
  speed: number;
}

function SkillMarqueeRow({ skills, direction, speed }: SkillMarqueeRowProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: '#dbeafe',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className="text-blue-800 dark:text-blue-200 font-semibold text-sm">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}