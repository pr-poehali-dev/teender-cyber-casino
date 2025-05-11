
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  imageUrl: string;
  provider: string;
  isPopular?: boolean;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  imageUrl,
  provider,
  isPopular = false,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden border-0 group relative transition-all duration-300 hover:transform hover:scale-105", className)}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-cyber-black via-cyber-black/80 to-transparent z-10"></div>
      
      {isPopular && (
        <div className="absolute top-2 right-2 z-20 bg-neon-pink text-white text-xs px-2 py-1 rounded-full font-medium">
          HOT
        </div>
      )}
      
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      <CardContent className="relative z-20 p-4 bg-cyber-black bg-opacity-70 backdrop-filter backdrop-blur-sm transition-all duration-300 transform translate-y-0 group-hover:translate-y-0">
        <h3 className="font-orbitron text-md text-white truncate">{title}</h3>
        <p className="text-xs text-gray-400 mb-3">{provider}</p>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" className="flex-1 h-8 text-xs cyber-button">
            <Icon name="Play" size={14} className="mr-1" />
            Играть
          </Button>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Icon name="Info" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
