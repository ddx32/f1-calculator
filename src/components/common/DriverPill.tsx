import styled from "styled-components";

import { colors } from "../../common/colors";

const DriverPillStyled = styled.div`
  background-color: ${colors.white};
  border: 0.2rem ${colors.black} solid;
  color: ${colors.black};
  padding: 0.15rem 0.5rem;
  margin-right: 0.3rem;
  font-size: 0.9rem;
`;

export function DriverPill({
  driverCode,
  position,
}: {
  driverCode: string;
  position: number;
}) {
  return (
    <DriverPillStyled>
      {position}. {driverCode}
    </DriverPillStyled>
  );
}
