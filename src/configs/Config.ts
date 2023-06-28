import Phaser from "phaser"
import PlayScene from "../scenes/PlayScene"
import LoadScene from "../scenes/LoadScene"
import BootScene from "../scenes/BootScene"

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
    title: 'Bouncing Ball 2',
    width: 450,
    height: 800,
    parent: 'game',
    // scale: {
    //     mode: Phaser.Scale.RESIZE,
    // },
    scene: [BootScene, LoadScene, PlayScene],
    backgroundColor: 0xffffff,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0.4
            }
        }
    },
}

export default GAME_CONFIG