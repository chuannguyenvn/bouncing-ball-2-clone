import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"
import PreloadHelper from "../utilities/PreloadHelper"
import SpriteKey from "../configs/SpriteKey"
import {GameManager, GameState} from "../managers/GameManager"

class BootScene extends Scene
{
    constructor() {
        super({
            key: SceneKey.BOOT
        })
    }

    preload(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
    }

    create(): void {
        GameManager.stateMachine.configure(GameState.BOOT).onExit(-1, () => {
            this.scene.stop()
            this.scene.start(SceneKey.SPLASH)
        })
        GameManager.stateMachine.changeState(GameState.LOADING)
    }
}

export default BootScene