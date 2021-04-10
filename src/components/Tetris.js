/*
 * @Date: 2021-04-09 21:40:25
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\components\Tetris.js
 */
import React, { useState } from "react";

// components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// styled-components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

// custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

// utils
import { createStage, checkCollision } from "../utils/gameHelpers";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  console.log("re-render");

  /**
   * 用户操控移动砖块
   * @param {Number} dir,1 向右，-1 向左
   */
  const movePlayerHor = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
  };

  // 开始游戏
  const startGame = () => {
    //reset everything
    setStage(createStage());
    resetPlayer();
    setDropTime(1000 / (level + 1) + 200);
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  };

  // 砖块落下
  const drop = () => {
    // 没清理10行则升级
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // 加速
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // game over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  // 用户操控落下
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  /**
   * 砖块移动逻辑
   * @param {Object} event 解构事件中的 keycode
   */
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayerHor(-1);
      } else if (keyCode === 39) {
        movePlayerHor(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callBack={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};
export default Tetris;
