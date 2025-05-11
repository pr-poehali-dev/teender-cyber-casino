
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

const PaymentMethods = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-orbitron font-bold neon-purple-text text-center mb-8">
        Пополнение и вывод средств
      </h2>
      
      <Tabs defaultValue="deposit" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="deposit" className="text-lg py-3 font-orbitron">
            <Icon name="ArrowDownToLine" className="mr-2" />
            Пополнить
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="text-lg py-3 font-orbitron">
            <Icon name="ArrowUpFromLine" className="mr-2" />
            Вывести
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="glass-card p-6 border-neon-purple/30">
          <h3 className="text-xl font-medium text-white mb-4">Выберите способ пополнения</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {paymentMethods.map((method, index) => (
              <PaymentMethodCard
                key={index}
                name={method.name}
                icon={method.icon}
                isSBP={method.isSBP}
              />
            ))}
          </div>
          
          <div className="bg-cyber-black p-4 rounded-lg mb-6">
            <h4 className="font-medium text-neon-purple mb-2">СБП - Система Быстрых Платежей</h4>
            <p className="text-gray-300 text-sm mb-4">
              Мгновенное пополнение через банковское приложение. Минимальная сумма: 500₽. Без комиссии.
            </p>
            <Button className="cyber-purple-button w-full md:w-auto">
              <Icon name="Zap" className="mr-2" />
              Пополнить через СБП
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Icon name="Shield" className="text-neon-green" />
              <span>Безопасные платежи с шифрованием</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Icon name="Clock" className="text-neon-blue" />
              <span>Мгновенное зачисление средств</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Icon name="BadgePercent" className="text-neon-pink" />
              <span>Бонус +15% при первом пополнении от 1000₽</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="withdraw" className="glass-card p-6 border-neon-purple/30">
          <h3 className="text-xl font-medium text-white mb-4">Вывод средств</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {withdrawMethods.map((method, index) => (
              <PaymentMethodCard
                key={index}
                name={method.name}
                icon={method.icon}
                isSBP={method.isSBP}
              />
            ))}
          </div>
          
          <div className="bg-cyber-black p-4 rounded-lg mb-6">
            <h4 className="font-medium text-neon-purple mb-2">СБП - Вывод на карту</h4>
            <p className="text-gray-300 text-sm mb-4">
              Быстрый вывод средств на банковскую карту. Минимальная сумма: 1000₽. Срок зачисления: до 24 часов.
            </p>
            <Button className="cyber-purple-button w-full md:w-auto">
              <Icon name="Banknote" className="mr-2" />
              Вывести на карту
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Icon name="Clock3" className="text-neon-blue" />
              <span>Вывод в течение 24 часов</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Icon name="AlertCircle" className="text-neon-pink" />
              <span>Перед выводом необходимо верифицировать аккаунт</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

interface PaymentMethodCardProps {
  name: string;
  icon: string;
  isSBP?: boolean;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ name, icon, isSBP }) => {
  return (
    <Card className={`border ${isSBP ? 'border-neon-purple' : 'border-cyber-gray'} cursor-pointer hover:border-neon-blue transition-colors`}>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <Icon name={icon} size={32} className={`mb-2 ${isSBP ? 'text-neon-purple' : 'text-gray-300'}`} />
        <p className="text-sm text-center">{name}</p>
        {isSBP && (
          <span className="text-xs text-neon-purple mt-1">Рекомендуем</span>
        )}
      </CardContent>
    </Card>
  );
};

const paymentMethods = [
  { name: "СБП", icon: "Zap", isSBP: true },
  { name: "Банковская карта", icon: "CreditCard" },
  { name: "Qiwi", icon: "Wallet" },
  { name: "ЮMoney", icon: "Wallet" },
  { name: "WebMoney", icon: "Globe" },
  { name: "Криптовалюта", icon: "Bitcoin" },
  { name: "Мобильный платеж", icon: "Smartphone" },
  { name: "Другие методы", icon: "MoreHorizontal" },
];

const withdrawMethods = [
  { name: "СБП", icon: "Zap", isSBP: true },
  { name: "Банковская карта", icon: "CreditCard" },
  { name: "Qiwi", icon: "Wallet" },
  { name: "ЮMoney", icon: "Wallet" },
  { name: "WebMoney", icon: "Globe" },
  { name: "Криптовалюта", icon: "Bitcoin" },
];

export default PaymentMethods;
