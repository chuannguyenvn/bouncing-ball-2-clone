﻿import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"
import SpriteKey from "../configs/SpriteKey"
import Ball from "../objects/play/Ball"
import PreloadHelper from "../utilities/PreloadHelper"
import StateMachine from "../utilities/StateMachine"
import PlayState from "../states/PlayState"
import PlatformSpawner from "../objects/play/PlatformSpawner"
import ScoreText from "../objects/play/ScoreText"
import {ParamGameEvent} from "../utilities/Event"
import Button from "../objects/welcome/Button"

class PlayScene extends Phaser.Scene
{
    public stateMachine: StateMachine<PlayState> = new StateMachine<PlayState>(PlayState.INIT)
    public scoreChanged: ParamGameEvent<number> = new ParamGameEvent<number>()

    public currentScore: number = 0

    public ball: Ball
    public platformSpawner: PlatformSpawner
    public scoreText: ScoreText

    constructor() {
        super({
            key: SceneKey.PLAY
        })
    }

    preload(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.SQUARE)
        PreloadHelper.preloadSprite(this, SpriteKey.GRADIENT)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
        PreloadHelper.preloadSprite(this, SpriteKey.BUTTON_BLUE_IDLE)
        PreloadHelper.preloadSprite(this, SpriteKey.BUTTON_BLUE_CLICKED)
    }

    create(): void {
        this.ball = new Ball(this)
        this.platformSpawner = new PlatformSpawner(this)
        this.scoreText = new ScoreText(this)
        this.matter.world.setBounds(0, 0, 100000, this.scale.height, 64, false, false, false)
        this.cameras.main.startFollow(this.ball, false, 0.9, 0)
        this.cameras.main.setBounds(-1000, 0, 100000, 0)
        this.tweens.add({
            targets: this.cameras.main.followOffset,
            x: -100,
            duration: 1000,
            ease: 'quart.out',
        })

        this.stateMachine.configure(PlayState.LOSE).onEntry(-1, this.handleLoseEntry.bind(this))

        new Button<PlayScene>(this, SpriteKey.BUTTON_BLUE_IDLE, SpriteKey.BUTTON_BLUE_IDLE, SpriteKey.BUTTON_BLUE_CLICKED).setPosition(100, 100)
    }

    private handleLoseEntry(): void {
        this.cameras.main.stopFollow()
        console.log("Lose")
    }

    public addScore(amount: number): void {
        this.currentScore += amount
        this.scoreChanged.invoke(this.currentScore)
    }
}

export default PlayScene