﻿import SceneKey from "../configs/SceneKey"
import ShopItem from "../objects/shop/ShopItem"
import SpriteKey from "../configs/SpriteKey"
import GameManager from "../managers/GameManager"
import ChooseBallZone from "../objects/shop/ChooseBallZone"
import Phaser from "phaser"
import {BodyType} from "matter"
import GameObjectType from "../configs/GameObjectType"
import Constants from "../configs/Constants"
import Gem from "../objects/play/Gem"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent
import Text = Phaser.GameObjects.Text
import Image = Phaser.GameObjects.Image
import GameState from "../states/GameState"

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
        this.gems = []

        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_HAPPY, 3))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_CHIP, 3))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_LEMON, 3))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_YINGYANG, 3))

        Phaser.Actions.GridAlign(this.shopItems, {
            width: 2,
            height: 2,
            cellWidth: 300,
            cellHeight: 150,
            x: -50,
            y: 175,
        })

        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_DEFAULT, -1))

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
                    if (bodyA.gameObject.type === GameObjectType.SHOP_CEILING)
                    {
                        if (bodyB.gameObject instanceof ShopItem)
                            GameManager.currentSkin = (bodyB.gameObject as ShopItem).spriteKey
                        else
                            GameManager.currentSkin = SpriteKey.GEM
                    }
                    else
                    {
                        if (bodyA.gameObject instanceof ShopItem)
                            GameManager.currentSkin = (bodyA.gameObject as ShopItem).spriteKey
                        else
                            GameManager.currentSkin = SpriteKey.GEM
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
        let prev = this.matter.add.image(x, 600, SpriteKey.CIRCLE, undefined, {
            shape: 'circle',
            mass: 0.1,
            circleRadius: 1
        })
        prev.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)
        prev.setTint(0xaaaaaa)
        bridge.push(prev)
        prev.setAngularSpeed(Phaser.Math.Between(-0.1, 0.1))
        for (let i = 0; i < 10; i++)
        {
            const ball = this.matter.add.image(x, 50, SpriteKey.CIRCLE, undefined, {
                shape: 'circle',
                mass: 0.1,
                circleRadius: 1,
                collisionFilter: {group: group}
            })
            bridge.push(ball)
            this.matter.add.joint(prev.body as BodyType, ball.body as BodyType, 35, 0.8)
            prev = ball
            prev.setDisplaySize(Constants.BALL_RADIUS * 2, Constants.BALL_RADIUS * 2)
            prev.setAngularSpeed(Phaser.Math.Between(-0.1, 0.1))
            prev.setTint(0xaaaaaa)

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

        this.updateGemCount(parseInt(localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string))
    }

    public updateGemCount(value: number) {
        if (!isNaN(value)) this.gemCountText.text = value.toString()
        else
        {
            this.gemCountText.text = '0'
            return
        }

        for (let i = this.gems.length - 1; i >= value; i--)
        {
            const gem = this.gems.pop() as Gem
            gem.destroy()
        }
    }
}

export default ShopScene