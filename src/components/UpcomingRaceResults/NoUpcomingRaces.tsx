import { styled } from "styled-components";

const EmptyDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export function NoUpcomingRaces() {
  return (
    <EmptyDataContainer>
      No upcoming race events left in this season. Enjoy the break!
    </EmptyDataContainer>
  );
}
