/*
 * @Date: 2021-04-09 23:12:22
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\hooks\useGameStatus.js
 */
import { useState, useEffect, useCallback } from "react";

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    // 分数
    if (rowsCleared > 0) {
      // 计算方块分数
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);
  return [score,setScore, rows,setRows,level,setLevel]
};
