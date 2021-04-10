/*
 * @Date: 2021-04-09 23:12:27
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\hooks\usePlayer.js
 */
import { useState, useCallback } from "react";
import { checkCollision, STAGE_WIDTH } from "../utils/gameHelpers";

import { randomTetromino, TETROMINOS } from "../utils/tetrominons";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {
      x: 0,
      y: 0
    },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  // TODO: 旋转处理的学习
  const rotate = (matrix, dir) => {
    // 将行变为列(transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // 将每一行反转来获得旋转后的矩阵
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    // TODO: 对于旋转后触发碰撞的处理（学习）
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      // 重置时，将砖块水平位置放在 stage的中间
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);
  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
