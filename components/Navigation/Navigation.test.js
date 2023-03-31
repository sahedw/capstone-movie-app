import { render, screen } from "@testing-library/react";
import Navigation from ".";
import { DataContext } from "../../pages/_app";
import { useContext } from "react";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      asPath: "/search-results",
    };
  },
}));

const theme = "light";

test("Should show the search text in 'current' color because highlighted with mock router", () => {
  render(
    <DataContext.Provider value={{ theme }}>
      <Navigation />
    </DataContext.Provider>
  );
  const element = screen.getByText("Search");
  expect(element).toHaveStyle("color: #F97B7B;");
  expect(element).toHaveAttribute("value");
});
