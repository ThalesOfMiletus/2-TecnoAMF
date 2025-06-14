"use client"

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div
            className="
                bg-gray-100
                min-h-screen
                justify-center
                items-center
                flex
            "
        >
            <div className="justify-items-center">
                <h2
                    className="
                        text-gray-800
                        text-5xl
                        font-bold
                    "
                >
                    Bem-vindo!
                </h2>
                <button
                    className="
                        text-gray-800
                        border rounded px-2
                        mt-4 cursor-pointer
                        hover:bg-gray-800
                        hover:text-white
                        font-bold
                        transition-colors
                        text-2xl
                    "
                    onClick={() => router.push("/login")}
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}