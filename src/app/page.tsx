"use client";
import { useState } from "react";
import Tablero from "@/components/Tablero";

export default function Home() {
  const [mostrarTablero, setMostrarTablero] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-auto">
      {/* Fondo difuminado */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/fondoTablero.jpg"
          alt="Fondo Memory"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        {!mostrarTablero ? (
          <>
            <h1 className="text-4xl font-bold mb-6 drop-shadow">Bienvenido a Memory</h1>
            <button
              onClick={() => setMostrarTablero(true)}
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-lg rounded shadow-md"
            >
              Jugar
            </button>
          </>
        ) : (
          <Tablero />
        )}
      </div>
    </div>
  );
}
