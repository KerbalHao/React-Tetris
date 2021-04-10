/*
 * @Date: 2021-04-09 23:12:31
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\hooks\useStage.js
 */
import { useState, useEffect } from "react";
import { createStage } from "../utils/gameHelpers";
/**
 *
 * @param {Object} player 表示一整块砖的状态
 * @param {Object<Number>} player.pos x y 表示坐标
 * @param {Array<Array<String>>} player.tetromino 砖块形状的数组表示
 * @param {Boolean} player.collided 是否碰撞
 * @param {*} resetPlayer
 * @returns
 */
export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    // TODO: 清除符合条件的行
    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack
        }
        ack.push(row)
        return ack
      }, []);

    const updateStage = (prevStage) => {
      // 首先 先判断一次 stage 的所有单元格
      const newStage = prevStage.map((row) =>
        // 若 cell 中的 第二个元素不是 clear 则表示该单元格存在砖块
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // 绘制单元格存在的砖块
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          // 遍历数组中的每个元素
          if (value !== 0) {
            // 若不为0，则说明该位置有砖块
            // 绘制该位置的砖块
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });
      // 检测是否有碰撞
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage) // 清理碰撞
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player]);

  return [stage, setStage, rowsCleared];
};
