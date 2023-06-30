import StateMachine from "../utilities/StateMachine"
import SpriteKey from "../configs/SpriteKey"
import GameState from "../states/GameState"

class GameManager
{
    public static sceneManager: Phaser.Scenes.ScenePlugin
    public static stateMachine: StateMachine<GameState> = new StateMachine<GameState>(GameState.BOOT)
    public static currentSkin: SpriteKey = SpriteKey.BALL_DEFAULT
    public static isMute: boolean = false
}

export default GameManager