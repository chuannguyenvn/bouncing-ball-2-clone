import SceneKey from "../configs/SceneKey"
import ShopItem from "../objects/shop/ShopItem"
import SpriteKey from "../configs/SpriteKey"
import {GameManager, GameState} from "../managers/GameManager"
import ChooseBallZone from "../objects/shop/ChooseBallZone"
import Phaser from "phaser"
import {BodyType} from "matter"
import GameObjectType from "../configs/GameObjectType"
import Constants from "../configs/Constants"
import Gem from "../objects/play/Gem"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent
import Text = Phaser.GameObjects.Text
import Image = Phaser.GameObjects.Image

class ShopScene extends Phaser.Scene
{
    private shopItems: ShopItem[] = []
    private gemCountText: Text
    private gems: Gem[] = []

    constructor() {
        super({key: SceneKey.SHOP})

        GameManager.stateMachine
            .configure(GameState.SHOP)
            .onEntry(-1, () => GameManager.sceneManager.start(SceneKey.SHOP))

        GameManager.stateMachine
            .configure(GameState.SHOP)
            .onExit(-1, () => GameManager.sceneManager.stop(this))
    }

    create(): void {
        this.matter.world.setBounds(0, 0, this.scale.width, this.scale.height, 64, true, true, false, true)

        new ChooseBallZone(this)

        this.shopItems = []

        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_DEFAULT, -1))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_HAPPY, 3))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_CHIP, 3))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_LEMON, 3))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_YINGYANG, 3))

        Phaser.Actions.GridAlign(this.shopItems, {
            width: -1,
            height: 0,
            cellWidth: 75,
            cellHeight: 75,
            x: -50,
            y: 300,
        })

        this.shopItems.forEach(shopItem => shopItem.alignText())

        this.matter.add.mouseSpring()

        this.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (event: CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
                if (bodyA.gameObject && bodyB.gameObject && ((
                    bodyA.gameObject.type === GameObjectType.SHOP_CEILING &&
                    (bodyB.gameObject.type === GameObjectType.SHOP_BALL || bodyB.gameObject.type === GameObjectType.GEM)) || (
                    bodyA.gameObject.type === GameObjectType.SHOP_CEILING &&
                    (bodyB.gameObject.type === GameObjectType.SHOP_BALL || bodyB.gameObject.type === GameObjectType.GEM))))
                {
                    if (bodyA.gameObject.type === GameObjectType.SHOP_BALL)
                    {
                        GameManager.currentSkin = (bodyA.gameObject as ShopItem).spriteKey
                    }
                    else
                    {
                        GameManager.currentSkin = (bodyB.gameObject as ShopItem).spriteKey
                    }

                    this.cameras.main.pan(1000 + this.cameras.main.scrollX, this.scale.height / 2, 1000, Phaser.Math.Easing.Sine.InOut, false, (_, progress) => {
                        if (progress === 1) GameManager.stateMachine.changeState(GameState.PLAY)
                    })
                }
            })

        this.gemCountText = this.add.text(this.scale.width / 2, this.scale.height / 2, localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string)
        this.gemCountText.setColor('#eeeeee')
        this.gemCountText.setFont('100px calibri')
        this.gemCountText.setOrigin(0.5)
        this.gemCountText.setDepth(-100)

        const bridge: Image[] = []

        const group = this.matter.world.nextGroup(true)

        let x = 0
        let prev = this.matter.add.image(x, 600, SpriteKey.BALL_DEFAULT, undefined, {
            shape: 'circle',
            mass: 0.1,
            circleRadius: 2
        })
        prev.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)
        bridge.push(prev
        )
        for (var i = 0; i < 15; i++)
        {
            var ball = this.matter.add.image(x, 50, SpriteKey.BALL_DEFAULT, undefined, {
                shape: 'circle',
                mass: 0.1,
                circleRadius: 2,
                collisionFilter: {group: group}
            })
            bridge.push(ball)
            this.matter.add.joint(prev.body as BodyType, ball.body as BodyType, 25, 0.8)
            prev = ball
            prev.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)

            x += 30
        }
        prev.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)

        this.matter.add.worldConstraint(bridge[0].body as BodyType, 2, 0.9, {
            pointA: {x: 0, y: 50},
            pointB: {x: -25, y: 0}
        })

        this.matter.add.worldConstraint(bridge[bridge.length - 1].body as BodyType, 2, 0.9, {
            pointA: {x: this.scale.width, y: 50},
            pointB: {x: 25, y: 0}
        })

        const initialGemCount = parseInt(localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string)
        for (let i = 0; i < initialGemCount; i++)
        {
            const gem = new Gem(this, undefined, false)
            gem.setPosition(Phaser.Math.Between(0, this.scale.width), 0)
            this.gems.push(gem)
        }
        this.gemCountText.text = initialGemCount.toString()
    }

    public updateGemCount(value: number) {
        if (this.gemCountText) this.gemCountText.text = value.toString()
        for (let i = this.gems.length - 1; i >= value; i--)
        {
            const gem = this.gems.pop() as Gem
            gem.destroy()
        }
    }
}

export default ShopScene