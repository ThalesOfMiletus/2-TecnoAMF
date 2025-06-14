// components/dashboard/PatientsTable.tsx
"use client";

import Panoramica from "@/types/Panoramica";
import Paciente from "@/types/Paciente";
import PatientRow from "../patientsRow/page";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const mockPatients: Paciente[] = [
  {
    id: 1,
    nome: "Fernanda Soares",
    cpf: "043.082.250-27",
    celular: "(55) 99937-4698",
    email: "nandasoares2657@gmail.com",
    endereço: "Recanto Maestro",
    Panoramicas: [],
  },
  {
    id: 2,
    nome: "Floyd Miles",
    cpf: "455.443.420-67",
    celular: "(205) 555-0100",
    email: "floyd@yahoo.com",
    endereço: "Kiribati",
    Panoramicas: [],
  },
  {
    id: 3,
    nome: "Ronald Richards",
    cpf: "455.443.420-67",
    celular: "(302) 555-0107",
    email: "ronald@adobe.com",
    endereço: "Israel",
    Panoramicas: [],
  },
  {
    id: 4,
    nome: "Marvin McKinney",
    cpf: "455.443.420-67",
    celular: "(252) 555-0126",
    email: "marvin@tesla.com",
    endereço: "Iran",
    Panoramicas: [],
  },
  {
    id: 5,
    nome: "Jerome Bell",
    cpf: "455.443.420-67",
    celular: "(629) 555-0129",
    email: "jerome@google.com",
    endereço: "Réunion",
    Panoramicas: [],
  },
  {
    id: 6,
    nome: "Kathryn Murphy",
    cpf: "455.443.420-67",
    celular: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    endereço: "Curaçao",
    Panoramicas: [],
  },
  {
    id: 7,
    nome: "Jacob Jones",
    cpf: "455.443.420-67",
    celular: "(208) 555-0112",
    email: "jacob@yahoo.com",
    endereço: "Brazil",
    Panoramicas: [],
  },
  {
    id: 8,
    nome: "Kristin Watson",
    cpf: "455.443.420-67",
    celular: "(704) 555-0127",
    email: "kristin@facebook.com",
    endereço: "Åland Islands",
    Panoramicas: [],
  },
];

const PatientsTable = () => {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Todos os Pacientes
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Short by:</span>
            <button className="flex items-center font-semibold text-gray-800">
              Newest <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200 text-sm uppercase text-gray-500">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">CPF</th>
              <th className="px-6 py-3">Número de telefone</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Endereço</th>
              <th className="px-6 py-3">Histórico</th>
            </tr>
          </thead>
          <tbody>
            {mockPatients.map((patient) => (
              <PatientRow key={patient.id} patient={patient} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <p>Exibindo dados de 1 a 8 de 258 mil entradas</p>
        <div className="flex items-center gap-1">
          <button
            className="rounded p-2 hover:bg-gray-100 disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="rounded bg-blue-500 px-4 py-2 text-white">
            1
          </button>
          <button className="rounded px-4 py-2 hover:bg-gray-100">2</button>
          <button className="rounded px-4 py-2 hover:bg-gray-100">3</button>
          <span className="px-2">...</span>
          <button className="rounded px-4 py-2 hover:bg-gray-100">40</button>
          <button className="rounded p-2 hover:bg-gray-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsTable;
