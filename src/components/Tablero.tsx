"use client";

// Bloque 1: Importaciones
import { useEffect, useState } from "react";
import Card from "./Card";

// Bloque 2: Array de imágenes duplicadas (para crear pares)
const images = [
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/pikachu.jpg",
  "/images/pikachu.jpg",
  "/images/pikachu.jpg",
  "/images/pikachu.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
];

// Bloque 3: Función auxiliar para mezclar aleatoriamente las cartas

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Bloque 4: Componente principal del tablero de juego
export default function Tablero() {
  // Bloque 4.1: Estados del juego
  const [cards, setCards] = useState([]);                // Cartas del tablero
  const [selected, setSelected] = useState([]);          // Índices de cartas seleccionadas
  const [clicks, setClicks] = useState(0);               // Total de clics realizados
  const [matches, setMatches] = useState(0);             // Total de coincidencias encontradas
  const [clickCounts, setClickCounts] = useState({});    // Clics individuales por carta

  // Bloque 4.2: Inicialización del juego al montar el componente
  useEffect(() => {
    const shuffled = shuffleArray(
      images.map((img, index) => ({
        id: index,
        image: img,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setCards(shuffled);
  }, []);

  // Bloque 4.3: Manejador de clic sobre una carta
  const handleClick = (index) => {
    // Ignora clics inválidos: ya volteada, ya emparejada o ya hay dos seleccionadas
    if (cards[index].isFlipped || cards[index].isMatched || selected.length === 2) return;

    // Voltea la carta seleccionada
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;

    // Actualiza los estados correspondientes--
    setCards(updatedCards);
    setSelected((prev) => [...prev, index]);
    setClicks((prev) => prev + 1);

    // Incrementa el contador individual de clics por carta--
    setClickCounts((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  // Bloque 4.4: Verifica coincidencias cuando hay dos cartas seleccionadas
  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;

      if (cards[first].image === cards[second].image) {
        // Coincidencia encontrada: marcar cartas como emparejadas
        const updatedCards = [...cards];
        updatedCards[first].isMatched = true;
        updatedCards[second].isMatched = true;
        setCards(updatedCards);
        setMatches((prev) => prev + 1);
        setSelected([]);
      } else {
        // No hay coincidencia: volver a girar las cartas después de un retardo
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

  // Bloque 5: Renderizado del componente
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
