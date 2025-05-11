
import React from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-cyber-black border-t border-cyber-gray/30 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Logo withTagline size="md" className="mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              TEENDER - киберпанк казино с быстрыми выплатами и лучшими играми от ведущих провайдеров.
            </p>
            <div className="flex space-x-3">
              <SocialButton icon="Instagram" />
              <SocialButton icon="Twitter" />
              <SocialButton icon="Facebook" />
              <SocialButton icon="Telegram" />
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron text-white text-lg mb-4">Игры</h4>
            <ul className="space-y-2">
              <FooterLink href="/games/slots">Слоты</FooterLink>
              <FooterLink href="/games/live">Live Казино</FooterLink>
              <FooterLink href="/games/table">Настольные игры</FooterLink>
              <FooterLink href="/games/jackpot">Джекпоты</FooterLink>
              <FooterLink href="/games/new">Новые игры</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-orbitron text-white text-lg mb-4">Информация</h4>
            <ul className="space-y-2">
              <FooterLink href="/bonuses">Бонусы</FooterLink>
              <FooterLink href="/tournaments">Турниры</FooterLink>
              <FooterLink href="/vip">VIP-программа</FooterLink>
              <FooterLink href="/payments">Платежи</FooterLink>
              <FooterLink href="/about">О нас</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-orbitron text-white text-lg mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/terms">Правила и условия</FooterLink>
              <FooterLink href="/responsible">Ответственная игра</FooterLink>
              <FooterLink href="/privacy">Конфиденциальность</FooterLink>
              <FooterLink href="/contact">Контакты</FooterLink>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-cyber-gray/30" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
            <img src="/images/payment/mastercard.svg" alt="MasterCard" className="h-6" />
            <img src="/images/payment/mir.svg" alt="MIR" className="h-6" />
            <img src="/images/payment/qiwi.svg" alt="QIWI" className="h-6" />
            <img src="/images/payment/sbp.svg" alt="СБП" className="h-6" />
            <img src="/images/payment/yoomoney.svg" alt="ЮMoney" className="h-6" />
          </div>
          
          <div className="flex gap-2 items-center">
            <img src="/images/providers/pragmatic.svg" alt="Pragmatic Play" className="h-5" />
            <img src="/images/providers/evolution.svg" alt="Evolution" className="h-5" />
            <img src="/images/providers/netent.svg" alt="NetEnt" className="h-5" />
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 TEENDER Casino. Все права защищены. Игра на реальные деньги доступна только для лиц старше 18 лет.
        </p>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-gray-400 hover:text-neon-pink transition-colors text-sm"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialButtonProps {
  icon: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9 rounded-full hover:bg-cyber-gray hover:text-neon-pink"
    >
      <Icon name={icon} size={18} />
    </Button>
  );
};

export default Footer;
