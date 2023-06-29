import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"
import Ball from "../objects/play/Ball"
import StateMachine from "../utilities/StateMachine"
import PlayState from "../states/PlayState"
import PlatformSpawner from "../objects/play/PlatformSpawner"
import ScoreText from "../objects/play/ScoreText"
import {ParamGameEvent} from "../utilities/Event"
import Constants from "../configs/Constants"
import VisitShopButton from "../objects/play/VisitShopButton"
import {GameManager, GameState} from "../managers/GameManager"
import Background from "../objects/play/Background"
import RestartButton from "../objects/play/RestartButton"
import POINTER_DOWN = Phaser.Input.Events.POINTER_DOWN
import Vector2 = Phaser.Math.Vector2
import POINTER_UP = Phaser.Input.Events.POINTER_UP
import HighScoreText from "../objects/play/HighScoreText"

class PlayScene extends Phaser.Scene
{
    public stateMachine: StateMachine<PlayState>
    public scoreChanged: ParamGameEvent<number>

    public currentScore: number = -2
    public collectedGems: number = 0

    public ball: Ball
    public platformSpawner: PlatformSpawner
    public background: Background
    public scoreText: ScoreText
    public highScoreText: HighScoreText
    public isWelcomingPlayer: boolean = true
    private visitShopButton: VisitShopButton
    private restartButton: RestartButton
    private startedPlaying: boolean = false

    constructor() {
        super({key: SceneKey.PLAY})

        GameManager.stateMachine
            .configure(GameState.PLAY)
            .onEntry(-1, () => {
                GameManager.sceneManager.start(SceneKey.PLAY)
            })

        GameManager.stateMachine
            .configure(GameState.PLAY)
            .onExit(-1, () => {
                GameManager.sceneManager.stop(this)
                this.isWelcomingPlayer = false
            })
    }

    create(): void {
        this.startedPlaying = false
        this.stateMachine = new StateMachine<PlayState>(PlayState.INIT)
        this.scoreChanged = new ParamGameEvent<number>()
        this.currentScore = -2
        this.collectedGems = 0

        this.ball = new Ball(this)

        this.platformSpawner = new PlatformSpawner(this)
        this.scoreText = new ScoreText(this)
        this.highScoreText = new HighScoreText(this)
        this.background = new Background(this)
        this.visitShopButton = new VisitShopButton(this)
        this.restartButton = new RestartButton(this)
        this.restartButton.setVisible(false)
        
        this.matter.world.setBounds(0, 0, 100000, this.scale.height, 64, false, false, false)

        this.cameras.main.scrollX = -1000

        if (this.isWelcomingPlayer)
        {
            this.cameras.main.startFollow(this.ball, false, 0.9, 0)
            this.isWelcomingPlayer = false
        }
        else
        {
            this.cameras.main.startFollow(this.ball, false, 0.9, 0)
        }
        this.cameras.main.setBounds(-1000, 0, 100000, 0)

        this.input.on(POINTER_UP, () => this.startPlay())

        const spaceBar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        spaceBar?.on(Phaser.Input.Keyboard.Events.DOWN, () => this.startPlay())
        this.stateMachine.configure(PlayState.INIT).onExit(-1, () => {
            this.visitShopButton.setVisible(false)
        })

        this.stateMachine.configure(PlayState.MOVING).onEntry(-1, () => {
            this.tweens.add({
                targets: this.cameras.main.followOffset,
                x: -100,
                duration: 400,
                ease: 'Sine.out',
            })
        })

        this.stateMachine.configure(PlayState.MOVING).onExit(-1, this.handleLoseEntry.bind(this))
        
        this.stateMachine.configure(PlayState.LOSE).onEntry(-1, () =>{
            this.restartButton.setVisible(true)
        })

        this.stateMachine.configure(PlayState.LOSE).onExit(-1, () =>{
            this.restartButton.setVisible(false)
        })

        this.handleGemsCollected()
        this.handleHighScore()
    }

    public addScore(amount: number): void {
        this.currentScore += amount
        this.cameras.main.shake(Constants.SCREENSHAKE_DURATION, new Vector2(0, Constants.SCREENSHAKE_STRENGTH))
        this.scoreChanged.invoke(this.currentScore)
    }

    public visitShop() {
        this.cameras.main.stopFollow()
        this.cameras.main.pan(-1000 + this.cameras.main.scrollX, this.scale.height / 2, 1000, Phaser.Math.Easing.Sine.InOut, false, (_, progress) => {
            if (progress === 1) GameManager.stateMachine.changeState(GameState.SHOP)
        })
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
        console.log("Highscore: " + localStorage.getItem(Constants.HIGH_SCORE_STORAGE_KEY))
    }

    private handleGemsCollected(): void {
        if (!localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY))
            localStorage.setItem(Constants.GEMS_COLLECTED_STORAGE_KEY, '0')
        const currentGems = parseInt(localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY) as string)
        localStorage.setItem(Constants.GEMS_COLLECTED_STORAGE_KEY, (currentGems + this.collectedGems).toString())
        console.log("Gems collected: " + localStorage.getItem(Constants.GEMS_COLLECTED_STORAGE_KEY))
    }

    private startPlay(): void {
        if (this.startedPlaying) return
        this.stateMachine.changeState(PlayState.MOVING)
        this.startedPlaying = true
    }
}

export default PlayScene