import { Card } from "./card/Card.interface";
import cardRepository from "./card/cardRepository";

const durstenfeldShuffle = (array: any[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const shuffleCards = (count: number): Card[] => {
  if (count < 1 || count > cardRepository.length) {
    throw new Error("Invalid card count");
  }
  const slice = cardRepository.slice(0, count);
  const cards = slice.concat(slice).map((card) => ({ ...card }));
  durstenfeldShuffle(cards);

  return cards;
};
