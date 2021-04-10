/*
 * @Date: 2021-04-09 21:40:05
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\components\Cell.js
 */
import React from "react";

import { StyledCell } from "./styles/StyledCell";

import { TETROMINOS } from "../utils/tetrominons";

/**
 * 创建单元格
 * @param {String} type 单元格类型,0 为无,1 为有
 * @returns components
 */
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
);

export default React.memo(Cell);
