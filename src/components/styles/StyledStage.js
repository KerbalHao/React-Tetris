/*
 * @Date: 2021-04-09 22:47:56
 * @LastEditors: KerbalHao
 * @FilePath: \reactPro\teact-tetris\src\components\styles\StyledStage.js
 */
import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(45vh / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 45vh;
  background: #111;
`;
