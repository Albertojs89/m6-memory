"use client";

// Bloque 1: Importaciones
import { useEffect, useState } from "react";
import Card from "./Card";

// Bloque 2: Función auxiliar para mezclar aleatoriamente las cartas
function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Bloque 2.1: Generar IDs únicos aleatorios del 1 al 500
function getUniqueRandomIds(count: number, max: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
}

// Bloque 3: Componente principal del tablero de juego
export default function Tablero() {
  // Bloque 3.1: Estados del juego
  const [cards, setCards] = useState<any[]>([]); // Cartas del tablero
  const [selected, setSelected] = useState<number[]>([]); // Índices seleccionados
  const [clicks, setClicks] = useState<number>(0); // Total de clics
  const [matches, setMatches] = useState<number>(0); // Total de matches
  const [clickCounts, setClickCounts] = useState<{ [key: number]: number }>({}); // Clics individuales por carta

  // Bloque 3.2: Cargar Pokémon desde la API (carga paralela)
  useEffect(() => {
    async function fetchPokemons() {
      const randomIds = getUniqueRandomIds(6, 500); // IDs aleatorios únicos
      const promises = randomIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
      );

      try {
        const data = await Promise.all(promises);

        // Creamos las cartas base sin id duplicado
        const pokeCards = data.map((poke) => ({
          pokeId: poke.id, // Este es el valor que usaremos para comprobar coincidencias
          image: poke.sprites.other["official-artwork"].front_default,
        }));

        // Duplicamos las cartas y les damos ID único a cada una
        const duplicated = shuffleArray(
          [...pokeCards, ...pokeCards].map((card, i) => ({
            id: i, // ID único para React
            pokeId: card.pokeId, // Para comparar si son iguales
            image: card.image,
            isFlipped: false,
            isMatched: false,
          }))
        );

        setCards(duplicated);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
      }
    }

    fetchPokemons();
  }, []);

  // Bloque 3.3: Manejador de clic sobre una carta
  const handleClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || selected.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;

    setCards(updatedCards);
    setSelected((prev) => [...prev, index]);
    setClicks((prev) => prev + 1);

    setClickCounts((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  // Bloque 3.4: Verifica coincidencias cuando hay dos cartas seleccionadas
  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;

      if (cards[first].pokeId === cards[second].pokeId) {
        const updatedCards = [...cards];
        updatedCards[first].isMatched = true;
        updatedCards[second].isMatched = true;
        setCards(updatedCards);
        setMatches((prev) => prev + 1);
        setSelected([]);
      } else {
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setCards(updatedCards);
          setSelected([]);
        }, 1000);
      }
    }
  }, [selected]);

  // Bloque 4: Renderizado del componente
  return (
    <div className="flex flex-col items-center mt-8">
      {/* Indicadores de estadísticas de juego */}
      <div
        className="text-white text-2xl font-extrabold mb-4 flex gap-8"
        style={{
          textShadow: "2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black",
        }}
      >
        <p>Clicks: {clicks}</p>
        <p>Matches: {matches}</p>
      </div>

      {/* Tablero con las cartas */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            onClick={() => handleClick(index)}
            isFlipped={card.isFlipped || card.isMatched}
            clickCount={clickCounts[index] || 0}
          />
        ))}
      </div>
    </div>
  );
}
