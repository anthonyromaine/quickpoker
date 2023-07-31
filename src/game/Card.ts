import { CARD_SCALE } from "../constants/CardConstants";
import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";

export default class Card extends Phaser.GameObjects.Container {
  private cardImage: Phaser.GameObjects.Image;
  constructor(scene: Game, x: number, y: number, startTexture: string) {
    super(scene, x, y);

    this.cardImage = this.scene.add
      .image(0, 0, TextureKeys.Cards, startTexture)
      .setScale(CARD_SCALE);

    this.add(this.cardImage);
  }

  flip(texture: string) {
    this.scene.tweens.add({
      targets: this.cardImage,
      scaleX: 0,
      duration: 300,
      onComplete: (_tween, _targets, card: Card, texture: string) => {
        card.cardImage.setTexture(TextureKeys.Cards, "cardback.png");
        card.scene.tweens.add({
          targets: card.cardImage,
          scaleX: CARD_SCALE,
          duration: 300,
          onComplete: (_tween, _targets, card: Card, texture: string) => {
            card.flipUp(texture);
          },
          onCompleteParams: [card, texture],
        });
      },
      onCompleteParams: [this, texture],
    });
  }

  flipUp(texture: string) {
    this.scene.tweens.add({
      targets: this.cardImage,
      scaleX: 0,
      duration: 300,
      onComplete: (_tween, _targets, card: Card, texture: string) => {
        card.cardImage.setTexture(TextureKeys.Cards, texture);
        card.scene.tweens.add({
          targets: card.cardImage,
          scaleX: CARD_SCALE,
          duration: 300,
        });
      },
      onCompleteParams: [this, texture],
    });
  }
}
