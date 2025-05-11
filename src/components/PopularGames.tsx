
import React from 'react';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PopularGames = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-orbitron font-bold neon-blue-text">
          Популярные игры
        </h2>
        <Button variant="outline" className="cyber-blue-button">
          <span>Все игры</span>
          <Icon name="ChevronRight" className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {games.map((game, index) => (
          <GameCard 
            key={index}
            title={game.title}
            imageUrl={game.imageUrl}
            provider={game.provider}
            isPopular={game.isPopular}
          />
        ))}
      </div>
      
      <div className="mt-12">
        <div className="glass-card p-6 border-neon-pink/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-orbitron neon-text mb-2">
                Pragmatic Play
              </h3>
              <p className="text-gray-300 max-w-xl">
                Ведущий провайдер слотов и лайв-игр. Более 200 захватывающих игр с высоким процентом выплат и уникальной механикой.
              </p>
            </div>
            <Button className="cyber-button whitespace-nowrap">
              <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
              Все игры провайдера
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const games = [
  {
    title: "Sweet Bonanza",
    imageUrl: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    title: "Gates of Olympus",
    imageUrl: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    title: "Wolf Gold",
    imageUrl: "https://images.unsplash.com/photo-1564052718462-01728aa9efa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    title: "The Dog House",
    imageUrl: "https://images.unsplash.com/photo-1518914781460-9b936b97679c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    title: "Great Rhino",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    title: "Big Bass Bonanza",
    imageUrl: "https://images.unsplash.com/photo-1580684056138-d1184221795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    title: "Fruit Party",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    title: "Wild West Gold",
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    title: "Mega Sic Bo",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    title: "Buffalo King",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  }
];

export default PopularGames;
