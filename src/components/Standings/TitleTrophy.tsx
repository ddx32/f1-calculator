import styled from "styled-components";

import TrophyPotentialIcon from "../../svg/trophy-potential.svg?react";
import TrophySecuredIcon from "../../svg/trophy-secured.svg?react";
import { Standing, TitleChance } from "../../types/entities";

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

export function TitleTrophy<T extends Standing>({ standing }: { standing: T }) {
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
