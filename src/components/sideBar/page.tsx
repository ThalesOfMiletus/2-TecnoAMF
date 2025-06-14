"use client"

import {
    Home,
    PlusCircle,
    FileText,
    History,
    User,
    ChevronDown,
} from "lucide-react"
import { useMain } from "@/app/pageContext/page";

const SideBar = () => {
  // Pega o estado e a função para atualizar o estado do contexto
  const { activeView, setActiveView } = useMain();

  // Função auxiliar para classes CSS condicionais
  const getLinkClassName = (viewName: string) => {
    const isActive = activeView === viewName;
    return `flex items-center rounded-lg p-3 font-semibold w-full text-left ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-white text-gray-700 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard <span className="text-gray-400 text-xs">v.1</span></h1>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          <li className="mb-2">
            {/* Usamos botões pois eles mudam o estado da página, não navegam para outra URL */}
            <button onClick={() => setActiveView('tela-inicial')} className={getLinkClassName('tela-inicial')}>
              <Home className="mr-3 h-5 w-5" />
              Tela Inicial
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => setActiveView('criar-paciente')} className={getLinkClassName('criar-paciente')}>
              <PlusCircle className="mr-3 h-5 w-5" />
              Criar paciente
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => setActiveView('criar-relatorio')} className={getLinkClassName('criar-relatorio')}>
              <FileText className="mr-3 h-5 w-5" />
              Criar relatório
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => setActiveView('historico')} className={getLinkClassName('historico')}>
              <History className="mr-3 h-5 w-5" />
              Histórico
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-4 mt-auto"> {/* Adicionado mt-auto para empurrar para baixo */}
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-center text-white">
          <h2 className="font-bold">Upgrade to PRO</h2>
          <p className="mb-4 text-sm">get access all Features!</p>
          <button className="w-full rounded-lg bg-white py-2 font-semibold text-purple-600">
            Get Pro Now!
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 p-4">
        <div className="flex items-center">
            <img src="https://i.pravatar.cc/40?u=nefario" alt="Dr. Nefário" className="h-10 w-10 rounded-full" />
            <div className="ml-3">
                <p className="font-semibold">Nefário</p>
                <p className="text-sm text-gray-500">Cirurgião-Dentista</p>
            </div>
        </div>
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
}

export default SideBar;