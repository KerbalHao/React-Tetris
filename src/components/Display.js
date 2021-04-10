/*
 * @Date: 2021-04-09 21:40:10
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\components\Display.js
 */
import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

/**
 * 侧边文字展示
 * @param {Boolean} gameOver
 * @param {String} text
 * @returns jsx
 */
const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
