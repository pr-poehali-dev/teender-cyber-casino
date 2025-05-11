
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PopularGames from '@/components/PopularGames';
import PaymentMethods from '@/components/PaymentMethods';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero />
        <PopularGames />
        <PaymentMethods />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
