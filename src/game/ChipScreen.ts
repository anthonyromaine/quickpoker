import { ChipKeys, ChipPositions } from "../constants/ChipConstants";
import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";
import Chip from "./Chip";

export default class ChipScreen extends Phaser.GameObjects.Container {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    const uicard = this.scene.add.image(0, 0, TextureKeys.UICard).setScale(0.4);
    this.setSize(uicard.displayWidth, uicard.displayHeight);
    const selectText = this.scene.add
      .text(0, -this.height * 0.35, "SELECT BET", {
        fontFamily: "Oswald",
        fontSize: "72px",
        color: "#000000",
      })
      .setOrigin(0.5);

    this.add([uicard, selectText]);

    for (const chipkey of Object.values(ChipKeys)) {
      const { x, y } = ChipPositions[chipkey];
      const newChip = new Chip(this.scene as Game, x, y, chipkey);
      this.add(newChip);
      newChip.setInteractive();
      newChip.on("pointerdown", this.handleChipClick, newChip);
    }
  }

  handleChipClick(this: Chip) {
    const scene = this.scene as Game;
    scene.setBet(this.getTexture());
  }
}
