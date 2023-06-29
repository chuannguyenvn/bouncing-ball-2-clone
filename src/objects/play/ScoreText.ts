import PlayScene from "../../scenes/PlayScene"
import PlayState from "../../states/PlayState"


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
    }
}

export default ScoreText