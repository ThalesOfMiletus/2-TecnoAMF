"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  }

  const handlePerfil = () => {
    router.push("/perfil");
  }

  const handleDashboard = () => {
    router.push("/dashboard");
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login'); // Redireciona para o login após o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="
      bg-white 
      text-gray-800
      p-3 shadow-lg
      fixed 
      top-0 
      left-0 
      right-0 
      z-50 
      flex 
      items-center
      justify-between 
      font-sans 
      font-semibold
      "
    >
      <h1 
        className="
          text-xl 
          cursor-pointer
          bg-blue-400
          text-white
          hover:bg-blue-200
          hover:text-gray-800
          py-1 px-3
          rounded-md
          transition-colors
          font-light
        " 
        onClick={() => router.push("/")}
      >
        Site Coderace
      </h1>
      <div className="flex gap-4 items-center">
        {user ? (
          <div
            className="flex gap-2"
          >
            <button
              onClick={() => handlePerfil()}
              className="
                bg-blue-400 
                hover:bg-blue-200
                hover:text-gray-800
                text-white
                font-sans
                font-light
                py-1 px-3
                rounded
                transition-colors
                cursor-pointer
              "
            >
              Perfil
            </button>
            <button
              onClick={() => handleDashboard()}
              className="
                bg-blue-400
                hover:bg-blue-200
                hover:text-gray-800
                text-white
                font-sans
                font-light
                py-1 px-3
                rounded
                transition-colors
                cursor-pointer
              "
            >
              Dashboard
            </button>
            <button
              onClick={() => handleLogout()}
              className="
                bg-red-400 
                hover:bg-red-200
                text-white
                hover:text-red-800
                font-sans
                font-light
                py-1 px-3
                rounded
                transition-colors
                cursor-pointer
              "
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleLogin()}
            className="
              bg-blue-400 
              hover:bg-blue-200
              hover:text-gray-800
              text-white
              font-sans
              font-light
              py-1 px-3
              rounded
              transition-colors
              cursor-pointer
            "
          >
            Entrar
          </button>
        )}
      </div>
    </div>
  );
}
