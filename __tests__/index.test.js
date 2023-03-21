import Form from "../components/Form";
import { render, screen } from "@testing-library/react";
import Movie from "../components/Movie";
import genres from "../pages/api/genres";

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

const movie = {
  id: 1,
  title: "Movie-Title",
  release_date: "2023-03-21",
  genre_ids: [12, 18],
};

test("Renders the Movie component with the details", () => {
  render(<Movie key={movie.id} movie={movie} />);
  const element = screen.getByRole("heading", { name: /movie-title/i });
  expect(element).toBeInTheDocument();
});
