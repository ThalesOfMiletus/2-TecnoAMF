// app/dashboard/page.tsx
'use client';

import { useMain } from '@/app/pageContext/page';
import StatCard from '@/components/card/page'; // Ajuste o caminho se necessário
import CreatePatientForm from '@/components/createPaciente/page';
import CreateReportView from '@/components/createRelatorio/page';
import PatientsTable from '@/components/patientsTable/page'; // Ajuste o caminho se necessário
import { Users, Paperclip, MonitorSmartphone } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Componente para a visualização da Tela Inicial
const TelaInicialView = () => (
  <>
    {/* Header */}
    <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Nefário 👋</h1>
        <div className="flex items-center gap-4">
            <button className="rounded-lg border border-gray-300 bg-white py-2 px-4 font-semibold text-gray-700 hover:bg-gray-100">
                Criar relatório
            </button>
            <button className="rounded-lg bg-blue-600 py-2 px-4 font-semibold text-white hover:bg-blue-700">
                Criar Paciente
            </button>
        </div>
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
        <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Nefário 👋</h1>
    </div>
    <CreatePatientForm />
  </>
)

const CriarRelatorioView = () => (
  <>
     <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Olá, Dr. Nefário 👋</h1>
    </div>
    <CreateReportView />
  </>
)

// Componente principal que decide qual visualização mostrar
const MainPage = () => {
  const { activeView } = useMain();

  // Renderiza o conteúdo com base na visualização ativa
  const renderContent = () => {
    switch (activeView) {
      case 'tela-inicial':
        return <TelaInicialView />;
      case 'criar-paciente':
        return <CriarPacienteView />; // Conteúdo do componente
      case 'criar-relatorio':
        return <CriarRelatorioView />; // Conteúdo do componente
      case 'historico':
        return <div><h1>Página de Histórico</h1></div>; // Conteúdo do componente
      default:
        return <TelaInicialView />;
    }
  };

  return <>{renderContent()}</>;
};

export default MainPage;