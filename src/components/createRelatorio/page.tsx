// components/report/CreateReportView.tsx
'use client';

import React, { useState } from 'react';
import FileUpload from '../upload/page';

// Mock de dados de pacientes. Em um app real, isso viria de uma API.
const mockPatients = [
  { id: '1', name: 'Fernanda Soares' },
  { id: '2', name: 'Jane Cooper' },
  { id: '3', name: 'Floyd Miles' },
  { id: '4', name: 'Jacob Jones' },
];

const CreateReportView = () => {
    const [reportData, setReportData] = useState({
        patientId: '',
        content: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReportData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Gerando relatório com os dados:", reportData);
        alert("Relatório gerado com sucesso! (Verifique o console)");
    }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto space-y-8">
        {/* Seção de Seleção de Paciente e Título */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Informações do relatório
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-600 mb-1">
                    Paciente
                </label>
                <select 
                    id="patientId" 
                    name="patientId"
                    value={reportData.patientId}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="" disabled>Selecione um paciente</option>
                    {mockPatients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
        </div>
        
        {/* Seção de Anexos */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Anexos</h3>
            <FileUpload />
        </div>
        
        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 border-t pt-6">
            <button type="submit" className="rounded-lg bg-blue-600 py-2 px-6 font-semibold text-white hover:bg-blue-700">
                Gerar Relatório
            </button>
        </div>
      </form>
    </>
  );
};

export default CreateReportView;