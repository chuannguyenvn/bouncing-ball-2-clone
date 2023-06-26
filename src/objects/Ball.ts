import Phaser, {Scene} from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"

class Ball extends Phaser.Physics.Matter.Sprite
{
    constructor(scene: Scene) {
        super(scene.matter.world, 100, 100, SpriteKey.BALL_DEFAULT)
        this.scene.add.existing(this)

        this.setScale(Constants.BALL_SPRITE_SCALE)
        this.setCircle(1024 * Constants.BALL_SPRITE_SCALE)
    }
}

export default Ball