import Button from "../prefabs/Button"
import PlayScene from "../../scenes/PlayScene"
import {GameManager, GameState} from "../../managers/GameManager"

class RestartButton extends Button<PlayScene>
{
    constructor(scene: PlayScene) {
        super(scene)

        this.setPosition(scene.scale.width / 2, scene.scale.height / 2)
        this.text.text = 'Restart'
        this.setDepth(100)
        this.setSize(700, 10)
        this.setScale(0.15)

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            scene.isWelcomingPlayer = true
            GameManager.stateMachine.changeState(GameState.PLAY)
        })
    }
}

export default RestartButton