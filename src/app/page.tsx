"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const initialCards: Card[] = [
    { id: 1, value: "blomst.jpg", isFlipped: false, isMatched: false },
    { id: 2, value: "elefant.jpg", isFlipped: false, isMatched: false },
    { id: 3, value: "hund.jpg", isFlipped: false, isMatched: false },
    { id: 4, value: "is.jpg", isFlipped: false, isMatched: false },
    { id: 5, value: "jente.jpg", isFlipped: false, isMatched: false },
    { id: 6, value: "menneske.jpg", isFlipped: false, isMatched: false },
    { id: 7, value: "ski.jpg", isFlipped: false, isMatched: false },
    { id: 8, value: "sol.jpg", isFlipped: false, isMatched: false },
    { id: 9, value: "strand.jpg", isFlipped: false, isMatched: false },
    { id: 10, value: "tboks.jpg", isFlipped: false, isMatched: false },
  ];

  const [cards, setCards] = useState<Card[]>(
    shuffleArray([...initialCards, ...initialCards])
  );
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [tries, setTries] = useState<number>(0);

  // Function to shuffle cards
  function shuffleArray(array: Card[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const resetGame = () => {
    setCards(shuffleArray([...initialCards, ...initialCards]));
    setFlippedCards([]);
    setMatchedCount(0);
    setTries(0);
  };

  // Handle card click
  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped) return;

    const newFlippedCards = [...flippedCards, cards[index]];
    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );

    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards, newCards);
    }
  };

  // Check for match
  const checkForMatch = (flippedCards: Card[], cards: Card[]) => {
    setTries(tries + 1);

    if (flippedCards[0].value === flippedCards[1].value) {
      const newCards = cards.map((card) =>
        card.value === flippedCards[0].value
          ? { ...card, isMatched: true }
          : card
      );

      setMatchedCount(matchedCount + 1);
      setTimeout(() => {
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    } else {
      setTimeout(() => {
        setCards([
          ...cards.map((card) => {
            if (card.isMatched) return card;
            return { ...card, isFlipped: false };
          }),
        ]);
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl pt-4 font-semibold">
        Vebjørn og Sonjas fantastiske lottospill
      </h1>
      <div className="justify-center gap-10 items-center py-4 flex">
        <div>
          <h2>Poeng</h2>
          <p className="text-3xl">{matchedCount}</p>
        </div>
        <div>
          <h2>Forsøk</h2>
          <p className="text-3xl">{tries}</p>
        </div>
        <div className="">
          <button
            className="bg-slate-200 text-black px-4 py-2 rounded-lg"
            onClick={resetGame}
          >
            Prøv på nytt
          </button>
        </div>
      </div>

      {matchedCount === initialCards.length ? (
        <div className="text-4xl text-pink-500 h-[300px] content-center text-center">
          Gratulerer! Du vant!
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative rounded-lg bg-slate-200 flex justify-center items-center text-4xl cursor-pointer h-[200px] overflow-hidden"
              onClick={() => handleCardClick(index)}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="h-full w-full">
                  <Image alt="artwork" fill src={`/artwork/${card.value}`} />
                </div>
              ) : (
                ""
              )}
              <div>{card.isFlipped || card.isMatched ? "" : "❓"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
