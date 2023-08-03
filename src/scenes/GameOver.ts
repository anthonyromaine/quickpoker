import LocalStorageKeys from "../constants/LocalStorageKeys";
import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";

type InitData = {
  score: number;
};

export default class GameOver extends Phaser.Scene {
  score!: number;
  highscore: number = JSON.parse(
    localStorage.getItem(LocalStorageKeys.HIGH_SCORE) || "0",
  );
  constructor() {
    super(SceneKeys.GameOver);
  }

  init(data: InitData) {
    this.score = data.score;
  }

  create() {
    const { width, height } = this.scale;
    // set background ui card
    this.add.image(width * 0.5, height * 0.5, TextureKeys.UICard).setScale(0.4);

    const result = this.score > this.highscore;

    if (result) {
      this.highscore = this.score;
      localStorage.setItem(LocalStorageKeys.HIGH_SCORE, String(this.highscore));
    }
    // result label
    this.add
      .text(
        width * 0.5,
        height * 0.32,
        result ? "NEW HIGH SCORE!!" : "GAME OVER!",
        {
          fontFamily: "Oswald",
          fontSize: "72px",
          color: "#000000",
        },
      )
      .setOrigin(0.5);

    // score text
    this.add
      .text(width * 0.5, height * 0.45, `SCORE: ${this.score}`, {
        fontFamily: "Oswald",
        fontSize: "128px",
        color: "#000000",
      })
      .setOrigin(0.5);

    // high score text
    this.add
      .text(width * 0.5, height * 0.53, `HIGHSCORE: ${this.highscore}`, {
        fontFamily: "Oswald",
        fontSize: "48px",
        color: "#000000",
      })
      .setOrigin(0.5)
      .setVisible(!result);

    const playAgainButton = this.add
      .image(width * 0.5, height * 0.65, TextureKeys.BlueButton)
      .setScale(0.4)
      .setInteractive();

    this.add
      .text(width * 0.5, height * 0.645, "PLAY AGAIN", {
        fontFamily: "Oswald",
        fontSize: "72px",
      })
      .setOrigin(0.5);

    localStorage.removeItem(LocalStorageKeys.CREDITS);
    playAgainButton.on("pointerdown", () => {
      location.reload();
    });
  }
}
