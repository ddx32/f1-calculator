import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          gray: {
            100: { value: "#B4B4B4" },
            200: { value: "#4E4E4E" },
            300: { value: "#313131" },
            400: { value: "#292929" },
          },
          black: { value: "#000000" },
          white: { value: "#FFFFFF" },
          darkGray: { value: "#292929" },
          midGray: { value: "#313131" },
          lightGray: { value: "#4E4E4E" },
          thinGray: { value: "#B4B4B4" },
        },
      },
    },
  },
});
