import Form from "../components/Form";
import { render, screen } from "@testing-library/react";
import Movie from "../components/Movie";
import MovieDetail from "../components/MovieDetail";

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
  title: "The Batman",
  release_date: "2023-03-21",
  genre_ids: [12, 18],
  overview: "Plot",
  flatrate: [{ provider_name: "Netflix" }, { provider_name: "Amazon Video" }],
};

const brokenMovie = {
  id: 1,
  title: "Movie-Title",
  release_date: "2023-03-21",
  genre_ids: [],
  flatrate: [],
};

test("Should render the Movie components heading", () => {
  render(<Movie key={fullMovie.id} movie={fullMovie} />);
  const element = screen.getByRole("heading", { name: "The Batman - 2023" });
  expect(element).toBeInTheDocument();
});

test("Should render the Movie components genres", () => {
  render(<Movie key={fullMovie.id} movie={fullMovie} />);
  const genres = screen.getByText("Adventure, Drama");
  expect(genres).toBeInTheDocument();
});

test("Should render 'Missing, Genre' because no genre ids are provided", () => {
  render(<Movie key={brokenMovie.id} movie={brokenMovie} />);
  const genres = screen.getByText("Missing, Genre");
  expect(genres).toBeInTheDocument();
});

test("Should render the MovieDetail component with the right heading", () => {
  render(<MovieDetail movie={fullMovie} />);
  const element = screen.getByRole("heading", { name: "The Batman - 2023" });
  expect(element).toBeInTheDocument();
});

test("Should render the MovieDetail component with the right plot", () => {
  render(<MovieDetail movie={fullMovie} />);
  const element = screen.getByText("Plot");
  expect(element).toBeInTheDocument();
});

test("Should render the MovieDetail component and the availability if not available", () => {
  render(<MovieDetail movie={brokenMovie} />);
  const element = screen.getByText(
    "Not available for streaming with a flatrate"
  );
  expect(element).toBeInTheDocument();
});

/* test("Should render the MovieDetail component and the stream providers", () => {
  render(<MovieDetail movie={fullMovie} />);
  const element = screen.getByText("Netflix");
  expect(element).toBeInTheDocument();
}); */
