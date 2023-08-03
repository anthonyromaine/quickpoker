import Phaser from "phaser";
import Card from "../game/Card";
import { CARD_POSITIONS, Rank, Suit } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";
import Deck from "../game/Deck";
import GameStates from "../constants/GameStates";
import Chip from "../game/Chip";
import { Bet, checkWin } from "../game/Poker";
import PlayingCard from "../game/PlayingCard";
import ChipScreen from "../game/ChipScreen";
import { ChipKeys } from "../constants/ChipConstants";

const TEXT_SIZE = "48px";
const SCORE_TEXT_OFFSET = 70;
export default class Game extends Phaser.Scene {
  private cards!: Phaser.GameObjects.Group;
  public state: GameStates = GameStates.First;
  public drawButton!: Phaser.GameObjects.Image;
  private deck!: Deck;
  public bet: Bet = Bet.ONE;
  private credits = JSON.parse(localStorage.getItem("credits") || "20");
  private creditText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private winText!: Phaser.GameObjects.Text;
  private playAgainText!: Phaser.GameObjects.Text;
  private winHandText!: Phaser.GameObjects.Text;

  constructor() {
    super("game");
  }

  preload() {}

  create() {
    // credit text
    this.add
      .text(20, 10, `CREDITS`, {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(0);
    this.creditText = this.add
      .text(20, SCORE_TEXT_OFFSET, this.credits, {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(0);
    // high score text
    this.add
      .text(this.scale.width - 20, 10, "HIGH SCORE", {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(1, 0);
    this.highScoreText = this.add
      .text(
        this.scale.width - 20,
        SCORE_TEXT_OFFSET,
        `${localStorage.getItem("high-score") || 0}`,
        {
          fontFamily: "Oswald",
          fontSize: TEXT_SIZE,
        },
      )
      .setOrigin(1, 0);
    // win text
    this.winText = this.add
      .text(40, this.scale.height * 0.83, "", {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(0, 0.5);
    // win hand text (shows the winning hand name)
    this.winHandText = this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.3, "", {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(0.5);

    // play again text
    this.playAgainText = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.6,
        `PLAY ${this.bet} CREDIT(S)`,
        {
          fontFamily: "Oswald",
          fontSize: TEXT_SIZE,
        },
      )
      .setOrigin(0.5);

    // draw button
    this.drawButton = this.add
      .image(
        this.scale.width * 0.8,
        this.scale.height * 0.9,
        TextureKeys.BlueButton,
      )
      .setScale(0.19, 0.35)
      .setInteractive();
    // draw button text
    this.add
      .text(this.scale.width * 0.8, this.scale.height * 0.895, "DRAW", {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(0.5);
    // cash out button
    const cashOutButton = this.add
      .image(
        this.scale.width * 0.2,
        this.scale.height * 0.9,
        TextureKeys.OrangeButton,
      )
      .setScale(0.19, 0.35)
      .setInteractive();
    // cash out button text
    this.add
      .text(this.scale.width * 0.2, this.scale.height * 0.895, "CASH OUT", {
        fontFamily: "Oswald",
        fontSize: TEXT_SIZE,
      })
      .setOrigin(0.5);
    // chip
    let chip = new Chip(
      this,
      this.scale.width * 0.5,
      this.scale.height * 0.9,
      ChipKeys.RED,
    );
    this.add.existing(chip);

    const chipScreen = new ChipScreen(
      this,
      this.scale.width * 0.5,
      this.scale.height * 0.5,
    );
    this.initCards();
    this.add.existing(chipScreen);
    this.drawButton.on("pointerdown", this.handleDraw, this);
  }

  private initCards() {
    this.cards = new Phaser.GameObjects.Group(this);
    const startWidth = this.scale.width * 0.5;

    for (let i = 0; i < CARD_POSITIONS.length; i++) {
      let newCard = new Card(
        this,
        startWidth + CARD_POSITIONS[i],
        this.scale.height * 0.4,
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
        // reset win text
        this.winText.text = "";
        this.winHandText.text = "";
        // reset play again text
        this.playAgainText.text = "";
        // Get a new Deck and shuffle
        this.deck = new Deck();
        this.deck.shuffle();
        // Draw Cards
        // Flip Cards
        for (let i = 0; i < this.cards.getChildren().length; i++) {
          let card: Card = this.cards.getChildren()[i] as Card;
          let newCard = this.deck.draw();
          card.reset();
          card.rank = newCard!.rank;
          card.suit = newCard!.suit;
          card.flipUp(`${newCard!.suit}${newCard!.rank}.png`);
        }
        // Decrease credits
        this.updateCredits(-this.bet);
        // Set state to Draw
        this.state = GameStates.Draw;
        break;
      case GameStates.Init:
        if (this.credits < this.bet) {
          return;
        }
        // reset win text
        this.winText.text = "";
        this.winHandText.text = "";
        // reset play again text
        this.playAgainText.text = "";
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
        // update and show win text
        if (result.amount > 0) {
          this.winText.text = `WIN ${result.amount}!`;
          this.winHandText.text = `${result.hand}!`;
        }
        // update credits
        this.updateCredits(result.amount);
        // show play again text
        this.playAgainText.text = `PLAY ${this.bet} CREDIT(S)`;
        // Set state to Init
        this.state = GameStates.Init;
        break;
    }
  }

  private updateCredits(amount: number) {
    this.credits += amount;
    this.creditText.text = this.credits;
    localStorage.setItem("credits", JSON.stringify(this.credits));
  }
}
