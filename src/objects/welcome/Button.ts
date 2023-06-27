import Phaser, {Scene} from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import GAMEOBJECT_POINTER_OUT = Phaser.Input.Events.GAMEOBJECT_POINTER_OUT
import GAMEOBJECT_POINTER_OVER = Phaser.Input.Events.GAMEOBJECT_POINTER_OVER
import GAMEOBJECT_POINTER_DOWN = Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN
import GAMEOBJECT_POINTER_UP = Phaser.Input.Events.GAMEOBJECT_POINTER_UP

class Button<S extends Scene> extends Phaser.GameObjects.Image
{
    constructor(scene: S, idleSprite: SpriteKey, hoverSprite?: SpriteKey, clickedSprite?: SpriteKey) {
        super(scene, 0, 0, idleSprite)
        this.scene.add.existing(this)
        
        this.on(GAMEOBJECT_POINTER_OUT, () => this.setTexture(idleSprite))
        if (hoverSprite) this.on(GAMEOBJECT_POINTER_OVER, () => this.setTexture(hoverSprite))
        if (hoverSprite) this.on(GAMEOBJECT_POINTER_UP, () => this.setTexture(hoverSprite))
        if (clickedSprite) this.on(GAMEOBJECT_POINTER_DOWN, () => this.setTexture(clickedSprite))

        this.setInteractive()
        this.setScrollFactor(0)
        this.setTexture(idleSprite)
    }
}

export default Button