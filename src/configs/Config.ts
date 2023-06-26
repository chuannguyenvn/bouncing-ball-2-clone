import Phaser from "phaser"
import PlayScene from "../scenes/PlayScene"
import WelcomeScene from "../scenes/WelcomeScene"

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
    title: 'Bouncing Ball 2',
    width: 540,
    height: 960,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    scene: [WelcomeScene, PlayScene],
    backgroundColor: 0x111111,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 9.8
            }
        }
    },
}

export default GAME_CONFIG