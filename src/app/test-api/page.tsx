"use client";

// Paso 1: Importaciones necesarias
import { useEffect, useState } from "react";

// Paso 2: Tipo de dato para un pokémon simplificado
interface PokemonCard {
  id: number;
  name: string;
  image: string;
}

export default function TestAPI() {
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);

  useEffect(() => {
    async function loadPokemons() {
      try {
        // Paso 3: Crear array de promesas para 12 Pokémon
        const promises = [];
        for (let i = 1; i <= 12; i++) {
          promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.json()));
        }

        // Paso 4: Esperar a que todas las peticiones se resuelvan
        const data = await Promise.all(promises);

        // Paso 5: Mapear datos necesarios
        const parsed: PokemonCard[] = data.map((pokemon: any) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other["official-artwork"].front_default
        }));

        setPokemons(parsed);
      } catch (error) {
        console.error("Error al cargar Pokémon:", error);
      }
    }

    loadPokemons();
  }, []);

  // Paso 6: Renderizar
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {pokemons.map(p => (
        <div key={p.id} className="bg-white rounded shadow text-center">
          <img src={p.image} alt={p.name} className="w-full h-40 object-contain p-2" />
          <p className="font-bold capitalize text-lg p-2">{p.name}</p>
        </div>
      ))}
    </div>
  );
}


