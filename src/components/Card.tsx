"use client";

import Image from "next/image";

export default function Card({ image, onClick, isFlipped, clickCount }) {
  return (
    <div
      onClick={onClick}
      className="w-44 h-52 cursor-pointer [perspective:1000px]"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Frente - ❓ */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gray-800 rounded-lg border-2 border-white flex items-center justify-center text-white text-3xl">
          ❓
        </div>

        {/* Reverso - Imagen */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-lg border-2 border-white overflow-hidden">
          <Image
            src={image}
            alt="card"
            fill
            className="object-cover"
          />
          <span className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 rounded">
            {clickCount}
          </span>
        </div>
      </div>
    </div>
  );
}
