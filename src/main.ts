import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 720,
  height: 1280,
  backgroundColor: "#075e07",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  scene: [Preloader, Game, GameOver],
};

export default new Phaser.Game(config);
