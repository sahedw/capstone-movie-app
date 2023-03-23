import { render, screen } from "@testing-library/react";
import Navigation from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      asPath: "/search-results",
    };
  },
}));

test("Should show the search text in 'current' color because highlighted with mock router", () => {
  render(<Navigation />);
  const element = screen.getByText("Search");
  expect(element).toHaveStyle("color: #F97B7B;");
  expect(element).toHaveAttribute("value");
});
