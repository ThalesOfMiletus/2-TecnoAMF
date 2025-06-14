// src/pages/login.tsx
"use client"

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // Use 'username' em vez de 'email' para corresponder ao backend
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Importa a função signIn do nosso contexto de autenticação
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Chama a função signIn do AuthContext com as credenciais
      await signIn({ username, password });
      // O redirecionamento para '/dashboard' já é feito dentro do AuthContext
    } catch (err) {
      // Se o signIn falhar, ele lança um erro que capturamos aqui
      setError("Usuário ou senha inválidos.");
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className='bg-gray-100 text-gray-800 flex flex-col min-h-screen items-center justify-center'>
      <div className='border border-gray-800 p-8 rounded-lg shadow-lg bg-white w-full max-w-sm'>
        <h1 className='text-center text-2xl font-sans font-semibold mb-8'>
          Login
        </h1>
        <form 
          className='flex flex-col gap-4'
          onSubmit={handleSignIn}
        >
          <input
            type="text" // Usando 'text' para o nome de usuário
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário..."
            required
            className='p-3 border border-gray-300 rounded font-sans focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha..."
            required
            className='p-3 border border-gray-300 rounded font-sans focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
          <button 
            type="submit"
            className='border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors font-sans font-semibold py-2'
          >
            Entrar
          </button>
          {error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
        </form>
      </div>
      <button
        onClick={() => router.push("/cadastro")} // Supondo que a página de cadastro exista
        className='mt-4 text-sm underline cursor-pointer hover:text-gray-600' 
      >
        Não possui uma conta? Cadastre-se
      </button>
    </div>
  );
}