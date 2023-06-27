﻿import Platform from "./Platform"
import PlayScene from "../scenes/PlayScene"
import {ParamGameEvent} from "../utilities/Event"
import Constants from "../configs/Constants"
import IUpdatable from "../interfaces/IUpdatable"

class PlatformSpawner
{
    public touchedPlatformIndex: ParamGameEvent<number> = new ParamGameEvent<number>()

    private playScene: PlayScene

    private platforms: Platform[] = []
    private currentPlatformIndex: number = 0
    private farthestPlatformXPosition: number = -200
    private currentWidth: number = 100
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

            this.currentWidth = Math.max(this.currentWidth - 10, 20)
        })
        
        this.easePlatformHeight()
    }

    public placeNextPlatform() {
        this.currentPlatformIndex = (this.currentPlatformIndex + 1) % Constants.PLATFORM_POOL_SIZE
        const platform = this.platforms[this.currentPlatformIndex]
        platform.setup(this.farthestPlatformXPosition + 200 + (Math.random() * 2 - 1) * 5, this.currentHeight, this.currentWidth)
        this.farthestPlatformXPosition += 200
        console.log(this.currentHeight)
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