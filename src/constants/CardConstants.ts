export const CARD_WIDTH = 140;
export const CARD_POSITIONS = [
  CARD_WIDTH * -2,
  CARD_WIDTH * -1,
  0,
  CARD_WIDTH,
  CARD_WIDTH * 2,
];

export const CARD_SCALE = 0.9;

export enum Suit {
  HEART = "H",
  DIAMOND = "D",
  CLUB = "C",
  SPADE = "S",
}

export enum Rank {
  ACE = "A",
  KING = "K",
  QUEEN = "Q",
  JACK = "J",
  TEN = "10",
  NINE = "9",
  EIGHT = "8",
  SEVEN = "7",
  SIX = "6",
  FIVE = "5",
  FOUR = "4",
  THREE = "3",
  TWO = "2",
}
