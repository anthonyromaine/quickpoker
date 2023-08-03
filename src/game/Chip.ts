import {
  ChipFontColor,
  ChipKeys,
  ChipValues,
} from "../constants/ChipConstants";
import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";

export default class Chip extends Phaser.GameObjects.Container {
  private texture: ChipKeys;
  constructor(scene: Game, x: number, y: number, texture: ChipKeys) {
    super(scene, x, y);
    this.texture = texture;
    const chip = this.scene.add
      .image(0, 0, TextureKeys.Chips, texture)
      .setScale(0.3);

    const chipText = this.scene.add
      .text(0, 0, String(ChipValues[texture]), {
        fontFamily: "Oswald",
        fontSize: "80px",
        color: ChipFontColor[texture],
      })
      .setOrigin(0.5);

    this.add(chip);
    this.add(chipText);
  }

  getTexture() {
    return this.texture;
  }
}
