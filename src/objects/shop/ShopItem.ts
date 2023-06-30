import Phaser from "phaser"
import SpriteKey from "../../configs/SpriteKey"
import ShopScene from "../../scenes/ShopScene"
import Constants from "../../configs/Constants"
import GameObjectType from "../../configs/GameObjectType"
import GAMEOBJECT_POINTER_UP = Phaser.Input.Events.GAMEOBJECT_POINTER_UP
import Text = Phaser.GameObjects.Text

class ShopItem extends Phaser.Physics.Matter.Sprite
{
    public readonly price: number
    public spriteKey: SpriteKey
    private shopScene: ShopScene
    private isPurchased: boolean = false

    private priceText: Text

    constructor(scene: ShopScene, spriteKey: SpriteKey, price: number) {
        super(scene.matter.world, 100, 200, spriteKey)
        this.shopScene = scene
        this.shopScene.add.existing(this)
        this.spriteKey = spriteKey

        this.type = GameObjectType.SHOP_BALL

        if (!localStorage.getItem(this.spriteKey)) localStorage.setItem(this.spriteKey, 'no')
        this.isPurchased = localStorage.getItem(this.spriteKey) as string === 'yes'

        this.price = price
        if (price < 0) this.isPurchased = true

        this.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)
        this.setCircle(Constants.BALL_RADIUS)
        this.setStatic(!this.isPurchased)

        if (this.isPurchased)
        {
            this.releaseBall()
        }
        else
        {
            this.priceText = this.shopScene.add.text(this.x, this.y + 50, this.price.toString())
            this.priceText.setColor('222222')
            this.priceText.setOrigin(0.5)
        }

        this.setInteractive()
        this.on(GAMEOBJECT_POINTER_UP, () => {
            if (!this.isPurchased && parseInt(localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string) >= this.price) this.purchase()
        })
    }

    public purchase(): void {
        this.isPurchased = true
        localStorage.setItem(this.spriteKey, 'yes')

        this.releaseBall()

        if (this.priceText) this.priceText.destroy()

        const oldGemCount = parseInt(localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string)
        const newGemCount = oldGemCount - this.price
        localStorage.setItem(Constants.GEMS_COLLECTED_STORAGE_KEY, newGemCount.toString())

        this.shopScene.updateGemCount(newGemCount)
    }

    public alignText(): void {
        if (this.isPurchased) return
        this.priceText.setPosition(this.x, this.y + 50)
    }

    private releaseBall(): void {
        this.setStatic(false)
        this.setVelocity(Phaser.Math.Between(-1, 1), Phaser.Math.Between(-3, -5))
        this.setAngularVelocity(Phaser.Math.Between(-0.5, 0.5))
    }
}

export default ShopItem