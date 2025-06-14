"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define os valores que o nosso contexto vai ter
type MainContextType = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [activeView, setActiveView] = useState('tela-inicial'); // Estado inicial

  return (
    <MainContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </MainContext.Provider>
  );
};

// Cria um hook customizado para facilitar o uso do contexto nos componentes
export const useMain = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};