/*
 * @Date: 2021-04-09 21:40:14
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\components\Stage.js
 */
import React from "react";
import Cell from "./Cell";
import { StyledStage } from "./styles/StyledStage";

/**
 *  绘制游戏场景
 * @param {Array} stage： 表示场景行和单元格的三维数组
 * @returns jsx
 */
const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) =>
      row.map((cell, index) => <Cell key={index} type={cell[0]} />)
    )}
  </StyledStage>
);

export default Stage;
