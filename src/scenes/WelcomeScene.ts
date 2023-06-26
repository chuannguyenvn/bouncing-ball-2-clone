import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"


class WelcomeScene extends Scene
{
    constructor() {
        super({
            key: SceneKey.WELCOME
        })
    }
}

export default WelcomeScene