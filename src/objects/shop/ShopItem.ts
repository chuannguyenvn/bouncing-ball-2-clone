import Phaser from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import ShopScene from "../../scenes/ShopScene"

class ShopItem extends Phaser.Physics.Matter.Image
{
    public readonly price: number
    private shopScene: ShopScene
    private spriteKey: SpriteKey
    private isPurchased: boolean

    constructor(scene: ShopScene, spriteKey: SpriteKey, price: number) {
        super(scene.matter.world, 0, 0, spriteKey)
        this.shopScene = scene
        this.shopScene.add.existing(this)
        this.spriteKey = spriteKey

        if (!localStorage.getItem(this.spriteKey)) localStorage.setItem(this.spriteKey, 'no')
        this.isPurchased = localStorage.getItem(this.spriteKey) as string === 'yes'

        this.price = price

        this.setStatic(!this.isPurchased)
    }

    public purchase(): void {
        this.isPurchased = true
        this.setStatic(false)
        localStorage.setItem(this.spriteKey, 'yes')
    }
}

export default ShopItem