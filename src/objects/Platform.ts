import Phaser from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"
import GameObjectType from "../configs/GameObjectType"
import PlayScene from "../scenes/PlayScene"

class Platform extends Phaser.Physics.Matter.Image
{
    public index: number
    private gradientColumn: Phaser.GameObjects.Image
    private leftSide: Phaser.Physics.Matter.Image
    private rightSide: Phaser.Physics.Matter.Image

    constructor(scene: PlayScene) {
        super(scene.matter.world, 0, 0, SpriteKey.SQUARE)
        this.scene.add.existing(this)

        this.type = GameObjectType.PLATFORM_MIDDLE

        this.setTint(Constants.PLATFORM_TINT)
        this.setPosition(-10000, 0)

        this.gradientColumn = scene.add.image(0, 0, SpriteKey.GRADIENT)
        this.gradientColumn.setOrigin(0.5, 0)

        this.leftSide = scene.matter.add.image(0, 0, SpriteKey.SQUARE)
        this.leftSide.setTint(Constants.PLATFORM_TINT)

        this.rightSide = scene.matter.add.image(0, 0, SpriteKey.SQUARE)
        this.rightSide.setTint(Constants.PLATFORM_TINT)
    }

    public setup(width: number, xPosition: number, yPosition: number): void {
        this.setDisplaySize(width * Constants.PLATFORM_MIDDLE_PERCENTAGE, Constants.PLATFORM_THICKNESS)
        this.setRectangle(width * Constants.PLATFORM_MIDDLE_PERCENTAGE, Constants.PLATFORM_THICKNESS, {isStatic: true})
        this.setPosition(xPosition, yPosition)

        this.leftSide.setDisplaySize(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS)
        this.leftSide.setRectangle(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS, {isStatic: true})
        this.leftSide.setPosition(xPosition - width * (0.5 - (1 - Constants.PLATFORM_MIDDLE_PERCENTAGE) / 4), yPosition)

        this.rightSide.setDisplaySize(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS)
        this.rightSide.setRectangle(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS, {isStatic: true})
        this.rightSide.setPosition(xPosition + width * (0.5 - (1 - Constants.PLATFORM_MIDDLE_PERCENTAGE) / 4), yPosition)

        this.gradientColumn.setPosition(this.x, this.y)
        this.gradientColumn.setDisplaySize(width, 700 - yPosition)
        this.gradientColumn.setTint(0x888888)
    }
}

export default Platform