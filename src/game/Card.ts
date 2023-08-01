import { CARD_SCALE } from "../constants/CardConstants";
import GameStates from "../constants/GameStates";
import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";

export default class Card extends Phaser.GameObjects.Container {
  private cardImage: Phaser.GameObjects.Image;
  private heldText: Phaser.GameObjects.Text;
  public held: boolean = false;
  constructor(scene: Game, x: number, y: number, startTexture: string) {
    super(scene, x, y);

    this.cardImage = this.scene.add
      .image(0, 0, TextureKeys.Cards, startTexture)
      .setScale(CARD_SCALE)
      .setInteractive();
    this.heldText = this.scene.add
      .text(0, 130, "HELD", {
        fontFamily: "Oswald",
        fontSize: "72px",
      })
      .setOrigin(0.5)
      .setScale(CARD_SCALE)
      .setVisible(this.held);

    this.cardImage.on("pointerdown", this.handleHeld, this);

    this.add(this.cardImage);
    this.add(this.heldText);
  }

  private handleHeld() {
    const scene = this.scene as Game;
    if (scene.state === GameStates.Draw) {
      if (this.held) {
        this.held = false;
        this.heldText.setVisible(this.held);
      } else {
        this.held = true;
        this.heldText.setVisible(this.held);
      }
    }
  }

  reset() {
    this.held = false;
    this.heldText.setVisible(this.held);
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
