import GAME_CONFIG from "./configs/Config"
import Phaser from "phaser"

export class Game extends Phaser.Game
{
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

window.addEventListener('load', () => {
    const game = new Game(GAME_CONFIG)
})