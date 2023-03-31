import Head from "next/head";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useLocalStorageFetch } from "../hooks/useLocalStorageFetch";
import { useFetch } from "../hooks/useFetch";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles";

export const DataContext = createContext();
export const WatchlistContext = createContext();
export const CinemaContext = createContext();
export const TrendingContext = createContext();
export const WatchedContext = createContext();

export default function App({ Component, pageProps }) {
  const [watchlist, setWatchlist] = useLocalStorageState("newWatchlist", {
    defaultValue: [],
  });
  const [watched, setWatched] = useLocalStorageState("newWatched", {
    defaultValue: [],
  });

  const [dayTrending, setDayTrending] = useState(true);

  const [search, setSearch] = useState("");

  const movies = useLocalStorageFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US&query=${search}`,
    "newMovies",
    [],
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US&query=${search}`
  );

  const currentlyInCinemas = useLocalStorageFetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
    "newCinema",
    [],
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );

  const trendingMovies = useFetch(
    `https://api.themoviedb.org/3/trending/movie/${
      dayTrending ? "day" : "week"
    }?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    [],
    dayTrending
  );

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setSearch(data.search);
  }

  function handleToggleWatchList(newMovie) {
    if (
      !watchlist.some(
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
      !watched.some(
        (movie) => JSON.stringify(movie) === JSON.stringify(newMovie)
      )
    ) {
      setWatched([...watched, newMovie]);
    } else {
      setWatched(
        watched.filter((watchedMovie) => watchedMovie.id !== newMovie.id)
      );
    }
  }

  function handleTrendingSort(boolean) {
    setDayTrending(boolean);
  }

  const [availabilityOption, setAvailabilityOption] = useLocalStorageState(
    "newAvailability",
    { defaultValue: "all" }
  );

  function getAvailabilitySeletion(event) {
    event.preventDefault();
    setAvailabilityOption(event.target.value);
  }

  const [theme, setTheme] = useState("light");

  function themeToggler() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <>
      <Head>
        <title>Saheds Movie App</title>
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <WatchedContext.Provider value={{ watched, handleToggleWatched }}>
          <TrendingContext.Provider
            value={{ dayTrending, trendingMovies, handleTrendingSort }}
          >
            <CinemaContext.Provider value={{ currentlyInCinemas }}>
              <WatchlistContext.Provider
                value={{ handleToggleWatchList, watchlist }}
              >
                <DataContext.Provider
                  value={{
                    getAvailabilitySeletion,
                    availabilityOption,
                    themeToggler,
                    theme,
                    DataContext,
                    handleFormSubmit,
                    movies,
                  }}
                >
                  <Component {...pageProps} />
                </DataContext.Provider>
              </WatchlistContext.Provider>
            </CinemaContext.Provider>
          </TrendingContext.Provider>
        </WatchedContext.Provider>
      </ThemeProvider>
    </>
  );
}
