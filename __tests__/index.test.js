import Form from "../components/Form";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<Form />);
  const element = screen.getByLabelText("Search a movie:");
  expect(element).toBeInTheDocument();
});
