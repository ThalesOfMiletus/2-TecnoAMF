// components/dashboard/PatientRow.tsx
import { Patient } from '@/types';

type PatientRowProps = {
  patient: Patient;
};

const PatientRow = ({ patient }: PatientRowProps) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6 font-medium text-gray-800">{patient.name}</td>
      <td className="py-4 px-6 text-gray-600">{patient.cpf}</td>
      <td className="py-4 px-6 text-gray-600">{patient.phone}</td>
      <td className="py-4 px-6 text-gray-600">{patient.email}</td>
      <td className="py-4 px-6 text-gray-600">{patient.country}</td>
      <td className="py-4 px-6">
        <button className="rounded-lg bg-teal-100 py-2 px-4 font-semibold text-teal-600 hover:bg-teal-200">
          Ver Relatórios
        </button>
      </td>
    </tr>
  );
};

export default PatientRow;
