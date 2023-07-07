import Phaser from "phaser"
import PlayScene from "../scenes/PlayScene"
import LoadScene from "../scenes/LoadScene"
import BootScene from "../scenes/BootScene"
import ShopScene from "../scenes/ShopScene"

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
    title: 'Bouncing Ball 2',
    width: 450,
    height: 800,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, LoadScene, PlayScene, ShopScene],
    backgroundColor: 0xffffff,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0.4
            }
        }
    },
}

export default GAME_CONFIG

// - matter physics
// - tween
// - event, callback
// - object pool
// - local storage
// - scene
// - audio
//
//
//
// - game build ra nhẹ và nhanh
// - development tool cũng nhẹ và nhanh
// - development time ngắn?
//     - ts, js + build web game = perfect
//     - hỗ trợ nhiều physics engine
// - open source
// - k bị coupled vào hardware
//
//
//
// - editor (technically có editor, nhưng không phải official?)
// - string-based nhiều quá
// - hệ tọa độ lạ
// - góc quay clockwise
// - mọi thứ là reference
// - khó copy object
// - physics engine rối, k có abstraction
// - khó step: code ts transpile thành js
// - k có nhiều built-in components/objects (button, scroll view,...)
// - cross-platform?
//     - official example k có coding style thống nhất
// - documentation ít, không có example
// - khó xài third-party tools
// - single-threaded
// - nhiều api k thống nhất (lúc xài Vector2, lúc xài x y; color lúc xài number cái s
// - api của Phaser chưa hide hết được api của web
// - kiến trúc k thân thiện với OOP lắm? (nhiều api xài object, any,...)