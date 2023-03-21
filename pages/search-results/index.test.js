import Movie from "../../components/Movie";
import genres from "../api/genres";
import { render, screen } from "@testing-library/react";

// Fake data for the test

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
