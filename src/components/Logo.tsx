
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md',
  withTagline = false 
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <h1 
        className={cn(
          'font-orbitron font-bold tracking-wider animate-neon-pulse', 
          sizeClasses[size]
        )}
      >
        <span className="text-neon-pink">T</span>
        <span className="text-neon-blue">EE</span>
        <span className="text-neon-pink">ND</span>
        <span className="text-neon-blue">ER</span>
      </h1>
      
      {withTagline && (
        <p className="text-sm font-inter text-gray-300 mt-1 opacity-80">
          КИБЕР-КАЗИНО БУДУЩЕГО
        </p>
      )}
    </div>
  );
};

export default Logo;
