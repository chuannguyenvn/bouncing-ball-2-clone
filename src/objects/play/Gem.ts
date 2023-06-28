import Phaser from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import PlayScene from "../../scenes/PlayScene"
import GameObjectType from "../../configs/GameObjectType"
import Platform from "./Platform"

class Gem extends Phaser.Physics.Matter.Image
{
    public platformParent: Platform
    private playScene: PlayScene

    constructor(scene: PlayScene, platformParent: Platform) {
        super(scene.matter.world, -100, -100, SpriteKey.GEM)
        this.scene.add.existing(this)
        this.playScene = scene

        this.platformParent = platformParent
        this.type = GameObjectType.GEM

        this.setDisplaySize(25, 25)
        this.setCircle(25)
        this.setStatic(true)
        this.setSensor(true)
    }
}

export default Gem