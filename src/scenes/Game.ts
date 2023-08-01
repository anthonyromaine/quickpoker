import Phaser from "phaser";
import Card from "../game/Card";
import { CARD_POSITIONS } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";
import Deck from "../game/Deck";
import GameStates from "../constants/GameStates";
import Chip from "../game/Chip";
import { Bet, checkWin } from "../game/Poker";
export default class Game extends Phaser.Scene {
  private cards!: Phaser.GameObjects.Group;
  public state: GameStates = GameStates.First;
  public drawButton!: Phaser.GameObjects.Image;
  private deck!: Deck;
  public bet: Bet = Bet.ONE;
  private credits = 20;
  private creditText!: Phaser.GameObjects.Text;
  constructor() {
    super("game");
  }

  preload() {}

  create() {
    this.creditText = this.add
      .text(
        this.scale.width * 0.77,
        this.scale.height * 0.8,
        `CREDITS ${this.credits}`,
        {
          fontFamily: "Oswald",
          fontSize: "72px",
        },
      )
      .setOrigin(0.5);
    this.drawButton = this.add
      .image(
        this.scale.width * 0.8,
        this.scale.height * 0.9,
        TextureKeys.BlueButton,
      )
      .setScale(0.23, 0.35)
      .setInteractive();

    this.add
      .text(this.scale.width * 0.8, this.scale.height * 0.895, "DRAW", {
        fontFamily: "Oswald",
        fontSize: "64px",
      })
      .setOrigin(0.5);

    const cashOutButton = this.add
      .image(
        this.scale.width * 0.2,
        this.scale.height * 0.9,
        TextureKeys.BlueButton,
      )
      .setScale(0.23, 0.35)
      .setInteractive();

    this.add
      .text(this.scale.width * 0.2, this.scale.height * 0.895, "CASH OUT", {
        fontFamily: "Oswald",
        fontSize: "64px",
      })
      .setOrigin(0.5);

    let chip = new Chip(
      this,
      this.scale.width * 0.5,
      this.scale.height * 0.9,
      "RedChip.png",
    );
    this.add.existing(chip);

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
        if (this.credits < this.bet) {
          return;
        }
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
        // Decrease credits
        this.updateCredits(-this.bet);
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
          card.rank = newCard!.rank;
          card.suit = newCard!.suit;
          card.flip(`${newCard!.suit}${newCard!.rank}.png`);
        }
        // Decrease credits
        this.updateCredits(-this.bet);
        // Set state to Draw
        this.state = GameStates.Draw;
        break;
      case GameStates.Draw:
        if (this.credits < this.bet) {
          return;
        }
        // Swap unheld cards with new cards
        const cards = this.cards.getChildren() as Card[];
        cards.forEach((c) => {
          if (!c.held) {
            const newCard = this.deck.draw();
            c.rank = newCard!.rank;
            c.suit = newCard!.suit;
            c.flip(`${newCard!.suit}${newCard!.rank}.png`);
          }
        });

        // Check for win
        const hand = (this.cards.getChildren() as Card[]).map((c) => {
          return c.toPlayingCard();
        });
        const result = checkWin(hand, this.bet);
        console.log(result);
        this.updateCredits(result.amount);
        // Set state to Init
        this.state = GameStates.Init;
        break;
    }
  }

  private updateCredits(amount: number) {
    this.credits += amount;
    this.creditText.text = `CREDITS ${this.credits}`;
  }
}
