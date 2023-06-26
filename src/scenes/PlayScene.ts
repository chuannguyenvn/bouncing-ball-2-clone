import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"
import SpriteKey from "../configs/SpriteKey"
import Ball from "../objects/Ball"
import PreloadHelper from "../utilities/PreloadHelper"
import Platform from "../objects/Platform"
import IUpdatable from "../interfaces/IUpdatable"

class PlayScene extends Phaser.Scene
{
    private updatables: IUpdatable[] = []

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
        new Platform(this, 100, 400)
    }

    update(time: number, delta: number) {
        this.updatables.forEach(updatable => updatable.update(time, delta))
    }

    public registerUpdatable(updatable: IUpdatable) {
        this.updatables.push(updatable)
    }
}

export default PlayScene