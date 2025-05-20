"use client";
import { useEffect, useState } from "react";
import Tablero from "@/components/Tablero";

export default function Home() {
  const [mostrarTablero, setMostrarTablero] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(20);
  const [mostrarMensajeTiempoAgotado, setMostrarMensajeTiempoAgotado] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    if (mostrarTablero) {
      setTiempoRestante(40); // reiniciar tiempo cada vez que empieza
      setMostrarMensajeTiempoAgotado(false);

      timer = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setMostrarMensajeTiempoAgotado(true);

            // Espera un segundo y vuelve al inicio
            timeout = setTimeout(() => {
              setMostrarTablero(false);
              setMostrarMensajeTiempoAgotado(false);
            }, 1000);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Limpiar intervalos si se desmonta o cambia el estado
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [mostrarTablero]);

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
          <>
            <Tablero />
            <div className="mt-6 text-xl font-bold">
              Tiempo restante: {tiempoRestante} segundos
            </div>
            {mostrarMensajeTiempoAgotado && (
              <div className="mt-4 text-red-500 font-bold text-lg animate-pulse">
                 ¡Tiempo agotado! Reiniciando...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
