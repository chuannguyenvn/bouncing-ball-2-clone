import Phaser from "phaser"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"
import GameObjectType from "../configs/GameObjectType"
import PlayScene from "../scenes/PlayScene"

class Platform extends Phaser.Physics.Matter.Sprite
{
    public index: number
    
    constructor(scene: PlayScene) {
        super(scene.matter.world, 0, 0, SpriteKey.SQUARE)
        this.scene.add.existing(this)

        this.type = GameObjectType.PLATFORM

        this.setTint(Constants.PLATFORM_TINT)
        this.setStatic(true)
        this.setPosition(-10000, 0)
    }

    public setup(width: number, xPosition: number, yPosition: number): void {
        this.setDisplaySize(width, Constants.PLATFORM_THICKNESS)
        this.setRectangle(width, Constants.PLATFORM_THICKNESS, {isStatic: true})
        this.setPosition(xPosition, yPosition)
    }
}

export default Platform