// app/main/page.tsx
'use client';

import { useMain } from '@/app/pageContext/pageContext';
import StatCard from '@/components/card/page';
import CreateComparacaoView from '@/components/createComparacao/page';
import CreatePatientForm from '@/components/createPaciente/page';
import CreateReportView from '@/components/createRelatorio/page';
import PatientsTable from '@/components/patientsTable/page';
import { useAuth } from '@/context/AuthContext';
import { Users, Paperclip, MonitorSmartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


// Componente para a visualização da Tela Inicial
const TelaInicialView = () => (
  <>
    {/* Header */}
    <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Silva 👋</h1>
    </div>
    
    {/* Stat Cards */}
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
            icon={<Users className="h-6 w-6 text-teal-500" />} 
            label="Total de pacientes"
            value="5,423"
            color="bg-teal-100"
        />
        <StatCard 
            icon={<Paperclip className="h-6 w-6 text-sky-500" />} 
            label="Panorâmicos Anexados"
            value="1,893"
            color="bg-sky-100"
        />
        <StatCard 
            icon={<MonitorSmartphone className="h-6 w-6 text-indigo-500" />} 
            label="Relatórios Gerados"
            value="189"
            color="bg-indigo-100"
        />
    </div>

    {/* Patients Table */}
    <PatientsTable />
  </>
);

const CriarPacienteView = () => (
  <>
    <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Silva 👋</h1>
    </div>
    <CreatePatientForm />
  </>
)

const CriarRelatorioView = () => (
  <>
     <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Silva 👋</h1>
    </div>
    <CreateReportView />
  </>
)

const HistoricoView = () => (
  <>
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Silva 👋</h1>
    </div>
    <CreateComparacaoView />
  </>
)

// Componente principal que decide qual visualização mostrar
const MainPage = () => {
  const { activeView } = useMain();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("login");
    }
    
  }, [isAuthenticated, router]);

  if (!user && isAuthenticated === null) {
      return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }
  
  if (isAuthenticated) {
    const renderContent = () => {
      switch (activeView) {
        case 'tela-inicial':
          return <TelaInicialView />;
        case 'criar-paciente':
          return <CriarPacienteView />; 
        case 'criar-relatorio':
          return <CriarRelatorioView />;
        case 'historico':
          return <HistoricoView />;
        default:
          return <TelaInicialView />;
      }
    };
  
    return <>{renderContent()}</>;
  }
 
};

export default MainPage;