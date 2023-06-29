import Phaser from "phaser"
import PlayScene from "../../scenes/PlayScene"
import Color = Phaser.Display.Color

class Background extends Phaser.GameObjects.Rectangle
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, -100, -100, scene.scale.width + 200, scene.scale.height + 200, 0xffffff)
        this.scene.add.existing(this)
        this.playScene = scene

        this.setOrigin(0)
        this.setScrollFactor(0)
        this.setDepth(-100)
    }

    public flashColor(value: number): void {
        this.playScene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 200,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: tween => {
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    Color.IntegerToColor(value),
                    Color.IntegerToColor(0xffffff),
                    100,
                    tween.getValue())

                this.setFillStyle(Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b))
            }
        })
    }
}

export default Background