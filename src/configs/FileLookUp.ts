import SpriteKey from "./SpriteKey"
import AudioKey from "./AudioKey"

const FileLookUp = {
    [SpriteKey.SQUARE]: './assets/images/Square.png',
    [SpriteKey.CIRCLE]: './assets/images/Circle.png',
    [SpriteKey.GRADIENT]: './assets/images/Gradient.png',
    [SpriteKey.BALL_DEFAULT]: './assets/images/Ball_Default.png',
    [SpriteKey.BALL_HAPPY]: './assets/images/Ball_happy.png',
    [SpriteKey.BALL_CHIP]: './assets/images/Ball_chip.png',
    [SpriteKey.BALL_LEMON]: './assets/images/Ball_lemon.png',
    [SpriteKey.BALL_YINGYANG]: './assets/images/Ball_yingyang.png',
    [SpriteKey.BUTTON_IDLE]: './assets/images/Button_idle.png',
    [SpriteKey.BUTTON_CLICKED]: './assets/images/Button_clicked.png',
    [SpriteKey.GEM]: './assets/images/Gem.png',
    [AudioKey.GEM]: './assets/sounds/Gem.wav',
    [AudioKey.JUMP_1]: './assets/sounds/Jump_1.wav',
    [AudioKey.JUMP_2]: './assets/sounds/Jump_2.wav',
    [AudioKey.JUMP_3]: './assets/sounds/Jump_3.wav',
    [AudioKey.MASTERPIECE]: './assets/sounds/kiet-tac.wav',
    ['masterpiece-map']: './assets/tiled/masterpiece-map.json',
}

export default FileLookUp