import styled, { css } from "styled-components";

import { colors } from "../common/colors";

const animatedBackground = css`
  @keyframes loadingOpacity {
    from {
      opacity: 1;
    }

    to {
      opacity: 0.5;
    }
  }

  animation: 1s infinite loadingOpacity ease;
`;

const DummyHeader = styled.div`
  width: 30%;
  height: 1.4rem;
  background-color: ${colors.thinGray};
  margin-bottom: 0.5rem;
  ${animatedBackground}
`;

const DummyAddRace = styled.div`
  height: 4rem;
  background-color: ${colors.lightGray};
  ${animatedBackground}
`;

const DummyLastRound = styled.div`
  height: 1.5rem;
  background-color: ${colors.lightGray};
  margin-bottom: 0.5rem;
  ${animatedBackground}
`;

const DummyStandings = styled.div`
  height: 4rem;
  background-color: ${colors.darkGray};
  margin-bottom: 0.5rem;
  ${animatedBackground}
`;

export function LoadingLayout() {
  return (
    <>
      <div>
        <DummyHeader />
        <DummyAddRace />
      </div>

      <div>
        <DummyHeader />
        <DummyLastRound />
        <DummyStandings />
        <DummyStandings />
      </div>
    </>
  );
}
