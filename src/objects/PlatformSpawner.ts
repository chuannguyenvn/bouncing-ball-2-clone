import Platform from "./Platform"
import PlayScene from "../scenes/PlayScene"
import {ParamGameEvent} from "../utilities/Event"
import Constants from "../configs/Constants"

class PlatformSpawner
{
    public touchedPlatformIndex: ParamGameEvent<number> = new ParamGameEvent<number>()

    private playScene: PlayScene

    private platforms: Platform[] = []
    private currentPlatformIndex: number = 0
    private farthestPlatformXPosition: number = -1
    private currentWidth: number = 65
    private currentHeight: number = 600

    constructor(scene: PlayScene) {
        this.playScene = scene

        for (let i = 0; i < Constants.PLATFORM_POOL_SIZE; i++)
        {
            const platform = new Platform(scene)
            platform.setup(1, -10000, 0)
            platform.index = i
            this.platforms.push(platform)
        }

        this.placeNextPlatform()
        this.placeNextPlatform()
        this.placeNextPlatform()
        this.placeNextPlatform()
        this.placeNextPlatform()

        this.touchedPlatformIndex.subscribe((index) => {
            const moveUntilIndex = (index - 5 + Constants.PLATFORM_POOL_SIZE) % Constants.PLATFORM_POOL_SIZE
            while (this.currentPlatformIndex != moveUntilIndex)
            {
                this.placeNextPlatform()
            }

            this.currentWidth = Math.max(this.currentWidth - 5, 20)
        })

        this.easePlatformHeight()
    }

    public placeNextPlatform() {
        this.currentPlatformIndex = (this.currentPlatformIndex + 1) % Constants.PLATFORM_POOL_SIZE
        const platform = this.platforms[this.currentPlatformIndex]
        let xPosition = this.farthestPlatformXPosition + 200 + (Math.random() * 2 - 1) * 25
        if (this.farthestPlatformXPosition === -1) xPosition = 0
        platform.setup(xPosition, this.currentHeight, this.currentWidth)
        this.farthestPlatformXPosition = xPosition
    }

    private easePlatformHeight(): void {
        this.playScene.tweens.addCounter({
            from: this.currentHeight,
            to: Math.random() * 200 + 400,
            ease: 'Sine.inout',
            duration: (Math.random() * 5 + 10) * 500,
            onUpdate: (tween) => {
                this.currentHeight = tween.getValue()
            },
            onComplete: () => this.easePlatformHeight(),
        })
    }
}

export default PlatformSpawner