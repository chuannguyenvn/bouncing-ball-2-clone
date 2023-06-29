import Button from "../prefabs/Button"
import PlayScene from "../../scenes/PlayScene"
import {GameManager, GameState} from "../../managers/GameManager"

class RestartButton extends Button<PlayScene>
{
    constructor(scene: PlayScene) {
        super(scene)

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            scene.isWelcomingPlayer = true
            GameManager.stateMachine.changeState(GameState.PLAY)
        })
    }
}

export default RestartButton