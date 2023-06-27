import Phaser from "phaser"
import PlayScene from "../../scenes/PlayScene"
import SpriteKey from "../../configs/SpriteKey"
import GameObjectType from "../../configs/GameObjectType"
import Constants from "../../configs/Constants"
import Platform from "./Platform"

class PlatformComponent extends Phaser.Physics.Matter.Image
{
    public platformParent: Platform
    private platformChildType: PlatformChildType

    constructor(scene: PlayScene, platformParent: Platform, platformChildType: PlatformChildType) {
        super(scene.matter.world, 0, 0, SpriteKey.SQUARE)
        this.scene.add.existing(this)

        this.platformParent = platformParent
        this.platformChildType = platformChildType
        switch (platformChildType)
        {
            case PlatformChildType.LEFT:
            case PlatformChildType.RIGHT:
                this.type = GameObjectType.PLATFORM_SIDE
                break
            case PlatformChildType.MIDDLE:
                this.type = GameObjectType.PLATFORM_MIDDLE
                break

        }

        this.setPosition(-10000, 0)
    }

    public setup(xPosition: number, yPosition: number, width: number): void {
        this.setTint(Constants.PLATFORM_TINT)

        switch (this.platformChildType)
        {
            case PlatformChildType.LEFT:
                this.setDisplaySize(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS)
                this.setRectangle(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS, {isStatic: true})
                this.setPosition(xPosition - width * (0.5 - (1 - Constants.PLATFORM_MIDDLE_PERCENTAGE) / 4), yPosition)
                break
            case PlatformChildType.RIGHT:
                this.setDisplaySize(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS)
                this.setRectangle(width * (1 - (Constants.PLATFORM_MIDDLE_PERCENTAGE)) / 2, Constants.PLATFORM_THICKNESS, {isStatic: true})
                this.setPosition(xPosition + width * (0.5 - (1 - Constants.PLATFORM_MIDDLE_PERCENTAGE) / 4), yPosition)
                break
            case PlatformChildType.MIDDLE:
                this.setDisplaySize(width * (Constants.PLATFORM_MIDDLE_PERCENTAGE + 0.01), Constants.PLATFORM_THICKNESS)
                this.setRectangle(width * (Constants.PLATFORM_MIDDLE_PERCENTAGE + 0.01), Constants.PLATFORM_THICKNESS, {isStatic: true})
                this.setPosition(xPosition, yPosition)
                break
        }
    }

    public glow() {
        switch (this.platformChildType)
        {
            case PlatformChildType.LEFT:
            case PlatformChildType.RIGHT:
                this.setTint(0xff0000)
                break
            case PlatformChildType.MIDDLE:
                this.setTint(0x00ff00)
                break
        }
    }
}

enum PlatformChildType
{
    LEFT,
    RIGHT,
    MIDDLE,
}

export {PlatformComponent, PlatformChildType}