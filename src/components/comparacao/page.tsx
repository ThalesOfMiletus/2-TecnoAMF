// components/historico/FormattedProgressao.tsx
import React from 'react';

interface Props {
  text: string;
}

const FormattedProgressao = ({ text }: Props) => {
  // Quebra o texto em linhas e remove linhas vazias
  const lines = text.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="prose prose-sm max-w-none text-gray-700 space-y-2">
      {lines.map((line, index) => {
        // Formatação simples baseada nos padrões do texto
        if (line.match(/^\d+\. \*\*.+\*\*:/)) { // Ex: 1. **Dentição:
          return <h4 key={index} className="font-bold text-gray-800 mt-4 mb-2">{line.replace(/\*+/g, '')}</h4>;
        }
        if (line.startsWith('*')) { // Ex: *DADOS DO PACIENTE
          return <h3 key={index} className="font-semibold text-lg text-gray-900 border-b pb-1 mb-3">{line.replace(/\*/g, '')}</h3>;
        }
        if (line.startsWith('-')) { // Ex: - Extrações/Perdas dentárias...
          return <p key={index} className="pl-4">{line}</p>;
        }
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
};

export default FormattedProgressao;