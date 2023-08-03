import { Bet } from "../game/Poker";

export enum ChipKeys {
  WHITE = "WhiteChip.png",
  RED = "RedChip.png",
  BLUE = "BlueChip.png",
  GREEN = "GreenChip.png",
  BLACK = "BlackChip.png",
}

export const ChipValues: Record<ChipKeys, Bet> = {
  [ChipKeys.WHITE]: Bet.ONE,
  [ChipKeys.RED]: Bet.TWO,
  [ChipKeys.BLUE]: Bet.THREE,
  [ChipKeys.GREEN]: Bet.FOUR,
  [ChipKeys.BLACK]: Bet.FIVE,
};

class ChipPosition {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export const ChipPositions: Record<ChipKeys, ChipPosition> = {
  [ChipKeys.WHITE]: new ChipPosition(-170, -40),
  [ChipKeys.RED]: new ChipPosition(0, -40),
  [ChipKeys.BLUE]: new ChipPosition(170, -40),
  [ChipKeys.GREEN]: new ChipPosition(-85, 130),
  [ChipKeys.BLACK]: new ChipPosition(85, 130),
};

export const ChipFontColor: Record<ChipKeys, string> = {
  [ChipKeys.WHITE]: "#000000",
  [ChipKeys.RED]: "#000000",
  [ChipKeys.BLUE]: "#000000",
  [ChipKeys.GREEN]: "#000000",
  [ChipKeys.BLACK]: "#FFFFFF",
};
