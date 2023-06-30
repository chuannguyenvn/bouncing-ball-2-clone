import SpriteKey from "../configs/SpriteKey"
import {Scene} from "phaser"
import FileLookUp from "../configs/FileLookUp"
import AudioKey from "../configs/AudioKey"

class PreloadHelper
{
    public static preloadSprite(scene: Scene, key: SpriteKey): void {
        scene.load.image(key, FileLookUp[key])
    }

    public static preloadSound(scene: Scene, key: AudioKey): void {
        scene.load.audio(key, FileLookUp[key])
    }
}

export default PreloadHelper

