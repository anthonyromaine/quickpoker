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
