import { Rank, Suit } from "../constants/CardConstants";
import PlayingCard from "./PlayingCard";

export default class Deck {
  private cards: PlayingCard[] = [];
  constructor() {
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        this.cards.push(new PlayingCard(suit, rank));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Phaser.Math.Between(0, i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  draw() {
    return this.cards.shift();
  }
}
