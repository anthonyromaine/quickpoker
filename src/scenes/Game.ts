import Phaser from "phaser";
import Card from "../game/Card";
import { CARD_POSITIONS } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";

enum GAME_STATES {
  Init,
  Draw,
  End,
}

export default class Game extends Phaser.Scene {
  private cards!: Phaser.GameObjects.Group;
  public state: GAME_STATES = GAME_STATES.Init;
  public drawButton!: Phaser.GameObjects.Image;
  constructor() {
    super("game");
  }

  preload() {}

  create() {
    this.drawButton = this.add
      .image(
        this.scale.width * 0.8,
        this.scale.height * 0.9,
        TextureKeys.BlueButton,
      )
      .setScale(0.2, 0.35)
      .setInteractive();

    this.add
      .text(this.scale.width * 0.8, this.scale.height * 0.895, "DRAW", {
        fontFamily: "Oswald",
        fontSize: "72px",
      })
      .setOrigin(0.5);

    this.initCards();
    this.drawButton.on("pointerdown", this.handleDraw, this);
  }

  private initCards() {
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

  private handleDraw() {
    console.log(this);
  }
}
