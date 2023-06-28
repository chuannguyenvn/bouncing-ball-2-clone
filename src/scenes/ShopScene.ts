import SceneKey from "../configs/SceneKey"
import ShopItem from "../objects/shop/ShopItem"
import SpriteKey from "../configs/SpriteKey"
import {GameManager, GameState} from "../managers/GameManager"

class ShopScene extends Phaser.Scene
{
    private shopItems: ShopItem[] = []

    constructor() {
        super({key: SceneKey.SHOP})

        GameManager.stateMachine
            .configure(GameState.SHOP)
            .onEntry(-1, () => GameManager.sceneManager.start(SceneKey.SHOP))

        GameManager.stateMachine
            .configure(GameState.SHOP)
            .onExit(-1, () => GameManager.sceneManager.stop(this))
    }

    preload(): void {

    }

    create(): void {
        this.matter.world.setBounds()
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_DEFAULT, 10))
    }
}

export default ShopScene