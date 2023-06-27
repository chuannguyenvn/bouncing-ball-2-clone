import Platform from "./Platform"
import PlayScene from "../scenes/PlayScene"
import {ParamGameEvent} from "../utilities/Event"
import Constants from "../configs/Constants"

class PlatformSpawner
{
    public touchedPlatformIndex: ParamGameEvent<number> = new ParamGameEvent<number>()

    private platforms: Platform[] = []
    private currentPlatformIndex: number = 0
    private farthestPlatformXPosition: number = -200

    constructor(scene: PlayScene) {
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

        this.touchedPlatformIndex.subscribe((index) => {
            const moveUntilIndex = (index - 5 + Constants.PLATFORM_POOL_SIZE) % Constants.PLATFORM_POOL_SIZE
            while (this.currentPlatformIndex != moveUntilIndex)
            {
                this.placeNextPlatform()
            }
        })
    }

    public placeNextPlatform() {
        this.currentPlatformIndex = (this.currentPlatformIndex + 1) % Constants.PLATFORM_POOL_SIZE
        const platform = this.platforms[this.currentPlatformIndex]
        platform.setup(100, this.farthestPlatformXPosition + 200, 600)
        this.farthestPlatformXPosition += 200
    }
}

export default PlatformSpawner