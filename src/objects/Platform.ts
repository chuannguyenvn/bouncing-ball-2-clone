import Phaser from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"
import GameObjectType from "../configs/GameObjectType"
import PlayScene from "../scenes/PlayScene"
import Image = Phaser.GameObjects.Image

class Platform extends Phaser.Physics.Matter.Image
{
    public index: number
    private gradientColumn: Image

    constructor(scene: PlayScene) {
        super(scene.matter.world, 0, 0, SpriteKey.SQUARE)
        this.scene.add.existing(this)

        this.type = GameObjectType.PLATFORM

        this.setTint(Constants.PLATFORM_TINT)
        this.setStatic(true)
        this.setPosition(-10000, 0)

        this.gradientColumn = scene.add.image(0, 0, SpriteKey.GRADIENT)
        this.gradientColumn.setOrigin(0.5, 0)
    }

    public setup(width: number, xPosition: number, yPosition: number): void {
        this.setDisplaySize(width, Constants.PLATFORM_THICKNESS)
        this.setRectangle(width, Constants.PLATFORM_THICKNESS, {isStatic: true})
        this.setPosition(xPosition, yPosition)
        
        this.gradientColumn.setPosition(this.x, this.y)
        this.gradientColumn.setDisplaySize(width, 700 - yPosition)
        this.gradientColumn.setTint(0x888888)
    }
}

export default Platform