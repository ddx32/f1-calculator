import React from "react";
import styled from "styled-components";

import { ReactComponent as TrophyPotentialIcon } from "../svg/trophy-potential.svg";
import { ReactComponent as TrophySecuredIcon } from "../svg/trophy-secured.svg";
import { IStanding, TitleChance } from "../types/api";

function getDescription(titleChance: TitleChance): string {
  switch (titleChance) {
    case TitleChance.SECURED:
      return "Championship title already secured";
    case TitleChance.POTENTIAL:
      return "Mathematically in the title fight";
    case TitleChance.NONE:
      return "Out of the title fight";
  }
}

const TrophyContainer = styled.div`
  svg {
    width: 1rem;
  }
`;

export function TitleTrophy<T extends IStanding>({
  standing,
}: {
  standing: T;
}) {
  return standing.titleChance ? (
    <TrophyContainer
      className={
        standing.titleChance === TitleChance.POTENTIAL ? "potentialTitle" : ""
      }
      title={getDescription(standing.titleChance)}
    >
      {standing.titleChance === TitleChance.POTENTIAL && (
        <TrophyPotentialIcon />
      )}
      {standing.titleChance === TitleChance.SECURED && <TrophySecuredIcon />}
    </TrophyContainer>
  ) : null;
}
