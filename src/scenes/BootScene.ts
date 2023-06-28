import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"
import PreloadHelper from "../utilities/PreloadHelper"
import SpriteKey from "../configs/SpriteKey"

class BootScene extends Scene
{
    constructor() {
        super({
            key: SceneKey.BOOT
        })
    }

    preload() : void{
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
    }
    
    create() : void{
        this.scene.stop()
        this.scene.start(SceneKey.SPLASH)
    }
}

export default BootScene