import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

import { css } from "../../styled-system/css";

export function Changelog() {
  const { data: changelog } = useQuery({
    queryKey: ["changelog"],
    queryFn: () => fetch("/changelog.md").then((res) => res.text()),
  });

  if (!changelog) return null;

  return (
    <div
      className={css({
        padding: "1rem",
        maxWidth: "70rem",
        margin: "auto",
      })}
    >
      <h2
        className={css({
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        })}
      >
        Changelog
      </h2>
      <div
        className={css({
          padding: "1rem",
          maxWidth: "70rem",
          margin: "auto",
          backgroundColor: "darkGray",

          "& h3": {
            fontSize: "1.2rem",
            fontWeight: "bold",
          },
          "& ul": {
            listStyleType: "square",
            marginLeft: "2rem",
          },

          "& li": {
            margin: "0.5rem 0",
          },

          "& a": {
            color: "white",
            textDecoration: "underline",
          },

          "& a:hover": {
            color: "thinGray",
            textDecoration: "none",
          },
        })}
      >
        <Markdown>{changelog}</Markdown>
      </div>
    </div>
  );
}
