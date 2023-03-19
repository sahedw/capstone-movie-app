import Form from "../components/Form";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { DataContext } from "../pages/_app";

test("test", () => {
  render(<Form />);
  const element = screen.getByLabelText("Search a movie:");
  expect(element).toBeInTheDocument();
});
