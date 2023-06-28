import SceneKey from "../configs/SceneKey"
import ShopItem from "../objects/shop/ShopItem"
import SpriteKey from "../configs/SpriteKey"

class ShopScene extends Phaser.Scene
{
    private shopItems: ShopItem[] = []

    constructor() {
        super({
            key: SceneKey.SHOP
        })
    }

    preload(): void {

    }

    create(): void {
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_RED, 10))
    }
}

export default ShopScene