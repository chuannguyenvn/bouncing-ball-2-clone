import Phaser from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import Constants from "../../configs/Constants"
import PlayScene from "../../scenes/PlayScene"
import {BodyType} from "matter"
import GameObjectType from "../../configs/GameObjectType"
import PlayState from "../../states/PlayState"
import {PlatformComponent} from "./PlatformComponent"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent
import Tween = Phaser.Tweens.Tween

class Ball extends Phaser.Physics.Matter.Sprite
{
    private playScene: PlayScene
    private velocityTween: Tween

    constructor(scene: PlayScene) {
        super(scene.matter.world, 0, 0, SpriteKey.BALL_DEFAULT)
        this.scene.add.existing(this)
        this.playScene = scene

        this.type = GameObjectType.BALL

        this.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)
        this.setCircle(Constants.BALL_RADIUS)
        this.setMass(1)
        this.setFriction(0, 0, 0)
        this.setStatic(true)

        scene.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (event: CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
                if (bodyB.gameObject && (bodyB.gameObject.type === GameObjectType.PLATFORM_MIDDLE || bodyB.gameObject.type === GameObjectType.PLATFORM_SIDE))
                {
                    if (bodyB.gameObject.type === GameObjectType.PLATFORM_MIDDLE)
                        scene.addScore(2)
                    else
                        scene.addScore(1)

                    if (this.velocityTween) this.velocityTween.stop()

                    const platformComponent = (bodyB.gameObject as PlatformComponent)
                    const index = platformComponent.platformParent.index
                    this.playScene.platformSpawner.touchedPlatformIndex.invoke(index)

                    platformComponent.glow()
                    platformComponent.platformParent.removeBody()
                    scene.time.addEvent({
                        delay: 5, callback: () => {
                            this.setVelocity(Constants.BALL_X_VELOCITY, -7)
                            this.setAngularVelocity(0.2)
                        }
                    })
                }
                else if (bodyB.gameObject && bodyB.gameObject.type === GameObjectType.GEM)
                {
                    this.playScene.collectedGems++
                    bodyB.gameObject.destroy()
                }
                else
                {
                    this.playScene.stateMachine.changeState(PlayState.LOSE)
                    scene.matter.world.setBounds(0, 0, 0, 0)
                }
            })

        scene.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.velocityTween) this.velocityTween.stop()

            this.velocityTween = this.playScene.tweens.addCounter({
                from: this.getVelocity().y,
                to: 12,
                ease: 'expo.out',
                duration: 1000,
                onUpdate: (tween) => {
                    this.setVelocityY(tween.getValue())
                }
            })
        })

        this.playScene.stateMachine.configure(PlayState.MOVING).onEntry(-1, () => this.setStatic(false))
    }
}

export default Ball