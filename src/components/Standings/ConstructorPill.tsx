import { css } from "../../../styled-system/css";
import CONSTRUCTOR_DATA from "../../constants/constructorsData";
import { Constructor, ConstructorStanding } from "../../types/entities";

const pill = css({
  padding: "0.25rem 0.5rem",
  marginRight: "0.3rem",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  "& svg": {
    width: "100%",
    height: "1.6rem",
    maxWidth: "2.3rem",
  },
});

function getConstructorMeta(constructor: Constructor) {
  return CONSTRUCTOR_DATA.find(
    (constructorMeta) =>
      constructorMeta.constructorId === constructor.constructorId,
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
    <div
      className={pill}
      style={{
        backgroundColor: constructorMeta.background,
        color: constructorMeta.foreground,
      }}
    >
      <div className={css({ fontSize: "1.2rem" })}>
        {constructorStanding.position}
      </div>
      {Icon ? <Icon /> : null}
    </div>
  );
}
