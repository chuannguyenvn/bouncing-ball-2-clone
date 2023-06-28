import Button from "../prefabs/Button"
import PlayScene from "../../scenes/PlayScene"
import SpriteKey from "../../configs/SpriteKey"
import GAMEOBJECT_POINTER_UP = Phaser.Input.Events.GAMEOBJECT_POINTER_UP

class VisitShopButton extends Button<PlayScene>
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, SpriteKey.BUTTON_BLUE_IDLE, SpriteKey.BUTTON_BLUE_IDLE, SpriteKey.BUTTON_BLUE_CLICKED)
        this.playScene = scene

        this.setPosition(100, 100)
        this.setDepth(100)
        
        this.on(GAMEOBJECT_POINTER_UP, () => {
            this.playScene.visitShop()
        })
    }
}

export default VisitShopButton