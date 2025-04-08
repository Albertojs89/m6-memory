import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img src="/brain.png" alt="Logo" className="h-20 w-20 mr-5" />
        <h1 className="text-xl font-bold">Memory</h1>
      </div>
      <nav>
        <ul className="flex space-x-4 mr-16 gap-16">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
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
  