import Phaser, {Scene} from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"
import PlayScene from "../scenes/PlayScene"
import IUpdatable from "../interfaces/IUpdatable"

class Ball extends Phaser.Physics.Matter.Sprite implements IUpdatable
{
    constructor(scene: PlayScene) {
        super(scene.matter.world, 0, 0, SpriteKey.BALL_DEFAULT)
        this.scene.add.existing(this)
        scene.registerUpdatable(this)

        this.setDisplaySize(Constants.BALL_SPRITE_RADIUS * 2, Constants.BALL_SPRITE_RADIUS * 2)
        this.setCircle(Constants.BALL_SPRITE_RADIUS)
        
        scene.matter.world.on(Phaser.Physics.Matter.Events.COLLISION_START, () => {
            this.setVelocityY(-10)
        })
        
        scene.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.setVelocityY(10)
        })
    }
    
    public update(time: number, delta: number) : void {
        this.x = 100
    }
}

export default Ball