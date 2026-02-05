'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward, FiCode, FiExternalLink } from 'react-icons/fi';
import { TimelineProps, TimelineItem } from '@/types';

/**
 * Helper function to format date range
 */
const formatDateRange = (startDate: Date, endDate: Date | null): string => {
  const formatOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short' 
  };
  
  const start = startDate.toLocaleDateString('en-US', formatOptions);
  const end = endDate 
    ? endDate.toLocaleDateString('en-US', formatOptions)
    : 'Present';
  
  return `${start} - ${end}`;
};

/**
 * Helper function to calculate duration
 */
const calculateDuration = (startDate: Date, endDate: Date | null): string => {
  const end = endDate || new Date();
  const diffTime = Math.abs(end.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);
  
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

/**
 * Timeline Component
 * 
 * A comprehensive timeline component that displays chronological information
 * with professional styling and smooth animations. Features:
 * - Vertical timeline layout with alternating sides on desktop
 * - Responsive stacked layout for mobile devices
 * - Fade-in animations as items enter viewport
 * - Support for work experience and education variants
 * 
 * Validates Requirements: 3.1, 3.2, 3.3
 */

const Timeline: React.FC<TimelineProps> = ({ 
  items, 
  variant = 'work',
  animationConfig = {
    staggerDelay: 0.2,
    slideDistance: 50,
    fadeThreshold: 0.1
  }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: '-100px',
    amount: animationConfig.fadeThreshold 
  });

  // Sort items in reverse chronological order (most recent first)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.endDate || a.startDate;
    const dateB = b.endDate || b.startDate;
    return dateB.getTime() - dateA.getTime();
  });

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animationConfig.staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for timeline items
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: animationConfig.slideDistance,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div 
      ref={containerRef}
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      role="region"
      aria-label={`${variant === 'work' ? 'Work Experience' : 'Education'} Timeline`}
    >
      {/* Enhanced Timeline line - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full">
        <div className="w-0.5 h-full bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 opacity-60 shadow-sm" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full shadow-lg" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full shadow-lg" />
      </div>
      
      {/* Enhanced Mobile timeline line */}
      <div className="lg:hidden absolute left-8 top-8 h-full">
        <div className="w-0.5 h-full bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 opacity-60" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-500 rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-12 lg:space-y-16"
      >
        {sortedItems.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            variant={variant}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Individual Timeline Item Component
 */
interface TimelineItemComponentProps {
  item: TimelineItem;
  index: number;
  variant: 'work' | 'education';
  variants: Variants;
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  index,
  variant,
  variants
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { 
    once: true, 
    margin: '-50px',
    amount: 0.3 
  });

  // Determine if item should be on the left or right (desktop only)
  const isLeft = index % 2 === 0;
  
  // Format date range
  const dateRange = formatDateRange(item.startDate, item.endDate);
  const duration = calculateDuration(item.startDate, item.endDate);

  return (
    <motion.div
      ref={itemRef}
      variants={variants}
      className={`relative flex items-start ${
        // Desktop: alternating sides, Mobile: always left-aligned
        isLeft 
          ? 'lg:flex-row-reverse lg:text-right' 
          : 'lg:flex-row lg:text-left'
      } flex-row text-left group`}
    >
      {/* Enhanced Timeline dot with hover effects */}
      <motion.div
        className={`absolute ${
          // Desktop positioning
          isLeft 
            ? 'lg:right-1/2 lg:translate-x-1/2' 
            : 'lg:left-1/2 lg:-translate-x-1/2'
        } 
        // Mobile positioning
        left-8 -translate-x-1/2 lg:translate-y-0 top-8
        z-20 flex items-center justify-center`}
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {/* Outer ring with pulse effect */}
        <motion.div 
          className="absolute w-6 h-6 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Main dot */}
        <div className="relative w-4 h-4 bg-white border-4 border-primary-500 rounded-full shadow-lg group-hover:border-primary-600 transition-colors duration-300">
          <div className="absolute inset-1 bg-primary-500 rounded-full group-hover:bg-primary-600 transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Enhanced Content card with professional styling */}
      <motion.div
        className={`${
          // Desktop spacing and positioning
          isLeft 
            ? 'lg:mr-12 lg:pr-8' 
            : 'lg:ml-12 lg:pl-8'
        } 
        // Mobile spacing
        ml-20 lg:ml-0
        w-full lg:w-5/12 relative group`}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Card background with enhanced styling */}
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 
                       hover:shadow-2xl hover:border-primary-200 
                       transition-all duration-500 ease-out
                       before:absolute before:inset-0 before:rounded-2xl 
                       before:bg-gradient-to-br before:from-primary-50/50 before:to-transparent 
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                       overflow-hidden">
          
          {/* Subtle background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50" />
          
          {/* Header with enhanced typography */}
          <div className="relative z-10 mb-6">
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-700 transition-colors duration-300"
              whileHover={{ x: isLeft ? -4 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {item.title}
            </motion.h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <motion.h4 
                className="text-lg font-semibold text-primary-600 flex items-center group-hover:text-primary-700 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {item.organization}
                <FiExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.h4>
              
              {item.location && (
                <motion.div 
                  className="flex items-center text-gray-600 text-sm font-medium bg-gray-50 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <FiMapPin className="w-4 h-4 mr-2 text-primary-500" />
                  {item.location}
                </motion.div>
              )}
            </div>
            
            {/* Enhanced Date and duration with better visual hierarchy */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
              <motion.div 
                className="flex items-center text-gray-700 font-medium bg-primary-50 px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.02, backgroundColor: "#eff6ff" }}
              >
                <FiCalendar className="w-4 h-4 mr-2 text-primary-500" />
                {dateRange}
              </motion.div>
              <div className="hidden sm:block w-2 h-2 bg-primary-300 rounded-full" />
              <span className="font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                {duration}
              </span>
            </div>
          </div>

          {/* Enhanced Description with better spacing */}
          {item.description && item.description.length > 0 && (
            <motion.div 
              className="relative z-10 mb-6"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center">
                <div className="w-1 h-4 bg-primary-500 rounded-full mr-3" />
                {variant === 'work' ? 'Key Responsibilities' : 'Description'}
              </h5>
              <ul className="space-y-3">
                {item.description.map((desc, idx) => (
                  <motion.li 
                    key={idx} 
                    className="text-gray-700 text-sm leading-relaxed flex items-start group/item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:bg-primary-600 transition-colors duration-300" />
                    <span className="group-hover/item:text-gray-900 transition-colors duration-300">{desc}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Enhanced Achievements with better visual treatment */}
          {item.achievements && item.achievements.length > 0 && (
            <motion.div 
              className="relative z-10 mb-6"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center">
                <FiAward className="w-4 h-4 mr-3 text-green-500" />
                Key Achievements
              </h5>
              <ul className="space-y-3">
                {item.achievements.map((achievement, idx) => (
                  <motion.li 
                    key={idx} 
                    className="text-gray-700 text-sm leading-relaxed flex items-start group/achievement"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/achievement:bg-green-600 transition-colors duration-300" />
                    <span className="group-hover/achievement:text-gray-900 transition-colors duration-300 font-medium">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Enhanced Technologies with improved interaction */}
          {item.technologies && item.technologies.length > 0 && (
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center">
                <FiCode className="w-4 h-4 mr-3 text-blue-500" />
                Technologies Used
              </h5>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 
                             text-primary-700 text-xs font-semibold rounded-full 
                             border border-primary-200 shadow-sm
                             hover:from-primary-100 hover:to-primary-200 
                             hover:border-primary-300 hover:shadow-md
                             transition-all duration-300 cursor-default"
                    whileHover={{ 
                      scale: 1.08, 
                      y: -2,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: idx * 0.05,
                      type: "spring", 
                      stiffness: 400, 
                      damping: 20 
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Timeline;