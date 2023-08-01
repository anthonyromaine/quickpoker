import { Rank, Suit } from "../constants/CardConstants";

export default class PlayingCard {
  rank: Rank;
  suit: Suit;
  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }
}
