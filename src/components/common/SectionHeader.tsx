import { ReactNode } from "react";
import styled from "styled-components";

const PointyArrow = styled.span`
  font-size: 1.4rem;
  padding-left: 0.5rem;
`;

const Heading = styled.h2`
  margin-bottom: 0.5rem;
`;

export function SectionHeader({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Heading>
      {children}
      <PointyArrow>{active ? "▾" : "▸"}</PointyArrow>
    </Heading>
  );
}
