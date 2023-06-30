import StateMachine from "../utilities/StateMachine"
import SpriteKey from "../configs/SpriteKey"

enum GameState
{
    BOOT,
    LOADING,
    PLAY,
    SHOP,
}

class GameManager
{
    public static sceneManager: Phaser.Scenes.ScenePlugin
    public static stateMachine: StateMachine<GameState> = new StateMachine<GameState>(GameState.BOOT)
    public static currentSkin: SpriteKey = SpriteKey.BALL_DEFAULT
    public static isMute: boolean = false
}

export {GameManager, GameState}