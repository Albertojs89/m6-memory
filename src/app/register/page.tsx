"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded"
          >
            Crear cuenta
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta? <Link href="/login" className="text-blue-400 hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
