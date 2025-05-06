import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logo + Título */}
      <div className="flex items-center">
        <img src="/brain.png" alt="Logo" className="h-20 w-20 mr-5 object-contain" />
        <h1 className="text-xl font-bold">Memory</h1>
      </div>

      {/* Navegación */}
      <nav>
        <ul className="flex items-center gap-10 mr-6 text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
          <li>
            <Avatar>
              <AvatarImage src="/JessYBruma.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </li>
        </ul>
      </nav>
    </header>
  );
}
