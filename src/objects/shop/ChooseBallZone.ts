import Phaser from "phaser"
import ShopScene from "../../scenes/ShopScene"
import GameObjectType from "../../configs/GameObjectType"

class ChooseBallZone extends Phaser.Physics.Matter.Image
{
    private shopScene: ShopScene

    constructor(scene: ShopScene) {
        super(scene.matter.world, scene.scale.width / 2, -100, '')
        this.shopScene = scene
        this.shopScene.add.existing(this)

        this.type = GameObjectType.SHOP_CEILING

        this.setRectangle(this.shopScene.scale.width, 100)
        this.setSensor(true)
        this.setStatic(true)
    }

}

export default ChooseBallZone