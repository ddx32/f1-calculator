import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the main component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Current championship standings/i);
  expect(linkElement).toBeInTheDocument();
});
