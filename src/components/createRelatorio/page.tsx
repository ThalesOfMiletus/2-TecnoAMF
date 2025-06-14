// components/report/CreateReportView.tsx
'use client';

import React, { useState } from 'react';
import FileUpload from '../upload/page';
import api from '@/api/api'; 
import { Loader2 } from 'lucide-react'; // Ícone de loading

// Função utilitária para converter File para base64
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});


const mockPatients = [
  { id: '1', nome: 'Fernanda Soares' },
  { id: '2', nome: 'Jane Cooper' },
];

const CreateReportView = () => {
    const [reportData, setReportData] = useState({ patientId: '' });
    const [anexos, setAnexos] = useState<File[]>([]); // Estado para os arquivos
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null); // Estado para a URL do PDF

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReportData(prev => ({ ...prev, [name]: value }));
    };
    
    // Função para receber os arquivos do componente
    const handleFilesChange = (files: File[]) => {
        setAnexos(files);
        setPdfUrl(null); // Reseta o PDF se um novo arquivo for adicionado
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (anexos.length === 0 || !reportData.patientId) {
            setError("Por favor, selecione um paciente e anexe uma imagem.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setPdfUrl(null);

       try {

            // 1. Obter a data atual no formato ISO 8601
            const dataAtualISO = new Date().toISOString();

            // 2. Converter o ID do paciente para um número
            const pacienteIdNumerico = parseInt(reportData.patientId, 10);

            // 3. Converter a imagem para base64
            const file = anexos[0];
            const base64Image = await toBase64(file);

            // 4. Montar o payload com os tipos e formatos
            const payload = {
                paciente: pacienteIdNumerico,
                foto: base64Image,
                data: dataAtualISO,
            };

            // 5. Enviar o payload corrigido para a API
            const createPanoramicaResponse = await api.post('/panoramicas/criar/', payload);


            const panoramicaId = createPanoramicaResponse.data.id;

            // Chamar a geração do relatório
            await api.post(`/panoramicas/${panoramicaId}/gerar-relatorio/`);

            // Obter o PDF do relatório
            const exportPdfResponse = await api.get(`/relatorios/${panoramicaId}/exportar-pdf/`, {
                responseType: 'blob',
            });

            // Criar a URL do PDF
            const pdfBlob = new Blob([exportPdfResponse.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);

        } catch (err: any) {
            console.error("Falha no processo de geração do relatório:", err.response?.data || err.message);
            
            // Tenta extrair a mensagem de erro específica do backend
            const errorMessage = err.response?.data?.detail || err.response?.data?.[Object.keys(err.response?.data)[0]]?.[0] || "Ocorreu um erro. Tente novamente.";
            setError(errorMessage);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto space-y-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações do relatório</h2>
                <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-600 mb-1">Paciente</label>
                    <select
                        id="patientId"
                        name="patientId"
                        value={reportData.patientId}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        <option value="" disabled>Selecione um paciente</option>
                        {mockPatients.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Anexos</h3>
                    <FileUpload onFilesChange={handleFilesChange} />
                </div>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {pdfUrl && (
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Relatório Gerado</h3>
                        <div className="w-full h-[500px] md:h-[700px]">
                            <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
                        </div>
                        <a 
                            href={pdfUrl} 
                            download={`relatorio_paciente_${reportData.patientId}.pdf`}
                            className="mt-4 inline-block text-blue-600 hover:underline"
                        >
                            Download do Relatório (PDF)
                        </a>
                    </div>
                )}
                
                <div className="flex justify-end gap-4 border-t pt-6">
                    <button 
                        type="submit" 
                        className="rounded-lg bg-blue-600 py-2 px-6 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="animate-spin" />}
                        {isLoading ? 'Gerando...' : 'Gerar Relatório'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateReportView;