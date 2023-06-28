import PlayScene from "../../scenes/PlayScene"


class ScoreText extends Phaser.GameObjects.Text
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, scene.scale.width / 2, 100, '0', {font: '100px open sans', color: 'red'})
        this.scene.add.existing(this)
        this.playScene = scene

        this.setScrollFactor(0)
        this.setOrigin(0.5)

        this.playScene.scoreChanged.subscribe((score) => this.text = score.toString())
    }
}

export default ScoreText