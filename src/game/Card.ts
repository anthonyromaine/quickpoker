import { CARD_SCALE } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";

export default class Card extends Phaser.GameObjects.Container {
  constructor(scene: Game, x: number, y: number, startTexture: string) {
    super(scene, x, y);

    let card = this.scene.add
      .image(0, 0, TextureKeys.Cards, startTexture)
      .setScale(CARD_SCALE);

    this.add(card);
  }
}
