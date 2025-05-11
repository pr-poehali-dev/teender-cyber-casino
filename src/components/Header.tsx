import React from "react";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-4 border-b border-cyber-gray/30 backdrop-blur-md bg-cyber-black/60 fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8 mx-4">
          <NavLink href="/" icon="Home">
            Главная
          </NavLink>
          <NavLink href="/game/sweet-bonanza" icon="Gamepad2">
            Игры
          </NavLink>
          <NavLink href="/game/gates-of-olympus" icon="Gift">
            Бонусы
          </NavLink>
          <NavLink href="/game/wolf-gold" icon="Trophy">
            Турниры
          </NavLink>
          <NavLink href="/game/big-bass-bonanza" icon="Wallet">
            Касса
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="relative" aria-label="Уведомления">
            <Icon name="Bell" className="text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full text-[10px] flex items-center justify-center">
              2
            </span>
          </Button>

          <div className="hidden md:block">
            <AuthButtons />
          </div>

          <Button variant="ghost" className="md:hidden" aria-label="Меню">
            <Icon name="Menu" />
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  icon: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children }) => {
  return (
    <Link
      to={href}
      className="flex items-center px-2 py-1 font-medium text-gray-300 hover:text-neon-pink transition-colors"
    >
      <Icon name={icon} className="mr-2 h-4 w-4" />
      <span>{children}</span>
    </Link>
  );
};

export default Header;
