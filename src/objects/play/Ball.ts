import Phaser from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import Constants from "../../configs/Constants"
import PlayScene from "../../scenes/PlayScene"
import {BodyType} from "matter"
import GameObjectType from "../../configs/GameObjectType"
import PlayState from "../../states/PlayState"
import {PlatformComponent} from "./PlatformComponent"
import Gem from "./Gem"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent
import Tween = Phaser.Tweens.Tween
import {GameManager} from "../../managers/GameManager"
import {GameEvent, ParamGameEvent} from "../../utilities/Event"
import Color = Phaser.Display.Color

class Ball extends Phaser.Physics.Matter.Sprite
{
    public hitCenter: ParamGameEvent<number> = new ParamGameEvent<number>()
    public hitEdge: GameEvent = new GameEvent()
    
    private playScene: PlayScene
    private velocityTween: Tween

    constructor(scene: PlayScene) {
        super(scene.matter.world, -300, -100, GameManager.currentSkin)
        this.scene.add.existing(this)
        this.playScene = scene

        this.type = GameObjectType.BALL

        this.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)
        this.setCircle(Constants.BALL_RADIUS)
        this.setMass(1)
        this.setFriction(0, 0, 0)
        this.setStatic(true)

        this.playScene.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (event: CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
                if (bodyB.gameObject && (bodyB.gameObject.type === GameObjectType.PLATFORM_MIDDLE || bodyB.gameObject.type === GameObjectType.PLATFORM_SIDE))
                {
                    if (this.velocityTween) this.velocityTween.stop()

                    const platformComponent = (bodyB.gameObject as PlatformComponent)
                    const index = platformComponent.platformParent.index
                    this.playScene.platformSpawner.touchedPlatformIndex.invoke(index)

                    if (bodyB.gameObject.type === GameObjectType.PLATFORM_MIDDLE)
                    {
                        const color = Phaser.Math.RND.pick(Constants.GRADIENT_COLUMN_RANDOM_TINTS)
                        this.playScene.addScore(2)
                        this.hitCenter.invoke(color)
                        platformComponent.glow(Constants.PLATFORM_HIT_MIDDLE_TINT)
                    }
                    else
                    {
                        this.playScene.addScore(1)
                        this.hitEdge.invoke()
                        platformComponent.glow(Constants.PLATFORM_HIT_EDGE_TINT)
                    }
                    
                    platformComponent.platformParent.removeBody()
                    this.playScene.time.addEvent({
                        delay: 5, callback: () => {
                            this.setVelocity(Constants.BALL_X_VELOCITY, -7)
                            this.setAngularVelocity(0.2)
                        }
                    })
                }
                else if (bodyB.gameObject && bodyB.gameObject.type === GameObjectType.GEM)
                {
                    this.playScene.collectedGems++
                    (bodyB.gameObject as Gem).platformParent.collectGem()
                }
                else
                {
                    this.playScene.stateMachine.changeState(PlayState.LOSE)
                    this.playScene.matter.world.setBounds(0, 0, 0, 0)
                }
            })

        this.playScene.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.thrustDown())

        const spaceBar = this.playScene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        spaceBar?.on(Phaser.Input.Keyboard.Events.DOWN, () => this.thrustDown())

        this.playScene.stateMachine.configure(PlayState.MOVING).onEntry(-1, () => {
            this.setStatic(false)
        })

        if (this.playScene.isWelcomingPlayer)
        {
            this.setPosition(Constants.BALL_START_POSITION.x, Constants.BALL_START_POSITION.y)
        }
        else
        {
            this.playScene.tweens.add({
                targets: this,
                x: Constants.BALL_START_POSITION.x,
                y: Constants.BALL_START_POSITION.y,
                duration: 700,
                delay: 1000,
                ease: Phaser.Math.Easing.Sine.Out,
                // onComplete: () => this.playScene.cameras.main.startFollow()
            })
        }
    }

    private thrustDown(): void {
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
    }
}

export default Ball