import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"
import SpriteKey from "../configs/SpriteKey"
import Ball from "../objects/Ball"
import PreloadHelper from "../utilities/PreloadHelper"
import Platform from "../objects/Platform"

class PlayScene extends Phaser.Scene
{
    constructor() {
        super({
            key: SceneKey.PLAY
        })
    }

    preload(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.SQUARE)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
    }

    create(): void {
        this.matter.world.setBounds()
        new Ball(this)
        new Platform(this, 100, 50)
    }
}

export default PlayScene