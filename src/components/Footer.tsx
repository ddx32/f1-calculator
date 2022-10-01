import styled from "styled-components";

import { colors } from "../common/colors";

const FooterContainer = styled.footer`
  color: ${colors.thinGray};
  padding: 2rem 1rem;
  border-top: 1px solid ${colors.darkGray};
  margin-top: 1rem;
`;

export function Footer() {
  return (
    <FooterContainer>
      <div>
        &copy; {new Date().getFullYear().toString()}{" "}
        <a href="https://filipruzicka.com">Filip Růžička</a>
      </div>
      <div>
        Source code on{" "}
        <a
          href="https://github.com/ddx32/f1-calculator"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
      <div>
        Data sourced from{" "}
        <a href="https://ergast.com/mrd/" target="_blank" rel="noreferrer">
          Ergast API
        </a>
      </div>
    </FooterContainer>
  );
}
