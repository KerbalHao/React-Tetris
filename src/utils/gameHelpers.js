/*
 * @Date: 2021-04-09 21:49:55
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\utils\gameHelpers.js
 */
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

/** 根据默认宽高设置游戏空间大小
 *
 * @returns Array 返回表示行列和单元格的三维数组
 */
export const createStage = () =>
  // 创建二维矩阵，有 STAGE_HEIGHT 行
  // 和 STAGE_WIDTH 列，
  // 每个单元格都一个包含 0 和 clear 的数组
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

/**
 *  碰撞检测
 * @param {Object} player 砖块
 *  @param {Array} player.tetromino 砖块形状的数组表示
 * @param {Array} stage 场景的多维数组表示
 */
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    // 遍历每一个单元格
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. 检查当前获取的单元格是否砖块
      if (player.tetromino[y][x] !== 0) {
        // 2. 检查下一步的移动是否在游戏场景范围内（垂直）
        // 无法穿过场景底部
        if (
          !stage[y + player.pos.y + moveY] ||
          // 3.检查下一步移动是否在场景范围内（水平）
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. 检查下一步要到达的单元格是否无砖块
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
