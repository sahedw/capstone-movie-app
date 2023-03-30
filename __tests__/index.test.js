import Form from "../components/Form";
import { render, screen } from "@testing-library/react";
import Movie from "../components/Movie";
import MovieDetail from "../components/MovieDetail";
import Actors from "../components/Actors";
import { WatchlistContext, WatchedContext } from "../pages/_app";
import MovieGrid from "../components/MovieGrid";

function handleToggleWatchList(newMovie) {
  if (
    !watchedList.some(
      (movie) => JSON.stringify(movie) === JSON.stringify(newMovie)
    )
  ) {
    setWatchlist([...watchlist, newMovie]);
  } else {
    setWatchlist(
      watchlist.filter((watchMovie) => watchMovie.id !== newMovie.id)
    );
  }
}

function handleToggleWatched(newMovie) {
  if (
    !watched.some((movie) => JSON.stringify(movie) === JSON.stringify(newMovie))
  ) {
    setWatched([...watched, newMovie]);
  } else {
    setWatched(
      watched.filter((watchedMovie) => watchedMovie.id !== newMovie.id)
    );
  }
}

const watchlist = [];
const watched = [];

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      asPath: "/",
    };
  },
}));

const fullMovie = {
  id: 1,
  title: "The Batman",
  release_date: "2023-03-21",
  genre_ids: [12, 18],
  overview: "Plot",
  flatrate: [{ provider_name: "Netflix" }, { provider_name: "Amazon Video" }],
  actors: [
    { name: "John Doe", poster_path: "falselink.jpg" },
    { name: "Jane Doe" },
  ],
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
  render(
    <WatchedContext.Provider value={{ handleToggleWatched, watched }}>
      <WatchlistContext.Provider value={{ handleToggleWatchList, watchlist }}>
        <MovieDetail movie={fullMovie} />
      </WatchlistContext.Provider>
    </WatchedContext.Provider>
  );
  const element = screen.getByRole("heading", { name: "The Batman - 2023" });
  expect(element).toBeInTheDocument();
});

test("Should render the MovieDetail component with the right plot", () => {
  render(
    <WatchedContext.Provider value={{ handleToggleWatched, watched }}>
      <WatchlistContext.Provider value={{ handleToggleWatchList, watchlist }}>
        <MovieDetail movie={fullMovie} />
      </WatchlistContext.Provider>
    </WatchedContext.Provider>
  );
  const element = screen.getByText("Plot");
  expect(element).toBeInTheDocument();
});

test("Should render the MovieDetail component and the availability if not available", () => {
  render(
    <WatchedContext.Provider value={{ handleToggleWatched, watched }}>
      <WatchlistContext.Provider value={{ handleToggleWatchList, watchlist }}>
        <MovieDetail movie={fullMovie} />
      </WatchlistContext.Provider>
    </WatchedContext.Provider>
  );
  const element = screen.getByText("Flatrate: Not available");
  expect(element).toBeInTheDocument();
});

test("Should render the Actors component with actor name", () => {
  render(<Actors actors={fullMovie.actors} />);
  const actorOne = screen.getByText("John Doe");
  const actorTwo = screen.getByText("Jane Doe");
  expect(actorOne).toBeInTheDocument();
  expect(actorTwo).toBeInTheDocument();
});

test("Should render the Actors component alt text for missing portrait", () => {
  render(<Actors actors={fullMovie.actors} />);
  const element = screen.getByAltText(`${fullMovie.actors[0].name}`);
  expect(element).toBeInTheDocument();
});

test("Should render an image in the moviegrid component", () => {
  render(<MovieGrid movie={fullMovie} />);
  const element = screen.getByRole("img");
  expect(element).toBeInTheDocument();
});

test("Should render text for empty watchlist in homepage", () => {
  render(<MovieGrid movie={fullMovie} />);
  const element = screen.getByRole("img");
  expect(element).toBeInTheDocument();
});
