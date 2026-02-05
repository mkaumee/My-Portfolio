import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for intersection observer with animation triggers
 * 
 * Implements viewport detection to trigger animations with
 * reduced motion support for accessibility.
 * 
 * Validates Requirements: 6.3, 6.5, 10.4
 */
export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, immediately trigger animations
      setIsIntersecting(true);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        if (isCurrentlyIntersecting && (!hasTriggered || !triggerOnce)) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isCurrentlyIntersecting);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    elementRef,
    isIntersecting: triggerOnce ? (hasTriggered || isIntersecting) : isIntersecting,
    hasTriggered
  };
}

/**
 * Hook for staggered animations with intersection observer
 */
export function useStaggeredIntersectionObserver<T extends Element>(
  itemCount: number,
  options: UseIntersectionObserverOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 0.1, ...observerOptions } = options;
  const { elementRef, isIntersecting } = useIntersectionObserver<T>(observerOptions);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));

  useEffect(() => {
    if (isIntersecting) {
      // Stagger the visibility of items
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, i * staggerDelay * 1000);
        
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isIntersecting, itemCount, staggerDelay]);

  return {
    elementRef,
    isIntersecting,
    visibleItems
  };
}

/**
 * Hook for scroll-triggered animations with performance optimization
 */
export function useScrollAnimation<T extends Element>(
  options: UseIntersectionObserverOptions & {
    animationDelay?: number;
    animationDuration?: number;
  } = {}
) {
  const {
    animationDelay = 0,
    animationDuration = 0.6,
    ...observerOptions
  } = options;

  const { elementRef, isIntersecting } = useIntersectionObserver<T>(observerOptions);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timeout = setTimeout(() => {
        setShouldAnimate(true);
      }, animationDelay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isIntersecting, animationDelay]);

  return {
    elementRef,
    isIntersecting,
    shouldAnimate,
    animationProps: {
      initial: { opacity: 0, y: 30 },
      animate: shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { duration: animationDuration, ease: 'easeOut' }
    }
  };
}