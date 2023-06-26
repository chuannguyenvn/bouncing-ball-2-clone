import Phaser, {Scene} from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"

class Platform extends Phaser.Physics.Matter.Sprite
{
    constructor(scene: Scene, width: number, yPosition: number) {
        super(scene.matter.world, 0, 0, SpriteKey.SQUARE)
        this.scene.add.existing(this)

        this.setRectangle(width, Constants.PLATFORM_THICKNESS)
        this.setDisplaySize(width, Constants.PLATFORM_THICKNESS)
        this.setStatic(true)
        this.setPosition(0, yPosition)
    }
}

export default Platform