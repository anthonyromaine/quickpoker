import SceneKeys from "../constants/SceneKeys";

import TextureKeys from "../constants/TextureKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(TextureKeys.BlueButton, "game/BlueButton.png");
    this.load.atlas(TextureKeys.Cards, "game/cards.png", "game/cards.json");
    this.add.text(0, 0, "A", {
      font: "1px Oswald",
    });
  }

  create() {
    this.scene.start(SceneKeys.Game);
  }
}
