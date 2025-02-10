'use client';
import { cn } from '@/lib/utils';
import type React from 'react';
import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from 'react';

interface GlowAreaProps extends ComponentPropsWithoutRef<'div'> {
  size?: number;
}

export const GlowArea = (props: GlowAreaProps) => {
  const { className = '', size = 300, ...rest } = props;
  const element = useRef<HTMLDivElement>(null);
  const frameId = useRef<number | null>(null);
  const latestCoords = useRef<{ x: number; y: number } | null>(null);

  const updateGlow = () => {
    if (latestCoords.current && element.current) {
      element.current.style.setProperty(
        '--glow-x',
        `${latestCoords.current.x}px`
      );
      element.current.style.setProperty(
        '--glow-y',
        `${latestCoords.current.y}px`
      );
      frameId.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    latestCoords.current = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => updateGlow());
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty('--glow-x');
    e.currentTarget.style.removeProperty('--glow-y');
  };
  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: <explanation>
    <div
      ref={element}
      style={
        {
          position: 'relative',
          '--glow-size': `${size}px`,
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(className, '')}
      {...rest}
    />
  );
};

GlowArea.displayName = 'GlowArea';

interface GlowProps extends ComponentPropsWithoutRef<'div'> {
  color?: string;
}

export const Glow = (props: GlowProps) => {
  const { className, color = 'blue', children, ...rest } = props;
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    element.current?.style.setProperty(
      '--glow-top',
      `${element.current?.offsetTop}px`
    );
    element.current?.style.setProperty(
      '--glow-left',
      `${element.current?.offsetLeft}px`
    );
  }, []);

  return (
    <div ref={element} className={cn(className, 'relative')}>
      <div
        {...rest}
        style={{
          backgroundImage: `radial-gradient(
            var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            transparent 100%
          )`,
        }}
        className={cn(
          className,
          "pointer-events-none absolute inset-0 mix-blend-multiply after:absolute after:inset-0.25 after:rounded-[inherit] after:bg-background/90 after:content-[''] dark:mix-blend-lighten"
        )}
      />
      {children}
    </div>
  );
};

Glow.displayName = 'Glow';
