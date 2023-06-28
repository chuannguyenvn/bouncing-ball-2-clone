﻿import Vector2 = Phaser.Math.Vector2

const Constants = {
    BALL_RADIUS: 20,
    BALL_START_POSITION: new Vector2(0, 300),
    BALL_X_VELOCITY: 4,
    PLATFORM_THICKNESS: 15,
    PLATFORM_TINT: 0x777684,
    GRADIENT_COLUM_DEFAULT_TINT: 0xced6e3,
    PLATFORM_POOL_SIZE: 5,
    PLATFORM_MIDDLE_PERCENTAGE: 0.60,
    HIGH_SCORE_STORAGE_KEY: 'high-score',
    GEMS_COLLECTED_STORAGE_KEY: 'gems-collected',
    SCREENSHAKE_DURATION: 100,
    SCREENSHAKE_STRENGTH: 0.0075,
}

export default Constants