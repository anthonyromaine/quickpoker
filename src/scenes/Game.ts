import Phaser from "phaser";
import TextureKeys from "../constants/TextureKeys";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {}

  create() {
    const startWidth = this.scale.width * 0.5;
    this.add
      .image(startWidth, this.scale.height * 0.5, TextureKeys.Cards, "C8.png")
      .setScale(0.9);
    this.add
      .image(
        startWidth - 140,
        this.scale.height * 0.5,
        TextureKeys.Cards,
        "CA.png",
      )
      .setScale(0.9);
    this.add
      .image(
        startWidth - 140 * 2,
        this.scale.height * 0.5,
        TextureKeys.Cards,
        "C2.png",
      )
      .setScale(0.9);
    this.add
      .image(
        startWidth + 140 * 1,
        this.scale.height * 0.5,
        TextureKeys.Cards,
        "C3.png",
      )
      .setScale(0.9);
    this.add
      .image(
        startWidth + 140 * 2,
        this.scale.height * 0.5,
        TextureKeys.Cards,
        "C7.png",
      )
      .setScale(0.9);
    this.add
      .image(
        startWidth + 140 * 2,
        this.scale.height * 0.5,
        TextureKeys.Cards,
        "cardback.png",
      )
      .setScale(0.9);
  }
}
