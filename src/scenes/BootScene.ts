import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"
import PreloadHelper from "../utilities/PreloadHelper"
import SpriteKey from "../configs/SpriteKey"
import {GameManager, GameState} from "../managers/GameManager"

class BootScene extends Scene
{
    constructor() {
        super({key: SceneKey.BOOT})
    }

    preload(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
    }

    create(): void {
        this.tweens.setFps(60)
        
        GameManager.sceneManager = this.scene
        GameManager.stateMachine
            .configure(GameState.BOOT)
            .onExit(-1, () => GameManager.sceneManager.stop(this))
        GameManager.stateMachine.changeState(GameState.LOADING)
    }
}

export default BootScene