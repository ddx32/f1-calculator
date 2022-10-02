import React from "react";
import styled from "styled-components";

import { colors } from "../../common/colors";
import { ReactComponent as PlusButtonIcon } from "../../svg/plus-button.svg";

const AddNextRaceButton = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  padding: 0.8rem;
  gap: 0.8rem;
  align-content: center;
  cursor: pointer;

  strong {
    display: block;
    font-size: 1.1rem;
  }

  svg {
    width: 2.5rem;
  }
`;

export function AddNextRaceResults({
  raceName,
  onClick,
}: {
  raceName: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <AddNextRaceButton onClick={onClick}>
      <PlusButtonIcon />
      <div className="add-next-race-text">
        <strong>Add next race results</strong>
        {raceName}
      </div>
    </AddNextRaceButton>
  );
}
