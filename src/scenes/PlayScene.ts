import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"

class PlayScene extends Phaser.Scene
{
    constructor() {
        super({
            key: SceneKey.PLAY
        })
    }
}

export default PlayScene