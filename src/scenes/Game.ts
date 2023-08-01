import Phaser from "phaser";
import Card from "../game/Card";
import { CARD_POSITIONS } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";
import Deck from "../game/Deck";
import GameStates from "../constants/GameStates";
import Poker from "../game/Poker";

export default class Game extends Phaser.Scene {
  private cards!: Phaser.GameObjects.Group;
  public state: GameStates = GameStates.First;
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

    this.add
      .image(
        this.scale.width * 0.48,
        this.scale.height * 0.9,
        TextureKeys.Chips,
        "RedChip.png",
      )
      .setScale(0.4);

    this.add
      .text(this.scale.width * 0.48, this.scale.height * 0.9, "$1", {
        fontFamily: "Oswald",
        fontSize: "72px",
        color: "#000000",
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
    switch (this.state) {
      case GameStates.First:
        // Get a new Deck and shuffle
        this.deck = new Deck();
        this.deck.shuffle();
        // Draw Cards
        // Flip Cards
        for (let i = 0; i < this.cards.getChildren().length; i++) {
          let card: Card = this.cards.getChildren()[i] as Card;
          let newCard = this.deck.draw();
          card.reset();
          card.flipUp(`${newCard!.suit}${newCard!.rank}.png`);
        }
        // Set state to Draw
        this.state = GameStates.Draw;
        break;
      case GameStates.Init:
        // Get a new Deck and shuffle
        this.deck = new Deck();
        this.deck.shuffle();
        // Draw Cards
        // Flip Cards
        for (let i = 0; i < this.cards.getChildren().length; i++) {
          let card: Card = this.cards.getChildren()[i] as Card;
          const newCard = this.deck.draw();
          card.reset();
          card.flip(`${newCard!.suit}${newCard!.rank}.png`);
        }
        // Set state to Draw
        this.state = GameStates.Draw;
        break;
      case GameStates.Draw:
        // Swap unheld cards with new cards
        const cards = this.cards.getChildren() as Card[];
        cards.forEach((c) => {
          if (!c.held) {
            const newCard = this.deck.draw();
            c.flip(`${newCard!.suit}${newCard!.rank}.png`);
          }
        });
        // Check for win
        // Set state to Init
        this.state = GameStates.Init;
        break;
    }
  }
}
