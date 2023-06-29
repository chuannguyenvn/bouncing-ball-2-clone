import PlayScene from "../../scenes/PlayScene"


class ScoreText extends Phaser.GameObjects.Text
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, scene.scale.width / 2, 100, '0', {font: '150px calibri', color: '#dddddd'})
        this.scene.add.existing(this)
        this.playScene = scene

        this.setScrollFactor(0)
        this.setOrigin(0.5, 0)

        this.playScene.scoreChanged.subscribe((score) => this.text = score.toString())
    }
}

export default ScoreText