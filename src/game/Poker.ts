import { Rank } from "../constants/CardConstants";
import PlayingCard from "./PlayingCard";

export default class Poker {
  checkWin(cards: PlayingCard[], bet: Bet) {
    const hand = new Hand(cards);

    for (const winHand of Object.values(WinningHand)) {
      if (this.isWin(hand, winHand)) {
        return { hand: winHand, amount: WinAmount[winHand][bet] };
      }
    }

    return undefined;
  }

  isWin(hand: Hand, winHand: WinningHand) {
    switch (winHand) {
      case WinningHand.RoyalFlush:
        return this.isRoyalFlush(hand);
      case WinningHand.StraightFlush:
        return this.isStraightFlush(hand);
      case WinningHand.FourKind:
        return this.isFourKind(hand);
      case WinningHand.FullHouse:
        return this.isFullHouse(hand);
      case WinningHand.Flush:
        return this.isFlush(hand);
      case WinningHand.Straight:
        return this.isStraight(hand);
      case WinningHand.ThreeKind:
        return this.isThreeKind(hand);
      case WinningHand.TwoPair:
        return this.isTwoPairs(hand);
      case WinningHand.JackBetter:
        return this.isJackBetter(hand);
    }
  }

  isRoyalFlush(hand: Hand) {
    return (
      this.isFlush(hand) &&
      hand.hasRank(Rank.ACE) &&
      hand.hasRank(Rank.KING) &&
      hand.hasRank(Rank.QUEEN) &&
      hand.hasRank(Rank.JACK) &&
      hand.hasRank(Rank.TEN)
    );
  }

  isStraightFlush(hand: Hand) {
    return this.isFlush(hand) && this.isStraight(hand);
  }

  isFourKind(hand: Hand) {
    const rankCount = hand.getRankCount();
    return Object.values(rankCount).includes(4);
  }

  isFullHouse(hand: Hand) {
    const rankCount = Object.values(hand.getRankCount());
    return rankCount.includes(3) && rankCount.includes(2);
  }

  isFlush(hand: Hand) {
    let suit = hand.cards[0].suit;
    for (let i = 1; i < hand.cards.length; i++) {
      if (hand.cards[i].suit !== suit) {
        return false;
      }
    }

    return true;
  }

  isStraight(hand: Hand) {
    const lowestRank = hand.getLowestRank();
    const rankOrder = Object.values(Rank).reverse();

    for (let i = 1; i <= 4; i++) {
      if (!hand.hasRank(rankOrder[lowestRank + i])) {
        return false;
      }
    }

    return true;
  }

  isThreeKind(hand: Hand) {
    const rankCount = hand.getRankCount();
    return Object.values(rankCount).includes(3);
  }

  isTwoPairs(hand: Hand) {
    const rankCount = Object.values(hand.getRankCount());
    return rankCount.filter((c) => c === 2).length === 2;
  }

  isJackBetter(hand: Hand) {
    const rankCount = hand.getRankCount();
    return (
      rankCount.get(Rank.ACE) === 2 ||
      rankCount.get(Rank.KING) === 2 ||
      rankCount.get(Rank.QUEEN) === 2 ||
      rankCount.get(Rank.JACK) === 2
    );
  }
}

class Hand {
  cards: PlayingCard[];

  constructor(cards: PlayingCard[]) {
    this.cards = cards;
  }

  hasRank(rank: string) {
    if (this.cards.find((c) => c.rank === rank)) {
      return true;
    }
    return false;
  }

  hasSuit(suit: string) {
    if (this.cards.find((c) => c.suit === suit)) {
      return true;
    }
    return false;
  }

  getLowestRank() {
    const rankOrder = Object.keys(Rank).reverse();
    let minimumRank = rankOrder.indexOf(this.cards[0].rank);

    for (let i = 1; i < this.cards.length; i++) {
      const newMin = rankOrder.indexOf(this.cards[i].rank);
      if (newMin < minimumRank) {
        minimumRank = newMin;
      }
    }

    return minimumRank;
  }

  getRankCount() {
    const rankCount: Map<Rank, number> = new Map();
    for (const card of this.cards) {
      if (rankCount.has(card.rank)) {
        rankCount.set(card.rank, rankCount.get(card.rank)! + 1);
      } else {
        rankCount.set(card.rank, 1);
      }
    }

    return rankCount;
  }
}

enum WinningHand {
  RoyalFlush = "Royal Flush",
  StraightFlush = "Straight Flush",
  FourKind = "Four of a Kind",
  FullHouse = "Full House",
  Flush = "Flush",
  Straight = "Straight",
  ThreeKind = "Three of a Kind",
  TwoPair = "Two Pair",
  JackBetter = "Jacks or Better",
}

enum Bet {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

const WinAmount: Record<WinningHand, number[]> = {
  [WinningHand.RoyalFlush]: [250, 500, 750, 1000, 4000],
  [WinningHand.StraightFlush]: [50, 100, 150, 200, 250],
  [WinningHand.FourKind]: [25, 50, 75, 100, 125],
  [WinningHand.FullHouse]: [9, 18, 27, 36, 45],
  [WinningHand.Flush]: [6, 12, 18, 24, 30],
  [WinningHand.Straight]: [4, 8, 12, 16, 20],
  [WinningHand.ThreeKind]: [3, 6, 9, 12, 15],
  [WinningHand.TwoPair]: [2, 4, 6, 8, 10],
  [WinningHand.JackBetter]: [1, 2, 3, 4, 5],
};
