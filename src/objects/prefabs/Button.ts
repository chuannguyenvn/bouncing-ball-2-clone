import Phaser, {Scene} from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import Constants from "../../configs/Constants"
import GAMEOBJECT_POINTER_OUT = Phaser.Input.Events.GAMEOBJECT_POINTER_OUT
import GAMEOBJECT_POINTER_OVER = Phaser.Input.Events.GAMEOBJECT_POINTER_OVER
import GAMEOBJECT_POINTER_DOWN = Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN
import GAMEOBJECT_POINTER_UP = Phaser.Input.Events.GAMEOBJECT_POINTER_UP
import Text = Phaser.GameObjects.Text

class Button<S extends Scene> extends Phaser.GameObjects.NineSlice
{
    public text: Text

    constructor(scene: S, idleSprite: SpriteKey = SpriteKey.BUTTON_IDLE, hoverSprite: SpriteKey = SpriteKey.BUTTON_IDLE, clickedSprite: SpriteKey = SpriteKey.BUTTON_CLICKED) {
        super(scene, 0, 0, idleSprite, 0, 512, 256, 128, 128)
        this.scene.add.existing(this)

        this.on(GAMEOBJECT_POINTER_OUT, () => this.setTexture(idleSprite))
        if (hoverSprite) this.on(GAMEOBJECT_POINTER_OVER, () => this.setTexture(hoverSprite))
        if (hoverSprite) this.on(GAMEOBJECT_POINTER_UP, () => this.setTexture(hoverSprite))
        if (clickedSprite) this.on(GAMEOBJECT_POINTER_DOWN, () => this.setTexture(clickedSprite))

        this.setInteractive()
        this.setScrollFactor(0)
        this.setTexture(idleSprite)
        this.setSize(1000, 10)
        this.setScale(0.1)
        this.setTint(Constants.PLATFORM_TINT)

        this.text = scene.add.text(this.x, this.y, "text")
        this.text.setOrigin(0.5)
        this.text.setColor('#ffffff')
        this.text.setDepth(1000)
        this.text.setScrollFactor(0)
        this.text.setFont('25px calibri')
    }

    public setPosition(x?: number, y?: number, z?: number, w?: number): this {
        this.text?.setPosition(x, y)
        return super.setPosition(x, y, z, w)
    }

    public setVisible(value: boolean): this {
        this.text?.setVisible(value)
        return super.setVisible(value)
    }
}

export default Button