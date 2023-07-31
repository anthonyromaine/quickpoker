export default class PlayingCard {
  rank: string;
  suit: string;
  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }
}
