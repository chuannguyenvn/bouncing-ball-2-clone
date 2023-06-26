import Phaser from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"
import PlayScene from "../scenes/PlayScene"
import IUpdatable from "../interfaces/IUpdatable"
import {BodyType} from "matter"
import GameObjectType from "../configs/GameObjectType"
import PlayState from "../states/PlayState"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent

class Ball extends Phaser.Physics.Matter.Sprite implements IUpdatable
{
    private playScene: PlayScene
    
    constructor(scene: PlayScene) {
        super(scene.matter.world, 0, 0, SpriteKey.BALL_DEFAULT)
        this.scene.add.existing(this)
        scene.registerUpdatable(this)
        this.playScene = scene
        
        this.type = GameObjectType.BALL

        this.setDisplaySize(Constants.BALL_SPRITE_RADIUS * 2, Constants.BALL_SPRITE_RADIUS * 2)
        this.setCircle(Constants.BALL_SPRITE_RADIUS)

        scene.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (event: CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
                console.log(bodyB)
                if (bodyB.gameObject.type === GameObjectType.PLATFORM)
                    this.setVelocity(10, -10)
                else
                {
                    console.log("Lose")
                }
            })

        scene.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.setVelocityY(10)
        })
    }

    public update(time: number, delta: number): void {
        if (this.y > 400) this.playScene.stateMachine.changeState(PlayState.LOSE)
    }
}

export default Ball