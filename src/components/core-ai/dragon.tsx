"use client";

import { useRef, useEffect } from 'react';
import type { MousePosition } from '@/lib/types';

interface DragonProps {
  mouse: MousePosition;
}

export default function Dragon({ mouse }: DragonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef<MousePosition>({ x: 0, y: 0 });
  const trail = useRef<MousePosition[]>([]);

  useEffect(() => {
    // Initialize position to avoid jump on first render
    pos.current = {
        x: window.innerWidth - 200,
        y: window.innerHeight - 200,
    }

    let rafId: number | null = null;
    const loop = () => {
      if (!mouse) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      
      const targetX = mouse.x;
      const targetY = mouse.y;
      const dx = targetX - pos.current.x;
      const dy = targetY - pos.current.y;

      pos.current.x += dx * 0.12;
      pos.current.y += dy * 0.12;

      trail.current.unshift({ x: pos.current.x, y: pos.current.y });
      if (trail.current.length > 5) trail.current.pop();

      if (ref.current) {
        const scale = Math.max(0.6, 1 - Math.abs(dx) / 1500);
        const rotation = (dx * 0.05) % 360;
        ref.current.style.transform = `translate3d(${pos.current.x - 80}px, ${pos.current.y - 60}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      }

      trail.current.forEach((trailPos, i) => {
        const trailEl = trailRef.current[i];
        if (trailEl) {
          const opacity = 1 - (i / 5);
          const scale = 1 - (i * 0.15);
          trailEl.style.transform = `translate3d(${trailPos.x - 40}px, ${trailPos.y - 40}px, 0) scale(${scale})`;
          trailEl.style.opacity = `${opacity * 0.3}`;
        }
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mouse]);

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => trailRef.current[i] = el}
          aria-hidden="true"
          className="fixed left-0 top-0 pointer-events-none"
          style={{ zIndex: 9 - i, willChange: 'transform, opacity' }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl" />
        </div>
      ))}
      
      <div
        ref={ref}
        aria-hidden="true"
        className="fixed left-0 top-0 pointer-events-none z-10"
        style={{ willChange: 'transform' }}
      >
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            <path 
              d="M8 80 C30 40, 70 20, 105 30 C140 40, 150 75, 125 90 C110 100, 80 95, 55 105 C35 112, 12 102, 8 80 Z" 
              fill="url(#dragonGradient)" 
              filter="url(#glow)"
            />
            <path 
              d="M105 30 C118 28, 132 30, 142 40 C148 46, 148 56, 142 62" 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
              className="animate-pulse"
            />
            <circle cx="85" cy="55" r="4" fill="rgba(255,255,255,0.9)" />
            <circle cx="87" cy="55" r="2" fill="#000" />
          </g>
          <defs>
            <linearGradient id="dragonGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#60A5FA">
                <animate attributeName="stop-color" values="#60A5FA;#A78BFA;#60A5FA" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#A78BFA">
                <animate attributeName="stop-color" values="#A78BFA;#60A5FA;#A78BFA" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
}
