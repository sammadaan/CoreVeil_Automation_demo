"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animationClass: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function AnimateOnScroll({
  children,
  className,
  animationClass,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce]);
  
  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity',
        isVisible ? `${animationClass} opacity-100` : 'opacity-0',
        className
      )}
      style={{ 
        animationDuration: '0.8s',
        animationDelay: `${delay}ms`, 
        animationFillMode: 'forwards',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
