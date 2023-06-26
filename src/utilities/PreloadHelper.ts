import SpriteKey from "../configs/SpriteKey"
import {Scene} from "phaser"
import FileLookUp from "../configs/FileLookUp"

class PreloadHelper
{
    public static preloadSprite(scene: Scene, key: SpriteKey): void {
        scene.load.image(key, FileLookUp[key])
    }
}

export default PreloadHelper

