// components/historico/page.tsx
"use client"

import React, { useState, useEffect } from "react";
import api from "@/api/api"; 
import Comparacao  from "@/types/Comparacao"; 
import { Loader2 } from "lucide-react";
import FormattedProgressao from "../comparacao/page"; 

const mockPatients = [
    { id: '1', nome: 'Fernando Soares' },
    { id: '2', nome: 'Jane Cooper' }
];

const CreateComparacaoView = () => {
    const [selectedPatientId, setSelectedPatientId] = useState<string>('');
    const [comparison, setComparison] = useState<Comparacao | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Efeito para limpar o resultado ao trocar de paciente
    useEffect(() => {
        setComparison(null);
        setError(null);
    }, [selectedPatientId]);
    
    const handleGenerateComparison = async () => {
        if (!selectedPatientId) return;

        setIsLoading(true);
        setError(null);
        setComparison(null);

        try {
            // Passo 1: Fazer o POST para iniciar a comparação
            const postResponse = await api.post(`/pacientes/${selectedPatientId}/comparar-panoramicas/`);
            
            // Supondo que o backend retorne o ID da comparação criada
            const comparacaoId = postResponse.data.comparacao_id;
            if (!comparacaoId) {
                throw new Error("O backend não retornou um ID para a comparação.");
            }

            // Passo 2: Fazer o GET para buscar os detalhes da comparação
            const getResponse = await api.get(`/comparacoes/?id=2`);

            if (getResponse.data && getResponse.data.results && getResponse.data.results.length > 0) {
                setComparison(getResponse.data.results[0]);
            } else {
                throw new Error("Não foi possível encontrar o resultado da comparação.");
            }

        } catch (err: any) {
            console.error("Erro ao gerar comparação:", err.response?.data || err.message);
            const errorMessage = err.response?.data?.erro || "Ocorreu um erro ao gerar a comparação. Verifique se o paciente possui pelo menos duas panorâmicas.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mt-8 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto space-y-8">
                <h2 className="text-xl font-semibold text-gray-800">
                    Histórico do paciente
                </h2>
                <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-600 mb-1">
                        Paciente
                    </label>
                    <select
                        id="patientId" 
                        name="patientId"
                        value={selectedPatientId}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        <option value="" disabled>Selecione um paciente</option>
                        {mockPatients.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </div>
                
                {/* Botão de Geração e Feedback */}
                {selectedPatientId && (
                    <div className="border-t pt-6 flex flex-col items-center">
                        <button
                            onClick={handleGenerateComparison}
                            disabled={isLoading}
                            className="rounded-lg bg-blue-600 py-2 px-6 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
                        >
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? "Gerando..." : "Gerar Comparação"}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </div>
                )}
                
                {/* Resultado da Comparação */}
                {comparison && (
                    <div className="border-t pt-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Laudo Comparativo</h3>
                        <FormattedProgressao text={comparison.progressao} />
                    </div>
                )}
            </div>
        </>
    )
}

export default CreateComparacaoView;