//src/app/dashboard/page.tsx
"use client"

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    try {

    } catch (erro) {
      console.log("Erro", erro);
    }
  });

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        justify-center
        items-center
        flex
      "
    >
      <h1
        className="
          text-5xl 
          md:text-6xl 
          font-semibold 
          text-gray-800
        "
      >
        Dashboard
      </h1>
    </div>
  );
}