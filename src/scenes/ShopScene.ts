import SceneKey from "../configs/SceneKey"
import ShopItem from "../objects/shop/ShopItem"
import SpriteKey from "../configs/SpriteKey"
import {GameManager, GameState} from "../managers/GameManager"
import ChooseBallZone from "../objects/shop/ChooseBallZone"
import Phaser from "phaser"
import {BodyType} from "matter"
import GameObjectType from "../configs/GameObjectType"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent

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
        this.matter.world.setBounds(0, 0, this.scale.width, this.scale.height, 64, true, true, false, true)

        new ChooseBallZone(this)

        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_RED, 10))

        this.matter.add.mouseSpring()

        this.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (event: CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
                console.log(bodyA)
                console.log(bodyB)
                if (bodyA.gameObject && bodyB.gameObject && ((
                    bodyA.gameObject.type === GameObjectType.SHOP_BALL &&
                    bodyB.gameObject.type === GameObjectType.SHOP_CEILING) || (
                    bodyA.gameObject.type === GameObjectType.SHOP_CEILING &&
                    bodyB.gameObject.type === GameObjectType.SHOP_BALL)))
                {
                    this.cameras.main.pan(1000 + this.cameras.main.scrollX, this.scale.height / 2, 1000, Phaser.Math.Easing.Sine.InOut, false, (_, progress) => {
                        if (progress === 1) GameManager.stateMachine.changeState(GameState.PLAY)
                    })
                }
            })
    }
}

export default ShopScene