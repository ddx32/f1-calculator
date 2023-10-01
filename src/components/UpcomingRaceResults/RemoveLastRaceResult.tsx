import React from "react";
import styled from "styled-components";

import { colors } from "../../common/colors";
import MinusButton from "../../svg/minus-button.svg?react";

const RemoveLastRaceResultButton = styled.div`
  background-color: ${colors.darkGray};
  padding: 0.5rem 0.8rem;
  display: flex;
  gap: 0.8rem;
  align-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 1.7rem;
  }
`;

export function RemoveLastRaceResult({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <RemoveLastRaceResultButton onClick={onClick}>
      <MinusButton />
      <strong>Remove last race results</strong>
    </RemoveLastRaceResultButton>
  );
}
