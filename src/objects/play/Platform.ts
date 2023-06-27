import Phaser from "phaser"
import PlayScene from "../../scenes/PlayScene"
import GameObjectType from "../../configs/GameObjectType"
import SpriteKey from "../../configs/SpriteKey"
import {PlatformChildType, PlatformComponent} from "./PlatformComponent"
import Constants from "../../configs/Constants"

class Platform extends Phaser.GameObjects.GameObject
{
    public index: number

    private playScene: PlayScene

    private platformMiddle: PlatformComponent
    private platformLeft: PlatformComponent
    private platformRight: PlatformComponent

    private gradientColumn: Phaser.GameObjects.Image

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
    }

    public setup(xPosition: number, yPosition: number, width: number): void {
        this.gradientColumn.setPosition(xPosition, yPosition)
        this.gradientColumn.setDisplaySize(width, 700 - yPosition)
        this.gradientColumn.setTint(Constants.GRADIENT_COLUM_DEFAULT_TINT)

        this.platformLeft.setup(xPosition, yPosition, width)
        this.platformRight.setup(xPosition, yPosition, width)
        this.platformMiddle.setup(xPosition, yPosition, width)
    }

    public removeBody(): void {
        this.playScene.matter.world.remove(this.platformLeft.body as object)
        this.playScene.matter.world.remove(this.platformRight.body as object)
        this.playScene.matter.world.remove(this.platformMiddle.body as object)
    }
}

export default Platform