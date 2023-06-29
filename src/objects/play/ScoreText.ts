﻿import PlayScene from "../../scenes/PlayScene"
import PlayState from "../../states/PlayState"
import Phaser from "phaser"
import Color = Phaser.Display.Color


class ScoreText extends Phaser.GameObjects.Text
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, 0, 100, '0', {font: '150px calibri', color: '#eeeeee'})
        this.scene.add.existing(this)
        this.playScene = scene

        this.setOrigin(0.5, 0)
        this.setDepth(-1)

        this.playScene.scoreChanged.subscribe((score) => this.text = score.toString())

        this.playScene.stateMachine.configure(PlayState.MOVING).onEntry(-1, () => {
            this.setX(this.scene.scale.width / 2)
            this.setScrollFactor(0)
        })
        this.playScene.stateMachine.configure(PlayState.MOVING).onExit(-1, () => {
            this.setScrollFactor(1)
            this.setX(this.scene.cameras.main.scrollX + this.scene.scale.width / 2)
        })
        this.playScene.stateMachine.configure(PlayState.LOSE).onEntry(-1, () => {
            this.playScene.tweens.addCounter({
                from: 0,
                to: 100,
                duration: 300,
                ease: Phaser.Math.Easing.Sine.Out,
                onUpdate: tween => {
                    const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                        Color.IntegerToColor(0xeeeeee),
                        Color.IntegerToColor(0x444444),
                        100,
                        tween.getValue())

                    this.setColor(Color.ObjectToColor(colorObject).rgba)
                }
            })
        })
    }
}

export default ScoreText