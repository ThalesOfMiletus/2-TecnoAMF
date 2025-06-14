// app/main/layout.tsx
'use client'; 

import { MainProvider } from "@/app/pageContext/pageContext";
import SideBar from "@/components/sideBar/page";
import React from "react";

// Este componente de layout envolve a página 'app/main/page.tsx'
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //Componente SideBar somente será mostrado na rota main
    <MainProvider>
      <div className="flex h-screen bg-gray-50">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-8">
          {children} 
        </main>
      </div>
    </MainProvider>
  );
}