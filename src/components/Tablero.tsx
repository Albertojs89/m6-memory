"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

const images = [
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/charmander.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
  "/images/burbasur.jpg",
];


function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Tablero() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [matches, setMatches] = useState(0);
  const [clickCounts, setClickCounts] = useState({});

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

  const handleClick = (index) => {
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

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (cards[first].image === cards[second].image) {
        // Match
        const updatedCards = [...cards];
        updatedCards[first].isMatched = true;
        updatedCards[second].isMatched = true;
        setCards(updatedCards);
        setMatches((prev) => prev + 1);
        setSelected([]);
      } else {
        // No match
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

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-white text-lg mb-4 flex gap-8">
        <p>🧠 Clicks: {clicks}</p>
        <p>🎯 Matches: {matches}</p>
      </div>
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
