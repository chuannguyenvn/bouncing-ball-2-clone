﻿import StateMachine from "../utilities/StateMachine"

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
}

export {GameManager, GameState}