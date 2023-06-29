import SceneKey from "../configs/SceneKey"
import ShopItem from "../objects/shop/ShopItem"
import SpriteKey from "../configs/SpriteKey"
import {GameManager, GameState} from "../managers/GameManager"
import ChooseBallZone from "../objects/shop/ChooseBallZone"
import Phaser from "phaser"
import {BodyType} from "matter"
import GameObjectType from "../configs/GameObjectType"
import CollisionStartEvent = Phaser.Physics.Matter.Events.CollisionStartEvent
import shopItem from "../objects/shop/ShopItem"
import Text = Phaser.GameObjects.Text
import Constants from "../configs/Constants"

class ShopScene extends Phaser.Scene
{
    private shopItems: ShopItem[] = []
    private gemCountText: Text
    
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

        this.shopItems = []
        
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_DEFAULT, 10))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_HAPPY, 10))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_CHIP, 10))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_LEMON, 10))
        this.shopItems.push(new ShopItem(this, SpriteKey.BALL_YINGYANG, 10))

        Phaser.Actions.GridAlign(this.shopItems, {
            width: -1,
            height: 0,
            cellWidth: 75,
            cellHeight: 75,
            x: -50,
            y: 100,
        })
        
        this.shopItems.forEach(shopItem => shopItem.alignText())
        
        this.matter.add.mouseSpring()

        this.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (event: CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
                if (bodyA.gameObject && bodyB.gameObject && ((
                    bodyA.gameObject.type === GameObjectType.SHOP_BALL &&
                    bodyB.gameObject.type === GameObjectType.SHOP_CEILING) || (
                    bodyA.gameObject.type === GameObjectType.SHOP_CEILING &&
                    bodyB.gameObject.type === GameObjectType.SHOP_BALL)))
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
        
        this.gemCountText = this.add.text(100, 100, localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string)
        this.gemCountText.setColor('#222222')
    }
    
    public updateGemCount(value: number)
    {
        this.gemCountText.text = value.toString()
    }
}

export default ShopScene