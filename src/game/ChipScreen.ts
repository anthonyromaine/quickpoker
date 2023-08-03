import { ChipKeys, ChipPositions } from "../constants/ChipConstants";
import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";
import Chip from "./Chip";

export default class ChipScreen extends Phaser.GameObjects.Container {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    const uicard = this.scene.add.image(0, 0, TextureKeys.UICard).setScale(0.4);
    this.setSize(uicard.width, uicard.height);
    const selectText = this.scene.add
      .text(0, -this.height * 0.15, "SELECT BET", {
        fontFamily: "Oswald",
        fontSize: "72px",
        color: "#000000",
      })
      .setOrigin(0.5);

    this.add([uicard, selectText]);
    this.setInteractive();

    for (const chipkey of Object.values(ChipKeys)) {
      const { x, y } = ChipPositions[chipkey];
      const newChip = new Chip(this.scene as Game, x, y, chipkey);
      this.add(newChip);
    }
  }
}
