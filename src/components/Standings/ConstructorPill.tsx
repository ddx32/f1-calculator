import styled from "styled-components";

import CONSTRUCTOR_DATA, {
  ConstructorMeta,
} from "../../constants/constructorsData";
import { Constructor, ConstructorStanding } from "../../types/entities";

const Pill = styled.div<{ $constructorMeta: ConstructorMeta }>`
  background-color: ${(props) => props.$constructorMeta.background};
  color: ${(props) => props.$constructorMeta.foreground};
  padding: 0.25rem 0.5rem;
  margin-right: 0.3rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .position {
    font-size: 1.2rem;
  }

  svg {
    width: 100%;
    height: 1.6rem;
    max-width: 2.3rem;
  }
`;

function getConstructorMeta(constructor: Constructor) {
  return CONSTRUCTOR_DATA.find(
    (constructorMeta) =>
      constructorMeta.constructorId === constructor.constructorId
  );
}

type Props = {
  constructorStanding: ConstructorStanding;
};

export function ConstructorPill({ constructorStanding }: Props) {
  const constructorMeta = getConstructorMeta(constructorStanding.Constructor);
  if (!constructorMeta) {
    return null;
  }

  const { Icon } = constructorMeta;

  return (
    <Pill $constructorMeta={constructorMeta}>
      <div className="position">{constructorStanding.position}</div>
      {Icon ? <Icon /> : null}
    </Pill>
  );
}
