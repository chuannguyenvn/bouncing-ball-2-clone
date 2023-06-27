import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"
import SpriteKey from "../configs/SpriteKey"
import Ball from "../objects/play/Ball"
import PreloadHelper from "../utilities/PreloadHelper"
import StateMachine from "../utilities/StateMachine"
import PlayState from "../states/PlayState"
import PlatformSpawner from "../objects/play/PlatformSpawner"
import ScoreText from "../objects/play/ScoreText"
import {ParamGameEvent} from "../utilities/Event"
import Constants from "../configs/Constants"
import POINTER_DOWN = Phaser.Input.Events.POINTER_DOWN
import Vector2 = Phaser.Math.Vector2

class PlayScene extends Phaser.Scene
{
    public stateMachine: StateMachine<PlayState> = new StateMachine<PlayState>(PlayState.INIT)
    public scoreChanged: ParamGameEvent<number> = new ParamGameEvent<number>()

    public currentScore: number = -2
    public collectedGems: number = 0

    public ball: Ball
    public platformSpawner: PlatformSpawner
    public scoreText: ScoreText

    private startedPlaying: boolean = false

    constructor() {
        super({
            key: SceneKey.PLAY
        })
    }

    preload(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.SQUARE)
        PreloadHelper.preloadSprite(this, SpriteKey.GRADIENT)
        PreloadHelper.preloadSprite(this, SpriteKey.GEM)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
        PreloadHelper.preloadSprite(this, SpriteKey.BUTTON_BLUE_IDLE)
        PreloadHelper.preloadSprite(this, SpriteKey.BUTTON_BLUE_CLICKED)
    }

    create(): void {
        this.ball = new Ball(this)
        this.ball.y = 300

        this.platformSpawner = new PlatformSpawner(this)
        this.scoreText = new ScoreText(this)
        this.matter.world.setBounds(0, 0, 100000, this.scale.height, 64, false, false, false)
        this.cameras.main.startFollow(this.ball, false, 0.9, 0)
        this.cameras.main.setBounds(-1000, 0, 100000, 0)

        this.stateMachine.configure(PlayState.LOSE).onEntry(-1, this.handleLoseEntry.bind(this))

        this.input.on(POINTER_DOWN, () => this.startPlay())

        const spaceBar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        spaceBar?.on(Phaser.Input.Keyboard.Events.DOWN, () => this.startPlay())

        this.stateMachine.configure(PlayState.MOVING).onEntry(-1, () => this.tweens.add({
            targets: this.cameras.main.followOffset,
            x: -100,
            duration: 400,
            ease: 'Sine.out',
        }))
    }

    public addScore(amount: number): void {
        this.currentScore += amount
        this.cameras.main.shake(Constants.SCREENSHAKE_DURATION, new Vector2(0, Constants.SCREENSHAKE_STRENGTH))
        this.scoreChanged.invoke(this.currentScore)
    }

    private handleLoseEntry(): void {
        this.cameras.main.stopFollow()

        this.handleHighScore()
        this.handleGemsCollected()

        console.log("Lose")
    }

    private handleHighScore(): void {
        if (!localStorage.getItem(Constants.HIGH_SCORE_STORAGE_KEY))
            localStorage.setItem(Constants.HIGH_SCORE_STORAGE_KEY, '0')
        const highScore = parseInt(localStorage.getItem(Constants.HIGH_SCORE_STORAGE_KEY) as string)
        if (this.currentScore > highScore)
            localStorage.setItem(Constants.HIGH_SCORE_STORAGE_KEY, this.currentScore.toString())
    }

    private handleGemsCollected(): void {
        if (!localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY))
            localStorage.setItem(Constants.GEMS_COLLECTED_STORAGE_KEY, '0')
        const currentGems = parseInt(localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string)
        localStorage.setItem(Constants.GEMS_COLLECTED_STORAGE_KEY, (currentGems + this.collectedGems).toString())
    }

    private startPlay(): void {
        if (this.startedPlaying) return
        this.stateMachine.changeState(PlayState.MOVING)
        this.startedPlaying = true
    }
}

export default PlayScene