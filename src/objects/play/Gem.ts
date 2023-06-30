import Phaser, {Scene} from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import GameObjectType from "../../configs/GameObjectType"
import Platform from "./Platform"

class Gem extends Phaser.Physics.Matter.Image
{
    public platformParent: Platform

    constructor(scene: Scene, platformParent?: Platform, immovable: boolean = true) {
        super(scene.matter.world, -100, -100, SpriteKey.GEM)
        this.scene.add.existing(this)

        this.platformParent = platformParent as Platform
        this.type = GameObjectType.GEM

        this.setDisplaySize(25, 25)
        this.setCircle(10)
        this.setStatic(immovable)
        this.setSensor(immovable)
    }
}

export default Gem