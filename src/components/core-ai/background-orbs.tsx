"use client";

import { useState, useEffect } from 'react';
import type { MousePosition } from '@/lib/types';

interface BackgroundOrbsProps {
  mousePosition: MousePosition;
}

export default function BackgroundOrbs({ mousePosition }: BackgroundOrbsProps) {
  const [scale, setScale] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let animationFrameId: number;
    const updateScale = () => {
      setScale(1 + Math.sin(Date.now() * 0.001) * 0.1);
      animationFrameId = requestAnimationFrame(updateScale);
    };
    updateScale();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 transition-transform"
        style={{
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`,
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
          filter: 'blur(40px)',
          transform: `scale(${scale})`,
          transition: 'left 0.2s ease-out, top 0.2s ease-out',
        }}
      />
      <div 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animationDuration: '4s'
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)`,
          filter: 'blur(50px)',
          animationDuration: '5s'
        }}
      />
    </div>
  );
}
