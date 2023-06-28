import Phaser from "phaser"
import PlayScene from "../scenes/PlayScene"
import LoadScene from "../scenes/LoadScene"
import BootScene from "../scenes/BootScene"
import ShopScene from "../scenes/ShopScene"

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
    title: 'Bouncing Ball 2',
    width: 450,
    height: 800,
    parent: 'game',
    // scale: {
    //     mode: Phaser.Scale.RESIZE,
    // },
    scene: [BootScene, LoadScene, PlayScene, ShopScene],
    backgroundColor: 0xffffff,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0.4
            }
        }
    },
}

export default GAME_CONFIG