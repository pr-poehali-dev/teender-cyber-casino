
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-gradient opacity-80 z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/cyber-grid.webp')] bg-cover opacity-20 z-0"></div>
      
      {/* Glowing lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-neon-pink/30 z-0 transform -translate-y-20"></div>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-neon-blue/20 z-0 transform translate-y-20"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 z-10 text-center">
        <h1 className="font-orbitron font-bold text-5xl md:text-7xl mb-4 animate-neon-pulse">
          <span className="text-neon-pink">T</span>
          <span className="text-neon-blue">EE</span>
          <span className="text-neon-pink">ND</span>
          <span className="text-neon-blue">ER</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Погрузись в мир киберпанк-казино, где неоновые огни 
          встречаются с технологиями будущего
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="cyber-button text-lg px-8 py-6">
            <Icon name="Dice5" className="mr-2" />
            Начать игру
          </Button>
          <Button variant="outline" className="cyber-blue-button text-lg px-8 py-6">
            <Icon name="Gift" className="mr-2" />
            Получить бонус
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  color: 'pink' | 'blue' | 'purple' | 'green';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, color }) => {
  const colorClasses = {
    pink: 'text-neon-pink border-neon-pink/30',
    blue: 'text-neon-blue border-neon-blue/30',
    purple: 'text-neon-purple border-neon-purple/30',
    green: 'text-neon-green border-neon-green/30',
  };
  
  return (
    <div className={`glass-card p-4 border ${colorClasses[color]} flex flex-col items-center justify-center text-center`}>
      <Icon name={icon} size={32} className="mb-2" />
      <p className="font-medium text-sm">{title}</p>
    </div>
  );
};

const features: FeatureCardProps[] = [
  { icon: 'Wallet', title: 'Быстрые выплаты', color: 'pink' },
  { icon: 'Shield', title: 'Безопасность', color: 'blue' },
  { icon: 'Gift', title: 'Бонусы', color: 'purple' },
  { icon: 'Headphones', title: 'Поддержка 24/7', color: 'green' },
];

export default Hero;
