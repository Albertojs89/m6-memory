// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
      if (email === storedEmail && password === storedPassword) {
        router.push("/");
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("loggedIn", "true");
        router.push("/");
      } else {
        setError("Email o contraseña incorrectos.");
      }
    } else {
      setError("No hay ningún usuario registrado.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-gray-800 border border-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-gray-800 border border-gray-700 text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
