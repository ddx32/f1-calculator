import { css } from "../../styled-system/css";

export function Footer() {
  return (
    <footer
      className={css({
        color: "thinGray",
        padding: "2rem 1rem",
        borderTop: "1px solid token(colors.darkGray)",
        margin: "1rem auto",
        maxWidth: "70rem",
      })}
    >
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
    </footer>
  );
}
