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

const fullMovie = {
  id: 1,
  title: "Movie-Title",
  release_date: "2023-03-21",
  genre_ids: [12, 18],
};

const brokenMovie = {
  id: 1,
  title: "Movie-Title",
  release_date: "2023-03-21",
  genre_ids: [],
};

test("Should render the Movie components heading", () => {
  render(<Movie key={fullMovie.id} movie={fullMovie} />);
  const element = screen.getByRole("heading", { name: "Movie-Title - 2023" });
  expect(element).toBeInTheDocument();
});

test("Should render the Movie components genres", () => {
  render(<Movie key={fullMovie.id} movie={fullMovie} />);
  const genres = screen.getByText("Adventure, Drama");
  expect(genres).toBeInTheDocument();
});

test("Should render 'Missing, Genre' because no genre id's are provided", () => {
  render(<Movie key={brokenMovie.id} movie={brokenMovie} />);
  const genres = screen.getByText("Missing, Genre");
  expect(genres).toBeInTheDocument();
});
