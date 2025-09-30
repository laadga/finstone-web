'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap, Bot, Target, MessageSquare, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';
import { SiriOrb } from './siri-orb';
import Link from 'next/link';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  autoFlip?: boolean;
  orbColors?: {
    c1?: string;
    c2?: string;
    c3?: string;
  };
}

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  color = '#ff2e88',
  autoFlip = false,
  orbColors = {
    c1: "oklch(75% 0.15 350)",
    c2: "oklch(80% 0.12 200)",
    c3: "oklch(78% 0.14 280)"
  }
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.3 });

  // Auto-flip when card comes into view and flip back when scrolling away
  useEffect(() => {
    if (autoFlip) {
      if (isIntersecting) {
        // Flip to back when coming into view
        const timer = setTimeout(() => {
          setIsFlipped(true);
        }, 1000); // Wait 1 second after coming into view
        
        return () => clearTimeout(timer);
      } else {
        // Flip back to front when scrolling away
        setIsFlipped(false);
      }
    }
  }, [autoFlip, isIntersecting]);

  return (
    <div
      ref={ref}
      style={{
        ['--primary' as any]: color ?? '#2563eb',
      }}
      className="group relative h-[360px] w-full max-w-[300px] [perspective:2000px] overflow-hidden"
      onMouseEnter={() => !autoFlip && setIsFlipped(true)}
      onMouseLeave={() => !autoFlip && setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-transform duration-500 ease-out',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-white/20 backdrop-blur-sm',
            'dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800',
            'border border-slate-200 dark:border-zinc-800/50',
            'shadow-lg dark:shadow-xl',
            'transition-opacity duration-300 ease-out',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20 dark:group-hover:border-primary/30',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient effect */}
          
          {/* Teal gradient overlay */}

          {/* SiriOrb AI Agent Face */}
          <div className="absolute inset-0 flex items-center justify-center">
            <SiriOrb
              size="160px"
              colors={orbColors}
              animationDuration={25}
              className="drop-shadow-2xl"
            />
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-4px] dark:text-white">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px] dark:text-zinc-300">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-8px] rounded-lg transition-opacity duration-300',
                    'from-primary/20 via-primary/10 bg-gradient-to-br to-transparent',
                    'opacity-0 group-hover/icon:opacity-100',
                  )}
                />
                <Zap className="text-primary relative z-10 h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-3',
            'bg-white/20 backdrop-blur-sm',
            'dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800',
            'border border-slate-200 dark:border-zinc-800',
            'shadow-lg dark:shadow-xl',
            'flex flex-col',
            'overflow-hidden', // Prevent any content from overflowing
            'transition-opacity duration-300 ease-out',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20 dark:group-hover:border-primary/30',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient */}
          
          {/* Teal gradient overlay */}

          <div className="relative z-10 flex-1 space-y-3 min-h-0">
            <div className="space-y-2">
              <div className="mb-2">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-2px] dark:text-white">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all duration-500 ease-out group-hover:translate-y-[-2px] dark:text-zinc-400">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => {
                const icons = [Target, MessageSquare, BarChart3, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-zinc-700 transition-all duration-500 dark:text-zinc-300"
                    style={{
                      transform: isFlipped
                        ? 'translateX(0)'
                        : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md">
                      <IconComponent className="text-primary h-3 w-3" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-slate-200 pt-2 dark:border-zinc-800 max-h-[60px]">
            <Link href="/pricing">
              <div
                className={cn(
                  'group/start relative',
                  'flex items-center justify-between',
                  'rounded-lg p-2',
                  'transition-all duration-300',
                  'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700',
                  'dark:from-blue-600 dark:via-blue-700 dark:to-blue-800',
                  'hover:from-blue-600 hover:via-blue-700 hover:to-blue-800',
                  'dark:hover:from-blue-700 dark:hover:via-blue-800 dark:hover:to-blue-900',
                  'hover:scale-[1.01] hover:cursor-pointer', // Reduced scale to prevent overflow
                  'hover:border-primary/20 border border-transparent',
                  'w-full', // Ensure button takes full width but doesn't exceed container
                  'max-h-[44px]', // Limit button height
                  'overflow-hidden', // Prevent any content from overflowing
                  'box-border', // Include padding and border in width calculation
                )}
              >
                <span className="group-hover/start:text-white text-sm font-semibold text-white transition-colors duration-300 truncate flex-1 min-w-0">
                  Deploy Agent
                </span>
                <div className="group/icon relative flex-shrink-0 ml-1">
                  <div
                    className={cn(
                      'absolute inset-[-2px] rounded-lg transition-all duration-300',
                      'from-primary/20 via-primary/10 bg-gradient-to-br to-transparent',
                      'scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100',
                    )}
                  />
                  <ArrowRight className="text-white relative z-10 h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-105" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
