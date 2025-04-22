"use client"; // Indica que este componente es para el cliente (React Server Components)

// Importaciones
import { useEffect, useState } from "react";
import Card from "./Card";

// Imágenes disponibles para el juego (4 pares de cada una)
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

// Función para mezclar aleatoriamente un array (Fisher-Yates simplificado)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Componente principal del juego: Tablero
export default function Tablero() {
  // 📦 Estados del componente
  const [cards, setCards] = useState([]);                // Cartas actuales en el tablero
  const [selected, setSelected] = useState([]);          // Índices de cartas seleccionadas
  const [clicks, setClicks] = useState(0);               // Número total de clics
  const [matches, setMatches] = useState(0);             // Número total de aciertos
  const [clickCounts, setClickCounts] = useState({});    // Conteo de clics por carta

  // Al montar el componente: Mezclar cartas y crear objetos carta
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
    console.log("Cartas generadas:", shuffled.length, shuffled);
  }, []);

  //  Manejador de clics sobre una carta
  const handleClick = (index) => {
    // Evitar clics en cartas volteadas/matcheadas o si ya hay 2 seleccionadas
    if (cards[index].isFlipped || cards[index].isMatched || selected.length === 2) return;

    // Marcar carta como volteada
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;

    // Actualizar estados
    setCards(updatedCards);
    setSelected((prev) => [...prev, index]);
    setClicks((prev) => prev + 1);

    // Registrar cantidad de clics sobre esa carta
    setClickCounts((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  // Comprobación de coincidencias cuando hay dos cartas seleccionadas
  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;

      // ✅ Si hay match
      if (cards[first].image === cards[second].image) {
        const updatedCards = [...cards];
        updatedCards[first].isMatched = true;
        updatedCards[second].isMatched = true;

        setCards(updatedCards);
        setMatches((prev) => prev + 1);
        setSelected([]); // Reset selección
      } else {
        // ❌ Si no hay match: ocultar cartas tras 1 segundo
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;

          setCards(updatedCards);
          setSelected([]); // Reset selección
        }, 1000);
      }
    }
  }, [selected]);

  // Renderizado del tablero de cartas y estadísticas
  return (
    <div className="flex flex-col items-center mt-8">
      {/* Estadísticas de juego */}
      <div className="text-white text-lg mb-4 flex gap-8">
        <p>Clicks: {clicks}</p>
        <p>Matches: {matches}</p>
      </div>

      {/*  Tablero de cartas */}
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
