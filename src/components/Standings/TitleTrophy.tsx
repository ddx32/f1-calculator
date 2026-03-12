import classNames from "classnames";

import { css } from "../../../styled-system/css";
import trophyPotentialSrc from "../../svg/trophy-potential.svg";
import trophySecuredSrc from "../../svg/trophy-secured.svg";
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

export function TitleTrophy<T extends Standing>({ standing }: { standing: T }) {
  return standing.titleChance ? (
    <div
      className={classNames({
        potentialTitle: standing.titleChance === TitleChance.POTENTIAL,
        securedTitle: standing.titleChance === TitleChance.SECURED,
      })}
      title={getDescription(standing.titleChance)}
    >
      {standing.titleChance === TitleChance.POTENTIAL && (
        <img
          src={trophyPotentialSrc}
          className={css({ width: "1rem" })}
          alt=""
        />
      )}
      {standing.titleChance === TitleChance.SECURED && (
        <img src={trophySecuredSrc} className={css({ width: "1rem" })} alt="" />
      )}
    </div>
  ) : null;
}
