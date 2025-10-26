
'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingAnimationProps {
  lines: { text: string; className: string }[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenLines?: number;
}

export default function TypingAnimation({ 
  lines, 
  typingSpeed = 100, 
  deletingSpeed = 50,
  delayBetweenLines = 2000,
}: TypingAnimationProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isMounted) return;

    const handleTyping = () => {
      const currentLine = lines[lineIndex % lines.length];
      const fullText = currentLine.text;

      setText(current => 
        isDeleting 
          ? fullText.substring(0, current.length - 1)
          : fullText.substring(0, current.length + 1)
      );

      if (!isDeleting && text === fullText) {
        timerRef.current = setTimeout(() => setIsDeleting(true), delayBetweenLines);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLineIndex(current => (current + 1));
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timerRef.current = setTimeout(handleTyping, speed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [text, isDeleting, lineIndex, lines, typingSpeed, deletingSpeed, delayBetweenLines, isMounted]);

  if (!isMounted) {
    return (
        <>
            {lines.map((line, i) => (
                <div key={i} className={line.className}>&nbsp;</div>
            ))}
        </>
    );
  }

  const currentLineToRender = lines[lineIndex % lines.length];
  
  return (
    <>
        <span className={currentLineToRender.className}>
            {text}
            <span className="animate-blink">|</span>
        </span>
        {/* Render a placeholder for the second line to maintain height */}
        {(lineIndex % lines.length) === 0 && lines.length > 1 && <div className={lines[1].className}>&nbsp;</div>}
    </>
  );
}
