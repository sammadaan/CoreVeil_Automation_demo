"use client";

import { useEffect, useState } from 'react';

export default function FloatingCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>{children}</div>;
  }

  return (
    <div 
      className="animate-float"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${6 + delay}s`
      }}
    >
      {children}
    </div>
  );
}
