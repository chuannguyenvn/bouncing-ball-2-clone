import Phaser from "phaser"
import PlayScene from "../../scenes/PlayScene"
import GameObjectType from "../../configs/GameObjectType"
import SpriteKey from "../../configs/SpriteKey"
import {PlatformChildType, PlatformComponent} from "./PlatformComponent"
import Constants from "../../configs/Constants"
import Gem from "./Gem"

class Platform extends Phaser.GameObjects.GameObject
{
    public index: number

    private playScene: PlayScene

    private platformMiddle: PlatformComponent
    private platformLeft: PlatformComponent
    private platformRight: PlatformComponent

    private gradientColumn: Phaser.GameObjects.Image

    private gem: Gem

    constructor(scene: PlayScene) {
        super(scene, GameObjectType.PLATFORM_PARENT)
        this.scene.add.existing(this)
        this.playScene = scene

        this.gradientColumn = scene.add.image(0, 0, SpriteKey.GRADIENT)
        this.gradientColumn.setOrigin(0.5, 0)
        this.gradientColumn.setDepth(-1)

        this.platformLeft = new PlatformComponent(scene, this, PlatformChildType.LEFT)
        this.platformRight = new PlatformComponent(scene, this, PlatformChildType.RIGHT)
        this.platformMiddle = new PlatformComponent(scene, this, PlatformChildType.MIDDLE)

        this.gem = new Gem(this.playScene, this)

        this.playScene.ball.hitCenter.subscribe((color) => this.handleBallHitCenter(color))
        this.playScene.ball.hitEdge.subscribe(() => this.handleBallHitEdge())
    }

    public setup(xPosition: number, yPosition: number, width: number): void {
        this.gradientColumn.setPosition(xPosition, yPosition)
        this.gradientColumn.setDisplaySize(width, 800 - yPosition)
        this.gradientColumn.setTint(Constants.GRADIENT_COLUMN_DEFAULT_TINT)

        this.platformLeft.setup(xPosition, yPosition, width)
        this.platformRight.setup(xPosition, yPosition, width)
        this.platformMiddle.setup(xPosition, yPosition, width)

        if (Math.random() < Constants.GEM_SPAWN_CHANCE)
        {
            this.gem.setPosition(xPosition, yPosition - 25)
        }
        else
        {
            this.gem.setPosition(0, -100)
        }
    }

    public removeBody(): void {
        this.playScene.matter.world.remove(this.platformLeft.body as object)
        this.playScene.matter.world.remove(this.platformRight.body as object)
        this.playScene.matter.world.remove(this.platformMiddle.body as object)

        this.playScene.tweens.add({
            targets: [this.platformLeft, this.platformMiddle, this.platformRight, this.gradientColumn],
            y: 1200,
            duration: 400,
            ease: 'Linear'
        })
    }

    public collectGem(): void {
        this.gem.setPosition(0, -100)
    }

    private handleBallHitCenter(color: number): void {
        this.gradientColumn.setTint(color)
    }

    private handleBallHitEdge(): void {
        this.gradientColumn.setTint(Constants.GRADIENT_COLUMN_DEFAULT_TINT)
    }
}

export default Platform