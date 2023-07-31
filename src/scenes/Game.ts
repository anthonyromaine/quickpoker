import Phaser from "phaser";
import Card from "../game/Card";
import { CARD_POSITIONS } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";
import Deck from "../game/Deck";

enum GAME_STATES {
  First,
  Init,
  Draw,
  End,
}

export default class Game extends Phaser.Scene {
  private cards!: Phaser.GameObjects.Group;
  public state: GAME_STATES = GAME_STATES.First;
  public drawButton!: Phaser.GameObjects.Image;
  private deck!: Deck;
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
    this.deck = new Deck();
    this.deck.shuffle();
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
    switch (this.state) {
      case GAME_STATES.First:
        // Draw Cards
        // Flip Cards
        for (let i = 0; i < this.cards.getChildren().length; i++) {
          let card: Card = this.cards.getChildren()[i] as Card;
          let newCard = this.deck.draw();
          card.flipUp(`${newCard!.suit}${newCard!.rank}.png`);
        }
        // Set state to Draw
        this.state = GAME_STATES.Draw;
        break;
      case GAME_STATES.Init:
        // Draw Cards
        // Flip Cards

        // Set state to Draw
        this.state = GAME_STATES.Draw;
        break;
      case GAME_STATES.Draw:
        // Swap held cards with new cards
        // Check for win
        // Set state to Init
        this.state = GAME_STATES.Init;
        break;
    }
  }
}
