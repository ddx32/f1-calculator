import styled from "styled-components";

import { colors } from "../../common/colors";
import { ReactComponent as ChevronIcon } from "../../svg/chevron.svg";

export const StandingsContainer = styled.div`
  background: ${colors.darkGray};
  color: ${colors.white};
  padding: 0.4rem;
  margin-bottom: 0.4rem;
`;

export const StandingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .summary-container {
    flex: auto 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    margin-bottom: 0.3rem;
  }
`;

export const ResultsTable = styled.table`
  width: 100%;

  th {
    text-align: left;
  }
`;

export const ShortList = styled.div`
  display: flex;
  margin-bottom: 0.3rem;
`;

const ChevronCell = styled.div<{ expanded: boolean }>`
  flex: 1.4rem 0 0;
  padding-right: 0.5rem;
  min-height: 2rem;

  svg {
    transition: transform 0.2s ease;
    ${(props) => props.expanded && "transform: rotate(90deg)"}
  }
`;

export const IconCell = styled.div<{
  size: string;
  offset?: string;
  scale?: string;
  rotate?: string;
}>`
  flex: 4.4rem 0 0;

  svg {
    transform: translate(${(props) => props.offset || 0})
      scale(${(props) => props.scale || 1})
      rotate(${(props) => props.rotate || 0});
    height: ${(props) => props.size};
  }
`;

export const Chevron = ({ expanded }: { expanded: boolean }) => (
  <ChevronCell expanded={expanded}>
    <ChevronIcon />
  </ChevronCell>
);
