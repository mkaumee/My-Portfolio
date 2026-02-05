'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactInfo } from '@/types';
import { useScrollAnimation } from '@/hooks/useIntersectionObserver';
import { FiMail, FiMapPin, FiCopy, FiCheck, FiGithub, FiLinkedin, FiTwitter, FiExternalLink } from 'react-icons/fi';
import SocialIcon from '@/components/ui/SocialIcon';

interface ContactProps {
  contactInfo: ContactInfo;
  className?: string;
}

/**
 * Contact Interface Component
 * 
 * Builds contact section with email, GitHub, and LinkedIn links.
 * Implements copy-to-clipboard functionality for email and
 * adds social media icons with hover effects.
 * 
 * Validates Requirements: 7.1, 7.2, 7.3
 */
export default function Contact({ contactInfo, className = '' }: ContactProps) {
  const { elementRef, shouldAnimate } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-50px',
    animationDelay: 0.1
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return FiGithub;
      case 'linkedin':
        return FiLinkedin;
      case 'twitter':
        return FiTwitter;
      default:
        return FiExternalLink;
    }
  };

  return (
    <section 
      ref={elementRef}
      className={`py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 ${className}`}
      id="contact"
      role="region"
      aria-labelledby="contact-heading"
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
            id="contact-heading"
          >
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate on innovative AI solutions? I'm always excited to discuss 
            new opportunities, share ideas, or explore potential partnerships.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {contactInfo.availability || "I'm currently available for new opportunities and collaborations."}
                </p>
              </div>

              {/* Email Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <FiMail className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">{contactInfo.email}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleCopyEmail}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <FiCheck className="text-green-600 dark:text-green-400" />
                    ) : (
                      <FiCopy className="text-gray-600 dark:text-gray-400" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Location */}
              {contactInfo.location && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <FiMapPin className="text-xl text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Connect on Social Media
                </h4>
                <div className="flex gap-4">
                  {contactInfo.socialLinks.map((link) => {
                    const IconComponent = getSocialIcon(link.platform);
                    return (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Connect on ${link.platform}`}
                      >
                        <IconComponent className="text-xl text-gray-700 dark:text-gray-300" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form or Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Start a Project?
              </h3>
              
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  I'm passionate about creating innovative AI solutions that solve real-world problems. 
                  Whether you have a specific project in mind or want to explore possibilities, 
                  I'd love to hear from you.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">AI & Machine Learning Solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Full-Stack Web Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Computer Vision Applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Technical Consulting</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <motion.a
                    href={`mailto:${contactInfo.email}?subject=Project Collaboration Inquiry`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors w-full justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiMail className="text-lg" />
                    Send Me an Email
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Muhammad Kaumi. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  );
}