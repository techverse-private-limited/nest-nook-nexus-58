
import { useSprings, animated, easings, EasingFunction } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

// Exclude factory-style easings that don't match EasingFunction (e.g., 'steps')
type AllowedEasingKey = Exclude<keyof typeof easings, 'steps'>;

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>;
  easing?: EasingFunction | AllowedEasingKey;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  onLetterAnimationComplete?: () => void;
}

const resolveEasing = (easing: SplitTextProps['easing']): EasingFunction => {
  if (typeof easing === 'function') return easing as EasingFunction;
  if (easing && typeof easing === 'string' && easings[easing as AllowedEasingKey]) {
    // Cast because AllowedEasingKey guarantees an EasingFunction return
    return easings[easing as AllowedEasingKey] as unknown as EasingFunction;
  }
  return easings.easeOutCubic as EasingFunction;
};

export const SplitText = ({ 
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null); 
  const animatedCount = useRef(0);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return; 

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef); 
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const easeFn = resolveEasing(easing);

  const [springs] = useSprings(
    letters.length,
    (i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (animatedCount.current === letters.length && onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          }
        : false,
      delay: i * delay,
      config: { duration: 500, easing: easeFn },
    }),
    [inView, delay, animationFrom, animationTo, easeFn]
  );

  const textStyle: React.CSSProperties = {
    textAlign,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={textStyle}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <animated.span
                key={index}
                style={springs[index]}
                className="inline-block transform transition-opacity will-change-transform"
              >
                {letter}
              </animated.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }}> </span>
          )}
        </span>
      ))}
    </p>
  );
};
