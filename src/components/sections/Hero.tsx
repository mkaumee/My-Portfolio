'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SocialIcon from '@/components/ui/SocialIcon';
import { HeroProps } from '@/types';
import { fadeInUp, staggerContainer, scaleIn } from '@/utils/animations';

/**
 * Hero component with animated text, profile image, and call-to-action buttons
 * Implements typing animation for headline and hover effects for profile image
 * Validates Requirements: 1.1, 1.2, 1.3
 */
export default function Hero({
  name,
  title,
  summary,
  profileImage,
  socialLinks,
  resumeUrl,
  animationConfig = { typingSpeed: 50, typingDelay: 1000 }
}: HeroProps) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure hydration safety
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Typing animation effect for the title
  useEffect(() => {
    if (!isClient) return;
    
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const typeTitle = () => {
      if (currentIndex < title.length) {
        setDisplayedTitle(title.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeTitle, animationConfig.typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start typing after initial delay
    timeoutId = setTimeout(typeTitle, animationConfig.typingDelay);

    return () => clearTimeout(timeoutId);
  }, [title, animationConfig.typingSpeed, animationConfig.typingDelay, isClient]);

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div variants={fadeInUp} className="text-center lg:text-left">
              {/* Greeting */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium mb-4"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                {name}
              </motion.h1>

              {/* Animated title with typing effect */}
              <div className="mb-8">
                <motion.h2
                  variants={fadeInUp}
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 min-h-[3rem] flex items-center justify-center lg:justify-start"
                >
                  I build AI systems that save lives
                  <motion.span
                    animate={isClient && !isTypingComplete ? { opacity: [1, 0] } : { opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-blue-600 dark:text-blue-400"
                  >
                    |
                  </motion.span>
                </motion.h2>
              </div>

              {/* Summary */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {summary}
              </motion.p>

              {/* Call-to-action buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleViewProjects}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleContactMe}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Me
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div
                variants={fadeInUp}
                className="flex gap-6 justify-center lg:justify-start mt-10"
              >
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + index * 0.1 }}
                  >
                    <SocialIcon
                      platform={link.platform}
                      url={link.url}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side - Profile image */}
            <motion.div
              variants={scaleIn}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Decorative background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Profile image container */}
                <motion.div
                  className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Fallback gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                  
                  {/* Profile image */}
                  <Image
                    src={profileImage}
                    alt={`${name} - Profile Picture`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 320px, 384px"
                    onError={(e) => {
                      // Hide the image on error, showing the gradient background
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-blue-600 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-white text-lg font-semibold"
                    >
                      {name}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Floating elements around the image */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-500 dark:text-gray-400"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-current rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}