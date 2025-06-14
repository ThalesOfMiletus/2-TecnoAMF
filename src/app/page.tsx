"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goDashboard = () => {
    router.push("/dashboard");
  }

  return (
    <div className="
        flex 
        bg-gray-100 
        min-h-screen
        items-center
        justify-center
      "
    >
      <div
        className="
          
        "
      >
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-800">
          Bem-vindo!
        </h1>
        <button
          className="
            text-gray-800 
            border-2 
            rounded-md 
            px-2
            hover:bg-gray-300
            cursor-pointer
            transition-colors
          "
          onClick={() => goDashboard()}
        >
          Ir para a dashboard
        </button>
      </div>
    </div>    
  );
}
