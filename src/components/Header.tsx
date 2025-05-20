'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");

    await fetch("https://m7-laravel-production.up.railway.app/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    location.reload(); // Opcional: recargar para reflejar cambios
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img src="/brain.png" alt="Logo" className="h-20 w-20 mr-5" />
        <h1 className="text-xl font-bold">Memory</h1>
      </div>
      <nav>
        <ul className="flex items-center space-x-6 mr-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          {user ? (
            <>
              <li>Hola, {user.name}</li>
              <li>
                <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                  Logout
                </button>
              </li>
              <li>
                <Avatar>
                  <AvatarImage src="/JessYBruma.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
