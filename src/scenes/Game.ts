import Phaser from "phaser";
import TextureKeys from "../constants/TextureKeys";
import Card from "../game/Card";
import { CARD_POSITIONS } from "../constants/CardConstants";

export default class Game extends Phaser.Scene {
  private cards!: Phaser.GameObjects.Group;
  constructor() {
    super("game");
  }

  preload() {}

  create() {
    this.initCards();
  }

  initCards() {
    this.cards = new Phaser.GameObjects.Group(this);
    const startWidth = this.scale.width * 0.5;

    for (let i = 0; i < CARD_POSITIONS.length; i++) {
      let newCard = new Card(
        this,
        startWidth + CARD_POSITIONS[i],
        this.scale.height * 0.5,
        "cardback.png",
      );
      this.add.existing(newCard);
      this.cards.add(newCard);
    }
  }
}
