import PlayScene from "../../scenes/PlayScene"
import PlayState from "../../states/PlayState"
import Phaser from "phaser"
import Constants from "../../configs/Constants"
import Color = Phaser.Display.Color


class HighScoreText extends Phaser.GameObjects.Text
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, scene.scale.width / 2, 250, '0', {font: '100px calibri', color: '#eeeeee'})
        this.scene.add.existing(this)
        this.playScene = scene

        this.setOrigin(0.5, 0)
        this.setDepth(-1)
        this.setVisible(false)

        this.setScrollFactor(1)

        this.playScene.stateMachine.configure(PlayState.LOSE).onEntry(-1, () => {
            this.setVisible(true)
            this.setX(this.scene.cameras.main.scrollX + this.scene.scale.width / 2)
            this.text = localStorage.getItem(Constants.HIGH_SCORE_STORAGE_KEY) as string

            this.playScene.tweens.addCounter({
                from: 0,
                to: 100,
                duration: 300,
                ease: Phaser.Math.Easing.Sine.Out,
                onUpdate: tween => {
                    const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                        Color.IntegerToColor(0xffffff),
                        Color.IntegerToColor(0x444444),
                        100,
                        tween.getValue())

                    this.setColor(Color.ObjectToColor(colorObject).rgba)
                }
            })
        })
    }
}

export default HighScoreText
