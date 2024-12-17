import styled from "styled-components";

import { colors } from "../common/colors";

const FooterContainer = styled.footer`
  color: ${colors.thinGray};
  padding: 2rem 1rem;
  border-top: 1px solid ${colors.darkGray};
  margin: 1rem auto;
  max-width: 70rem;
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
        <a
          href="https://github.com/jolpica/jolpica-f1"
          target="_blank"
          rel="noreferrer"
        >
          jolpica-f1 API
        </a>
      </div>
    </FooterContainer>
  );
}
