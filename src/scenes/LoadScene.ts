import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"
import PreloadHelper from "../utilities/PreloadHelper"
import SpriteKey from "../configs/SpriteKey"
import Constants from "../configs/Constants"
import GameManager from "../managers/GameManager"
import AudioKey from "../configs/AudioKey"
import GameState from "../states/GameState"
import FileLookUp from "../configs/FileLookUp"


class LoadScene extends Scene
{
    private progressBar: Phaser.GameObjects.Graphics
    private ballImage: Phaser.GameObjects.Image
    private title: Phaser.GameObjects.Text

    constructor() {
        super({key: SceneKey.LOAD})

        GameManager.stateMachine
            .configure(GameState.LOADING)
            .onEntry(-1, () => GameManager.sceneManager.start(SceneKey.LOAD))
    }

    preload(): void {
        this.title = this.add.text(this.scale.width / 2, 200, "Bouncing Ball 2")
        this.title.setFont('65px calibri')
        this.title.setColor('#555555')
        this.title.setOrigin(0.5)
        
        this.loadAssets()
        this.showLoadingProgress()
    }

    create(): void {
        this.exitLoading()
    }

    public exitLoading(): void {
        this.tweens.add({
            targets: this.ballImage,
            y: Constants.BALL_START_POSITION.y,
            displayHeight: Constants.BALL_RADIUS * 2,
            displayWidth: Constants.BALL_RADIUS * 2,
            duration: 500,
            ease: 'Sine.inout',
            onComplete: () => {
                GameManager.stateMachine.changeState(GameState.PLAY)
                this.ballImage.destroy()
            }
        })

        this.tweens.add({
            targets: this.progressBar,
            alpha: 0,
            duration: 200,
            ease: 'Sine.inout',
            onComplete: () => {
                this.progressBar.destroy()
            }
        })
        
        this.tweens.add({
            targets: this.title,
            y:-100,
            duration: 200,
            ease: Phaser.Math.Easing.Back.In
        })
    }

    private loadAssets(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.SQUARE)
        PreloadHelper.preloadSprite(this, SpriteKey.CIRCLE)
        PreloadHelper.preloadSprite(this, SpriteKey.GRADIENT)
        PreloadHelper.preloadSprite(this, SpriteKey.GEM)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_HAPPY)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_CHIP)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_LEMON)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_YINGYANG)
        PreloadHelper.preloadSprite(this, SpriteKey.BUTTON_IDLE)
        PreloadHelper.preloadSprite(this, SpriteKey.BUTTON_CLICKED)

        PreloadHelper.preloadSound(this, AudioKey.JUMP_1)
        PreloadHelper.preloadSound(this, AudioKey.JUMP_2)
        PreloadHelper.preloadSound(this, AudioKey.JUMP_3)
        PreloadHelper.preloadSound(this, AudioKey.GEM)
        PreloadHelper.preloadSound(this, AudioKey.MASTERPIECE)
        
        this.load.tilemapTiledJSON('masterpiece-map', FileLookUp['masterpiece-map'])

        for (let i = 0; i < 50; i++) this.load.image("logo" + i, FileLookUp[SpriteKey.GEM])
    }

    private showLoadingProgress(): void {
        this.progressBar = this.add.graphics()

        this.ballImage = this.add.image(this.scale.width / 2, this.scale.height / 2, SpriteKey.BALL_DEFAULT)
        this.ballImage.scale = 0.25

        this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => {
            this.progressBar.clear()
            this.progressBar.fillStyle(0x333333, 1)
            this.progressBar.fillRect(this.scale.width / 2 - 30, this.scale.height / 2 + 60, 60 * value, 5)
            this.ballImage.setRotation(value * Phaser.Math.PI2 * 2)
        })
    }
}

export default LoadScene