import { Rank, Suit } from "../constants/CardConstants";
import PlayingCard from "./PlayingCard";

export function checkWin(cards: PlayingCard[], bet: Bet) {
  const hand = new Hand(cards);

  for (const winHand of Object.values(WinningHand)) {
    if (isWin(hand, winHand)) {
      return { hand: winHand, amount: WinAmount[winHand][bet] };
    }
  }

  return { hand: "No Win", amount: 0 };
}

function isWin(hand: Hand, winHand: WinningHand) {
  switch (winHand) {
    case WinningHand.RoyalFlush:
      return isRoyalFlush(hand);
    case WinningHand.StraightFlush:
      return isStraightFlush(hand);
    case WinningHand.FourKind:
      return isFourKind(hand);
    case WinningHand.FullHouse:
      return isFullHouse(hand);
    case WinningHand.Flush:
      return isFlush(hand);
    case WinningHand.Straight:
      return isStraight(hand);
    case WinningHand.ThreeKind:
      return isThreeKind(hand);
    case WinningHand.TwoPair:
      return isTwoPairs(hand);
    case WinningHand.JackBetter:
      return isJackBetter(hand);
  }
}

function isRoyalFlush(hand: Hand) {
  return (
    isFlush(hand) &&
    hand.hasRank(Rank.ACE) &&
    hand.hasRank(Rank.KING) &&
    hand.hasRank(Rank.QUEEN) &&
    hand.hasRank(Rank.JACK) &&
    hand.hasRank(Rank.TEN)
  );
}

function isStraightFlush(hand: Hand) {
  return isFlush(hand) && isStraight(hand);
}

function isFourKind(hand: Hand) {
  const rankCount = Array.from(hand.getRankCount().values());
  return rankCount.includes(4);
}

function isFullHouse(hand: Hand) {
  const rankCount = Array.from(hand.getRankCount().values());

  return rankCount.includes(3) && rankCount.includes(2);
}

function isFlush(hand: Hand) {
  let suit = hand.cards[0].suit;
  for (let i = 1; i < hand.cards.length; i++) {
    if (hand.cards[i].suit !== suit) {
      return false;
    }
  }

  return true;
}

function isStraight(hand: Hand) {
  const lowestRank = hand.getLowestRank();
  const rankOrder = Object.values(Rank).reverse();
  for (let i = 1; i <= 4; i++) {
    if (!hand.hasRank(rankOrder[lowestRank + i])) {
      return false;
    }
  }

  return true;
}

function isThreeKind(hand: Hand) {
  const rankCount = Array.from(hand.getRankCount().values());
  return rankCount.includes(3);
}

function isTwoPairs(hand: Hand) {
  const rankCount = Array.from(hand.getRankCount().values());
  return rankCount.filter((c) => c === 2).length === 2;
}

function isJackBetter(hand: Hand) {
  const rankCount = hand.getRankCount();
  return (
    rankCount.get(Rank.ACE) === 2 ||
    rankCount.get(Rank.KING) === 2 ||
    rankCount.get(Rank.QUEEN) === 2 ||
    rankCount.get(Rank.JACK) === 2
  );
}

class Hand {
  cards: PlayingCard[];

  constructor(cards: PlayingCard[]) {
    this.cards = cards;
  }

  hasRank(rank: Rank) {
    if (this.cards.find((c) => c.rank === rank)) {
      return true;
    }
    return false;
  }

  hasSuit(suit: Suit) {
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

export enum Bet {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

const WinAmount: Record<WinningHand, Record<Bet, number>> = {
  [WinningHand.RoyalFlush]: {
    [Bet.ONE]: 250,
    [Bet.TWO]: 500,
    [Bet.THREE]: 750,
    [Bet.FOUR]: 1000,
    [Bet.FIVE]: 4000,
  },
  [WinningHand.StraightFlush]: {
    [Bet.ONE]: 50,
    [Bet.TWO]: 100,
    [Bet.THREE]: 150,
    [Bet.FOUR]: 200,
    [Bet.FIVE]: 250,
  },
  [WinningHand.FourKind]: {
    [Bet.ONE]: 25,
    [Bet.TWO]: 50,
    [Bet.THREE]: 75,
    [Bet.FOUR]: 100,
    [Bet.FIVE]: 125,
  },
  [WinningHand.FullHouse]: {
    [Bet.ONE]: 9,
    [Bet.TWO]: 18,
    [Bet.THREE]: 27,
    [Bet.FOUR]: 36,
    [Bet.FIVE]: 45,
  },
  [WinningHand.Flush]: {
    [Bet.ONE]: 6,
    [Bet.TWO]: 12,
    [Bet.THREE]: 18,
    [Bet.FOUR]: 24,
    [Bet.FIVE]: 30,
  },
  [WinningHand.Straight]: {
    [Bet.ONE]: 4,
    [Bet.TWO]: 8,
    [Bet.THREE]: 12,
    [Bet.FOUR]: 16,
    [Bet.FIVE]: 20,
  },
  [WinningHand.ThreeKind]: {
    [Bet.ONE]: 3,
    [Bet.TWO]: 6,
    [Bet.THREE]: 9,
    [Bet.FOUR]: 12,
    [Bet.FIVE]: 15,
  },
  [WinningHand.TwoPair]: {
    [Bet.ONE]: 2,
    [Bet.TWO]: 4,
    [Bet.THREE]: 6,
    [Bet.FOUR]: 8,
    [Bet.FIVE]: 10,
  },
  [WinningHand.JackBetter]: {
    [Bet.ONE]: 1,
    [Bet.TWO]: 2,
    [Bet.THREE]: 3,
    [Bet.FOUR]: 4,
    [Bet.FIVE]: 5,
  },
};
