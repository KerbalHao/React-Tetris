/*
 * @Date: 2021-04-09 21:40:21
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\components\StartButton.js
 */
import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

/**
 *  按钮设置
 * @param {Function} callBack 设置开始游戏
 * @returns jsx
 */
const StartButton = ({ callBack }) => (
  <StyledStartButton onClick={callBack}>StartGame</StyledStartButton>
);

export default StartButton;
