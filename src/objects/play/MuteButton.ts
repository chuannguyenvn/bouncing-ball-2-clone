import Button from "../prefabs/Button"
import PlayScene from "../../scenes/PlayScene"
import SpriteKey from "../../configs/SpriteKey"
import GameManager from "../../managers/GameManager"
import GAMEOBJECT_POINTER_UP = Phaser.Input.Events.GAMEOBJECT_POINTER_UP

class MuteButton extends Button<PlayScene>
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, SpriteKey.BUTTON_IDLE, SpriteKey.BUTTON_IDLE, SpriteKey.BUTTON_CLICKED)
        this.playScene = scene

        this.setPosition(380, 40)
        this.setDepth(100)
        this.setSize(700, 10)
        this.setScale(0.15)

        this.on(GAMEOBJECT_POINTER_UP, () => {
            this.playScene.isPressingButton = true
            GameManager.isMute = !GameManager.isMute
            this.text.text = GameManager.isMute ? 'Unmute' : 'Mute'
        })

        this.text.text = GameManager.isMute ? 'Unmute' : 'Mute'
    }
}

export default MuteButton