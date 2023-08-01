import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";

export default class Chip extends Phaser.GameObjects.Container {
  constructor(scene: Game, x: number, y: number, texture: string) {
    super(scene, x, y);
    const chip = this.scene.add
      .image(0, 0, TextureKeys.Chips, texture)
      .setScale(0.3);

    const chipText = this.scene.add
      .text(0, 0, "1", {
        fontFamily: "Oswald",
        fontSize: "80px",
        color: "#000000",
      })
      .setOrigin(0.5);

    this.add(chip);
    this.add(chipText);
  }
}
