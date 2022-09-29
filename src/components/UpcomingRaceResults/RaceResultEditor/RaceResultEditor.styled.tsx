import styled from "styled-components";

import { colors } from "../../../common/colors";
import fastestLap from "../../../images/fastestLap.png";

export const ResultEditorContainer = styled.div`
  padding: 0 1rem 1rem 1rem;

  .result-row {
    display: flex;
    border: 1px solid ${colors.lightGray};
    background-color: ${colors.midGray};
    align-items: center;
    padding: 0.3rem;
    margin: 0.2rem 0;
  }

  .position {
    flex: 1.4rem 0 0;
    text-align: right;
  }

  .driver {
    padding-left: 0.5rem;
    flex: auto 1 1;
  }

  .points-gained {
    align-self: flex-end;
  }

  .handle {
    flex: 2rem 0 0;
    text-align: right;
  }

  .fastest-lap {
    flex: auto 0 0;
  }

  .fastestLapContainer {
    position: relative;
    padding: 0 !important;
    width: 1.3rem;
    height: 1.3rem;
    display: block;
    cursor: pointer;
  }

  .fastestLapContainer input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
  }

  .checkmark:hover {
    background-image: url(${fastestLap});
  }

  .fastestLapContainer input:checked ~ .checkmark {
    background-image: url(${fastestLap});
  }
`;
