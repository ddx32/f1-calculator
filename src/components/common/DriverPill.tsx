import styled from "styled-components";

import { colors } from "../../common/colors";

const DriverPillStyled = styled.div`
  background-color: ${colors.white};
  border: 0.1rem ${colors.black} solid;
  color: ${colors.black};
  margin-right: 0.3rem;
  padding: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .position {
    background-color: ${colors.thinGray};
    border: none;
    border-right: 0.1rem ${colors.black} solid;
    color: ${colors.black};
    padding: 0.1rem 0.3rem;
  }

  .driver-code {
    padding: 0 0.3rem;
  }
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
      <div className="position">{position}</div>
      <div className="driver-code">{driverCode}</div>
    </DriverPillStyled>
  );
}
