import Form from "../components/Form";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      asPath: "/",
    };
  },
}));

test("Renders the correct label for my input in the form component", () => {
  render(<Form />);
  const element = screen.getByLabelText("Search a movie:");
  expect(element).toBeInTheDocument();
});
