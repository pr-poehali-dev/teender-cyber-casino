
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const AuthButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex gap-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="cyber-blue-button">
            Войти
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card max-w-md border-neon-blue">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-orbitron neon-blue-text mb-2">
              Доступ в TEENDER
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Войдите или создайте аккаунт для доступа ко всем функциям
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="font-orbitron">Вход</TabsTrigger>
              <TabsTrigger value="register" className="font-orbitron">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" className="border-cyber-gray" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
                <Input id="password" type="password" className="border-cyber-gray" />
              </div>
              <Button type="submit" className="w-full mt-6 cyber-blue-button">
                <Icon name="LogIn" className="mr-2" />
                Войти
              </Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-sm font-medium">Email</Label>
                <Input id="reg-email" type="email" className="border-cyber-gray" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-sm font-medium">Пароль</Label>
                <Input id="reg-password" type="password" className="border-cyber-gray" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium">Подтвердите пароль</Label>
                <Input id="confirm-password" type="password" className="border-cyber-gray" />
              </div>
              <Button type="submit" className="w-full mt-6 cyber-purple-button">
                <Icon name="UserPlus" className="mr-2" />
                Создать аккаунт
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="cyber-button">
            Регистрация
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card max-w-md border-neon-pink">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-orbitron neon-text mb-2">
              Создать аккаунт
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Зарегистрируйтесь и получите бонус для новых игроков
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-email" className="text-sm font-medium">Email</Label>
              <Input id="new-email" type="email" className="border-cyber-gray" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium">Пароль</Label>
              <Input id="new-password" type="password" className="border-cyber-gray" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-confirm" className="text-sm font-medium">Подтвердите пароль</Label>
              <Input id="new-confirm" type="password" className="border-cyber-gray" />
            </div>
            <Button type="submit" className="w-full mt-6 cyber-button">
              <Icon name="Rocket" className="mr-2" />
              Зарегистрироваться
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthButtons;
