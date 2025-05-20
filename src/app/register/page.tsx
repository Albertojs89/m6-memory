'use client'

import { useState } from "react";

export default function RegisterPage() {
  // 🔹 Estados para guardar los valores de los inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  // 🔹 Función que maneja el envío del formulario
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔸 Enviamos los datos a la API Laravel con fetch POST
      const res = await fetch("https://m7-laravel-production.up.railway.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await res.json();

      // 🔸 Si hay error, mostramos el primer mensaje de validación de Laravel
      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0]; // Primer mensaje de error
          setError(firstError);
        } else {
          setError(data.message || "Error al registrarse");
        }
        return;
      }

      // 🔸 Guardamos token y usuario en localStorage
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔸 Recargamos la página para que el Header se actualice
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        {/* 🔹 Mensaje de error */}
        {error && <p className="text-red-400">{error}</p>}

        {/* 🔹 Campo nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        {/* 🔹 Campo email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        {/* 🔹 Campo contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        {/* 🔹 Campo confirmar contraseña */}
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        {/* 🔹 Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
