import Phaser from "phaser"
import SceneKey from "../configs/SceneKey"
import SpriteKey from "../configs/SpriteKey"
import Ball from "../objects/Ball"
import PreloadHelper from "../utilities/PreloadHelper"
import IUpdatable from "../interfaces/IUpdatable"
import StateMachine from "../utilities/StateMachine"
import PlayState from "../states/PlayState"
import PlatformSpawner from "../objects/PlatformSpawner"

class PlayScene extends Phaser.Scene
{
    public stateMachine: StateMachine<PlayState> = new StateMachine<PlayState>(PlayState.INIT)

    private updatables: IUpdatable[] = []
    public ball: Ball
    public platformSpawner: PlatformSpawner

    constructor() {
        super({
            key: SceneKey.PLAY
        })
    }

    preload(): void {
        PreloadHelper.preloadSprite(this, SpriteKey.SQUARE)
        PreloadHelper.preloadSprite(this, SpriteKey.GRADIENT)
        PreloadHelper.preloadSprite(this, SpriteKey.BALL_DEFAULT)
    }

    create(): void {
        this.ball = new Ball(this)
        this.platformSpawner = new PlatformSpawner(this)
        this.cameras.main.startFollow(this.ball, false, 1, 0)
        this.cameras.main.setBounds(-1000, 0, 100000, 0)
        this.tweens.add({
            targets: this.cameras.main.followOffset,
            x: -100,
            duration: 1000,
            ease: 'quart.out',
        })

        this.stateMachine.configure(PlayState.LOSE).onEntry(-1, this.handleLoseEntry.bind(this))
    }

    update(time: number, delta: number) {
        this.updatables.forEach(updatable => updatable.update(time, delta))
    }

    public registerUpdatable(updatable: IUpdatable) {
        this.updatables.push(updatable)
    }

    private handleLoseEntry(): void {
        this.cameras.main.stopFollow()
        console.log("Lose")
    }
}

export default PlayScene