
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

type GameType = {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  rtp: number;
  volatility: 'Низкая' | 'Средняя' | 'Высокая';
  minBet: number;
  maxBet: number;
  features: string[];
  iframe: string;
};

const GamePlay = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBet, setCurrentBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    // Поиск игры по ID (в реальном приложении это был бы запрос к API)
    const foundGame = gamesData.find(g => g.id === gameId);
    
    if (foundGame) {
      setGame(foundGame);
      document.title = `${foundGame.title} - TEENDER Casino`;
    } else {
      toast({
        title: "Игра не найдена",
        description: "Запрошенная игра не существует или была удалена",
        variant: "destructive"
      });
      navigate('/');
    }
    
    setIsLoading(false);
  }, [gameId, navigate]);
  
  const handleSpin = () => {
    if (balance < currentBet) {
      toast({
        title: "Недостаточно средств",
        description: "Пополните баланс для продолжения игры",
        variant: "destructive"
      });
      return;
    }
    
    setIsPlaying(true);
    setBalance(prev => prev - currentBet);
    
    // Симуляция результата спина
    setTimeout(() => {
      const win = Math.random() > 0.6; // 40% шанс выигрыша
      const multiplier = win ? (Math.random() * 3 + 1) : 0; // Случайный множитель от 1 до 4
      const winAmount = Math.floor(currentBet * multiplier);
      
      if (win) {
        toast({
          title: "Поздравляем!",
          description: `Вы выиграли ${winAmount} ₽!`,
        });
        setBalance(prev => prev + winAmount);
      }
      
      setIsPlaying(false);
      
      if (isAutoplay) {
        setTimeout(handleSpin, 1500);
      }
    }, 2000);
  };
  
  const toggleAutoplay = () => {
    if (!isAutoplay && !isPlaying) {
      setIsAutoplay(true);
      handleSpin();
    } else {
      setIsAutoplay(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-neon-pink border-cyber-gray rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-400">Загрузка игры...</p>
        </div>
      </div>
    );
  }
  
  if (!game) return null;
  
  return (
    <div className="flex flex-col min-h-screen bg-cyber-black">
      <Header />
      
      <main className="flex-grow pt-20 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-orbitron neon-blue-text">{game.title}</h1>
          <Badge variant="outline" className="ml-auto bg-cyber-black border-neon-pink text-neon-pink">
            {game.provider}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 glass-card p-1 border-cyber-gray/50 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <div className="relative w-full h-[60vh] bg-black">
              {/* В реальности здесь будет iframe или интеграция с игровым провайдером */}
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe
                  src={isPlaying ? game.iframe : "about:blank"}
                  className="w-full h-full"
                  title={game.title}
                  allowFullScreen
                  style={{display: 'block'}}
                />
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-cyber-black/90">
                    <img 
                      src={game.imageUrl} 
                      alt={game.title} 
                      className="w-full h-full object-cover opacity-40 absolute inset-0"
                    />
                    <div className="relative z-10 text-center">
                      <div className="animate-pulse mb-4">
                        <Icon name="Play" size={64} className="text-neon-pink" />
                      </div>
                      <h3 className="text-2xl font-orbitron text-white mb-2">Нажмите SPIN, чтобы начать</h3>
                      <p className="text-gray-400 mb-4">Баланс: {balance} ₽</p>
                      <Button 
                        onClick={handleSpin} 
                        className="cyber-button px-12 py-6 text-xl"
                      >
                        <Icon name="Zap" className="mr-2" />
                        SPIN
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-cyber-black border-t border-cyber-gray/30 flex items-center justify-between p-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Баланс</p>
                  <p className="text-xl font-bold neon-blue-text">{balance} ₽</p>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-400">Ставка</p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 p-0 border-cyber-gray"
                      onClick={() => setCurrentBet(prev => Math.max(game.minBet, prev - 10))}
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="text-xl font-bold neon-pink-text" style={{minWidth: '60px'}}>{currentBet}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 p-0 border-cyber-gray"
                      onClick={() => setCurrentBet(prev => Math.min(game.maxBet, prev + 10))}
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="w-40">
                  <Slider
                    defaultValue={[currentBet]}
                    min={game.minBet}
                    max={game.maxBet}
                    step={5}
                    value={[currentBet]}
                    onValueChange={(vals) => setCurrentBet(vals[0])}
                    className="py-2"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={isAutoplay ? "default" : "outline"} 
                  className={isAutoplay ? "cyber-purple-button" : "border-cyber-gray"}
                  onClick={toggleAutoplay}
                >
                  <Icon name="Repeat" className="mr-2" />
                  Автоигра
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="border-cyber-gray"
                  onClick={() => setIsMuted(prev => !prev)}
                >
                  <Icon name={isMuted ? "VolumeX" : "Volume2"} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="border-cyber-gray"
                  onClick={() => setIsFullscreen(prev => !prev)}
                >
                  <Icon name={isFullscreen ? "Minimize" : "Maximize"} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass-card p-4 border-cyber-gray/50 mb-6">
              <h3 className="font-orbitron text-lg mb-4 text-white">Информация об игре</h3>
              
              <div className="space-y-4">
                <InfoItem label="Провайдер" value={game.provider} />
                <InfoItem label="RTP" value={`${game.rtp}%`} />
                <InfoItem label="Волатильность" value={game.volatility} />
                <InfoItem label="Мин. ставка" value={`${game.minBet} ₽`} />
                <InfoItem label="Макс. ставка" value={`${game.maxBet} ₽`} />
              </div>
              
              <h4 className="font-medium text-white mt-6 mb-2">Особенности:</h4>
              <div className="flex flex-wrap gap-2">
                {game.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="border-neon-blue text-neon-blue">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-4 border-cyber-gray/50">
              <h3 className="font-orbitron text-lg mb-4 text-white">Пополнить баланс</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full border-cyber-gray">
                    100 ₽
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-gray">
                    500 ₽
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-gray">
                    1000 ₽
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-gray">
                    5000 ₽
                  </Button>
                </div>
                
                <Button className="w-full cyber-button">
                  <Icon name="Wallet" className="mr-2" />
                  Пополнить
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-orbitron neon-blue-text mb-4">Похожие игры</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gamesData.filter(g => g.id !== gameId).slice(0, 6).map((similarGame) => (
              <div 
                key={similarGame.id} 
                className="glass-card p-1 border-cyber-gray/30 cursor-pointer hover:border-neon-blue overflow-hidden transition-all group"
                onClick={() => navigate(`/game/${similarGame.id}`)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={similarGame.imageUrl} 
                    alt={similarGame.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent"></div>
                  <p className="absolute bottom-2 left-2 right-2 text-sm font-medium text-white truncate">
                    {similarGame.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
};

// Данные о играх (в реальном приложении это бы загружалось из API)
const gamesData: GameType[] = [
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.51,
    volatility: "Высокая",
    minBet: 5,
    maxBet: 2000,
    features: ["Множители", "Free Spins", "Scatter", "Tumble"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs20fruitsw&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "gates-of-olympus",
    title: "Gates of Olympus",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.50,
    volatility: "Высокая",
    minBet: 10,
    maxBet: 2500,
    features: ["Множители", "Free Spins", "Tumble", "Бонусная игра"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs20olympgate&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "wolf-gold",
    title: "Wolf Gold",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1564052718462-01728aa9efa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.00,
    volatility: "Средняя",
    minBet: 5,
    maxBet: 1250,
    features: ["Free Spins", "Респины", "Джекпот", "Дикие символы"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs25wolfgold&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "the-dog-house",
    title: "The Dog House",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1518914781460-9b936b97679c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.51,
    volatility: "Высокая",
    minBet: 10,
    maxBet: 2000,
    features: ["Множители", "Free Spins", "Дикие символы", "Sticky Wilds"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs20doghouse&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "great-rhino",
    title: "Great Rhino",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.53,
    volatility: "Средняя",
    minBet: 5,
    maxBet: 1500,
    features: ["Free Spins", "Респины", "Супер Респин", "Джекпот"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs20rhino&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "big-bass-bonanza",
    title: "Big Bass Bonanza",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1580684056138-d1184221795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.71,
    volatility: "Высокая",
    minBet: 10,
    maxBet: 2000,
    features: ["Free Spins", "Множители", "Денежные символы", "Бонусная игра"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs10bbbonanza&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "fruit-party",
    title: "Fruit Party",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.50,
    volatility: "Высокая",
    minBet: 5,
    maxBet: 1000,
    features: ["Множители", "Free Spins", "Tumble", "Разброс"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs20fruitparty&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "wild-west-gold",
    title: "Wild West Gold",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.51,
    volatility: "Высокая",
    minBet: 10,
    maxBet: 2500,
    features: ["Множители", "Free Spins", "Wild Multipliers", "Sticky Wilds"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs40wildwest&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  },
  {
    id: "buffalo-king",
    title: "Buffalo King",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rtp: 96.06,
    volatility: "Высокая",
    minBet: 20,
    maxBet: 3000,
    features: ["Free Spins", "Множители", "Дикие символы", "Scatter"],
    iframe: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=USD&gameSymbol=vs4096bufking&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&lobbyURL=https%3A%2F%2Fwww.pragmaticplay.com"
  }
];

export default GamePlay;
</current-code>

<pp-write filepath="src/components/GameList.tsx">
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import GameCard from './GameCard';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type ProviderType = {
  name: string;
  logo: string;
  count: number;
};

type GameType = {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  isPopular: boolean;
  category: string[];
};

const GameList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };
  
  // Фильтрация игр
  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || game.provider === selectedProvider;
    const matchesCategory = selectedCategory === 'all' || game.category.includes(selectedCategory);
    
    return matchesSearch && matchesProvider && matchesCategory;
  });
  
  return (
    <section className="py-16 container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-orbitron font-bold neon-blue-text mb-8">
        Все игры
      </h1>
      
      <div className="glass-card p-6 border-cyber-gray/30 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Поиск игры</h3>
            <div className="relative">
              <Input 
                placeholder="Название игры..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-cyber-gray"
              />
              <Icon name="Search" className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Провайдер</h3>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="border-cyber-gray">
                <SelectValue placeholder="Выберите провайдера" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все провайдеры</SelectItem>
                <SelectItem value="Pragmatic Play">Pragmatic Play</SelectItem>
                <SelectItem value="Evolution">Evolution</SelectItem>
                <SelectItem value="NetEnt">NetEnt</SelectItem>
                <SelectItem value="Play'n GO">Play'n GO</SelectItem>
                <SelectItem value="Novomatic">Novomatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Категория</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-cyber-gray">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="slots">Слоты</SelectItem>
                <SelectItem value="jackpot">Джекпоты</SelectItem>
                <SelectItem value="table">Настольные</SelectItem>
                <SelectItem value="live">Live Casino</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button className="w-full cyber-blue-button" onClick={() => {
              setSearchQuery('');
              setSelectedProvider('all');
              setSelectedCategory('all');
            }}>
              <Icon name="RotateCcw" className="mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-orbitron text-white mb-4">Провайдеры</h3>
        <div className="overflow-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {providers.map((provider) => (
              <ProviderCard 
                key={provider.name}
                provider={provider}
                isActive={provider.name === selectedProvider}
                onClick={() => setSelectedProvider(
                  provider.name === selectedProvider ? 'all' : provider.name
                )}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryBadge
            key={category.value}
            category={category}
            isActive={category.value === selectedCategory}
            onClick={() => setSelectedCategory(
              category.value === selectedCategory ? 'all' : category.value
            )}
          />
        ))}
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-400">
          Найдено игр: <span className="text-white font-medium">{filteredGames.length}</span>
        </p>
        
        <Select defaultValue="popular">
          <SelectTrigger className="w-[180px] border-cyber-gray">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">По популярности</SelectItem>
            <SelectItem value="new">Новые</SelectItem>
            <SelectItem value="a-z">По алфавиту (А-Я)</SelectItem>
            <SelectItem value="z-a">По алфавиту (Я-А)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredGames.map((game) => (
            <div 
              key={game.id} 
              onClick={() => handleGameClick(game.id)}
              className="cursor-pointer"
            >
              <GameCard 
                title={game.title}
                imageUrl={game.imageUrl}
                provider={game.provider}
                isPopular={game.isPopular}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Игры не найдены</h3>
          <p className="text-gray-400 mb-4">
            Попробуйте изменить параметры поиска или сбросить фильтры
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setSelectedProvider('all');
              setSelectedCategory('all');
            }}
          >
            <Icon name="RotateCcw" className="mr-2" />
            Сбросить фильтры
          </Button>
        </div>
      )}
    </section>
  );
};

interface ProviderCardProps {
  provider: ProviderType;
  isActive: boolean;
  onClick: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, isActive, onClick }) => {
  return (
    <div 
      className={`glass-card p-4 border-2 min-w-36 cursor-pointer transition-all ${isActive ? 'border-neon-blue' : 'border-cyber-gray/30'}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <Icon name={provider.logo} size={38} className={isActive ? 'text-neon-blue' : 'text-gray-400'} />
        </div>
        <p className={`text-sm font-medium ${isActive ? 'text-neon-blue' : 'text-white'}`}>{provider.name}</p>
        <span className="text-xs text-gray-400">{provider.count} игр</span>
      </div>
    </div>
  );
};

interface CategoryBadgeProps {
  category: { name: string; value: string; icon: string };
  isActive: boolean;
  onClick: () => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, isActive, onClick }) => {
  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className={`cursor-pointer text-sm py-1.5 px-3 ${isActive ? 'bg-neon-blue text-cyber-black hover:bg-neon-blue/90' : 'border-cyber-gray text-gray-300 hover:bg-cyber-gray/20'}`}
      onClick={onClick}
    >
      <Icon name={category.icon} size={14} className="mr-1.5" />
      {category.name}
    </Badge>
  );
};

// Данные о провайдерах (в реальном приложении это бы загружалось из API)
const providers: ProviderType[] = [
  { name: "Pragmatic Play", logo: "Zap", count: 157 },
  { name: "Evolution", logo: "Dices", count: 89 },
  { name: "NetEnt", logo: "Sparkles", count: 115 },
  { name: "Play'n GO", logo: "Gamepad2", count: 94 },
  { name: "Novomatic", logo: "Gem", count: 78 },
  { name: "Microgaming", logo: "Crown", count: 167 },
  { name: "Playtech", logo: "Diamond", count: 122 },
  { name: "Amatic", logo: "Rocket", count: 64 }
];

// Категории игр
const categories = [
  { name: "Слоты", value: "slots", icon: "AlignJustify" },
  { name: "Джекпоты", value: "jackpot", icon: "Trophy" },
  { name: "Настольные", value: "table", icon: "DraftingCompass" },
  { name: "Live Casino", value: "live", icon: "Video" },
  { name: "Новые", value: "new", icon: "Star" },
  { name: "Популярные", value: "popular", icon: "Flame" }
];

// Данные об играх (в реальном приложении это бы загружалось из API)
const allGames: GameType[] = [
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular"]
  },
  {
    id: "gates-of-olympus",
    title: "Gates of Olympus",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular", "jackpot"]
  },
  {
    id: "wolf-gold",
    title: "Wolf Gold",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1564052718462-01728aa9efa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots", "jackpot"]
  },
  {
    id: "the-dog-house",
    title: "The Dog House",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1518914781460-9b936b97679c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular"]
  },
  {
    id: "great-rhino",
    title: "Great Rhino",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots"]
  },
  {
    id: "big-bass-bonanza",
    title: "Big Bass Bonanza",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1580684056138-d1184221795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular", "new"]
  },
  {
    id: "fruit-party",
    title: "Fruit Party",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots", "new"]
  },
  {
    id: "wild-west-gold",
    title: "Wild West Gold",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots"]
  },
  {
    id: "mega-sic-bo",
    title: "Mega Sic Bo",
    provider: "Evolution",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["live", "table", "popular"]
  },
  {
    id: "buffalo-king",
    title: "Buffalo King",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots"]
  },
  {
    id: "lightning-roulette",
    title: "Lightning Roulette",
    provider: "Evolution",
    imageUrl: "https://images.unsplash.com/photo-1606167668584-78701503c1e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["live", "table", "popular"]
  },
  {
    id: "starburst",
    title: "Starburst",
    provider: "NetEnt",
    imageUrl: "https://images.unsplash.com/photo-1518709911915-712d5fd04677?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular"]
  },
  {
    id: "book-of-dead",
    title: "Book of Dead",
    provider: "Play'n GO",
    imageUrl: "https://images.unsplash.com/photo-1577724513224-ad4687652eae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular"]
  },
  {
    id: "gonzo-quest",
    title: "Gonzo's Quest",
    provider: "NetEnt",
    imageUrl: "https://images.unsplash.com/photo-1594777096581-57289c97bb89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots"]
  },
  {
    id: "crazy-time",
    title: "Crazy Time",
    provider: "Evolution",
    imageUrl: "https://images.unsplash.com/photo-1560253414-f65d1f5a1a37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["live", "table", "popular"]
  },
  {
    id: "money-train-2",
    title: "Money Train 2",
    provider: "Relax Gaming",
    imageUrl: "https://images.unsplash.com/photo-1501613204911-d3e3fca3255b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular", "new"]
  },
  {
    id: "reactoonz",
    title: "Reactoonz",
    provider: "Play'n GO",
    imageUrl: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots"]
  },
  {
    id: "blackjack-vip",
    title: "Blackjack VIP",
    provider: "Evolution",
    imageUrl: "https://images.unsplash.com/photo-1606167668584-78701503c1e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["live", "table"]
  },
  {
    id: "book-of-ra",
    title: "Book of Ra",
    provider: "Novomatic",
    imageUrl: "https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    category: ["slots", "popular"]
  },
  {
    id: "john-hunter",
    title: "John Hunter and the Book of Tut",
    provider: "Pragmatic Play",
    imageUrl: "https://images.unsplash.com/photo-1505236732171-72a5b19c4981?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    category: ["slots", "new"]
  }
];

export default GameList;
</current-code>

<pp-write filepath="src/pages/GamesPage.tsx">
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameList from '@/components/GameList';

const GamesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        <GameList />
      </main>
      
      <Footer />
    </div>
  );
};

export default GamesPage;
</current-code>

<pp-write filepath="src/components/PopularGames.tsx" partial>
import React from 'react';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const PopularGames = () => {
  const navigate = useNavigate();
  
  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };
  
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-orbitron font-bold neon-blue-text">
          Популярные игры
        </h2>
        <Button 
          variant="outline" 
          className="cyber-blue-button"
          onClick={() => navigate('/games')}
        >
          <span>Все игры</span>
          <Icon name="ChevronRight" className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {games.map((game, index) => (
          <div 
            key={index}
            onClick={() => handleGameClick(game.id)}
            className="cursor-pointer"
          >
            <GameCard 
              title={game.title}
              imageUrl={game.imageUrl}
              provider={game.provider}
              isPopular={game.isPopular}
            />
          </div>
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
            <Button className="cyber-button whitespace-nowrap" onClick={() => navigate('/games')}>
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
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    imageUrl: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    id: "gates-of-olympus",
    title: "Gates of Olympus",
    imageUrl: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    id: "wolf-gold",
    title: "Wolf Gold",
    imageUrl: "https://images.unsplash.com/photo-1564052718462-01728aa9efa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    id: "the-dog-house",
    title: "The Dog House",
    imageUrl: "https://images.unsplash.com/photo-1518914781460-9b936b97679c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    id: "great-rhino",
    title: "Great Rhino",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    id: "big-bass-bonanza",
    title: "Big Bass Bonanza",
    imageUrl: "https://images.unsplash.com/photo-1580684056138-d1184221795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    id: "fruit-party",
    title: "Fruit Party",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    id: "wild-west-gold",
    title: "Wild West Gold",
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  },
  {
    id: "mega-sic-bo",
    title: "Mega Sic Bo",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: true
  },
  {
    id: "buffalo-king",
    title: "Buffalo King",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Pragmatic Play",
    isPopular: false
  }
];

export default PopularGames;
