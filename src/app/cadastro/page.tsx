// src/pages/cadastro.tsx
"use client"

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cro, setCro ] = useState('');
    const [ error, setError ] = useState<string | null>(null);

    const { signUp } = useAuth();
    const router = useRouter();

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {

        } catch (error) {
            await signUp({ username, email, password, cro });
        }
    }

    return (
        <div
            className='
                min-h-screen
                bg-gray-100
                justify-center
                items-center
                flex flex-col
                text-gray-800
            '
        >
            <div
                className='
                    border border-gray-800
                    p-8 rounded-lg shadow-lg
                    bg-white w-full max-w-sm
                '
            >
                <h1
                    className='
                        text-center text-2xl
                        font-sans font-semibold
                        mb-8
                    '
                >
                    Cadastro
                </h1>
                <form
                    className='flex flex-col gap-4'
                    onSubmit={handleSignUp}
                >
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Usuário...'
                        required
                        className='
                            p-3 border border-gray-300
                            rounded font-sans focus:outline-none
                            focus:ring-2 focus:ring-gray-400
                        '
                    />
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email...'
                        required
                        className='
                            p-3 border border-gray-300
                            rounded font-sans focus:outline-none
                            focus:ring-2 focus:ring-gray-400
                        '
                    />
                    <input 
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Senha...'
                        required
                        className='
                            p-3 border border-gray-300
                            rounded font-sans focus:outline-none
                            focus:ring-2 focus:ring-gray-400
                        '
                    />
                    <input 
                        type="text"
                        value={cro}
                        onChange={(e) => setCro(e.target.value)}
                        placeholder='CRO...'
                        required
                        className='
                            p-3 border border-gray-300
                            rounded font-sans focus:outline-none
                            focus:ring-2 focus:ring-gray-400
                        '
                    />
                    <button
                        type="submit"
                        className='
                            border border-gray-800 rounded
                            hover:bg-gray-800 hover:text-white
                            transition-color font-sans font-semibold py-2
                        '
                    >
                        Cadastrar
                    </button>
                    {error && <p 
                                className='
                                    text-red-500 text-sm
                                    text-center mt-2
                                '
                            >
                                {error}
                            </p>
                    }
                </form>
            </div>
            <button
                onClick={() => router.push("/login")}
                className='
                    mt-4 text-sm
                    underline cursor-pointer
                    hover:text-gray-600
                '
            >
                Já possui uma conta? Clique aqui
            </button>
        </div>
    );
}