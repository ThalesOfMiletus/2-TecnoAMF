// components/dashboard/PatientRow.tsx

import Paciente from "@/types/Paciente";

type PatientRowProps = {
  patient: Paciente;
};


const PatientRow = ({ patient }: PatientRowProps) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6 text-gray-800">{patient.id}</td>
      <td className="py-4 px-6 font-medium text-gray-800">{patient.nome}</td>
      <td className="py-4 px-6 text-gray-600">{patient.cpf}</td>
      <td className="py-4 px-6 text-gray-600">{patient.celular}</td>
      <td className="py-4 px-6 text-gray-600">{patient.email}</td>
      <td className="py-4 px-6 text-gray-600">{patient.endereço}</td>
      <button className="bg-blue-600 rounded px-2 mt-4 hover:bg-blue-400 cursor-pointer transition-colors">Ver histórico</button>
    </tr>
  );
};

export default PatientRow;
