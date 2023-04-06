import Head from "next/head";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useLocalStorageFetch } from "../hooks/useLocalStorageFetch";
import { useFetch } from "../hooks/useFetch";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles";

export const DataContext = createContext();
export const MediaContext = createContext();
export const WatchlistContext = createContext();
export const WatchedContext = createContext();
export const WatchlistTVContext = createContext();
export const WatchedTVContext = createContext();
export const CinemaContext = createContext();
export const TrendingContext = createContext();

export default function App({ Component, pageProps }) {
  const [watchlist, setWatchlist] = useLocalStorageState("newWatchlist", {
    defaultValue: [],
  });
  const [watchlistTV, setWatchlistTV] = useLocalStorageState("newWatchlistTV", {
    defaultValue: [],
  });
  const [watched, setWatched] = useLocalStorageState("newWatched", {
    defaultValue: [],
  });
  const [watchedTV, setWatchedTV] = useLocalStorageState("newWatchedTV", {
    defaultValue: [],
  });
  const [availabilityOption, setAvailabilityOption] = useLocalStorageState(
    "newAvailability",
    { defaultValue: "all" }
  );
  const [dayTrending, setDayTrending] = useState(true);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useLocalStorageState("newTheme", {
    defaultValue: "light",
  });
  const [resultsPage, setResultsPage] = useState(1);
  const [mediaTypeMovies, setMediaTypeMovies] = useState("movie");

  function resetResultsPage() {
    setResultsPage(1);
  }

  const moviesData = useLocalStorageFetch(
    `/api/themoviedb/search/${mediaTypeMovies}?&language=eng-US&query=${search}&page=${resultsPage}`,
    "newMovies",
    [],
    `/api/themoviedb/search/${mediaTypeMovies}?&language=eng-US&query=${search}&page=${resultsPage}`
  );

  const totalSearchPages = moviesData.total_pages;
  const totalSearchResults = moviesData.total_results;

  const movies = moviesData.results;

  const currentlyInCinemaData = useLocalStorageFetch(
    `/api/themoviedb/movie/now_playing?`,
    "newCinema",
    [],
    `/api/themoviedb/movie/now_playing?`
  );

  const currentlyInCinemas = currentlyInCinemaData.results;

  const trendingMovies = useFetch(
    `/api/themoviedb/trending/movie/${dayTrending ? "day" : "week"}`,
    [],
    dayTrending
  );

  const upcomingMovies = useFetch(
    `/api/themoviedb/movie/upcoming?&language=en-US&page=1`,
    []
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

  function handleToggleWatchListTV(newMovie) {
    if (
      !watchlistTV.some(
        (movie) => JSON.stringify(movie) === JSON.stringify(newMovie)
      )
    ) {
      setWatchlistTV([...watchlistTV, newMovie]);
    } else {
      setWatchlistTV(
        watchlistTV.filter((watchMovie) => watchMovie.id !== newMovie.id)
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

  function handleToggleWatchedTV(newMovie) {
    if (
      !watchedTV.some(
        (movie) => JSON.stringify(movie) === JSON.stringify(newMovie)
      )
    ) {
      setWatchedTV([...watchedTV, newMovie]);
    } else {
      setWatchedTV(
        watchedTV.filter((watchedMovie) => watchedMovie.id !== newMovie.id)
      );
    }
  }

  function handleTrendingSort(boolean) {
    setDayTrending(boolean);
  }

  function getAvailabilitySeletion(event) {
    event.preventDefault();
    setAvailabilityOption(event.target.value);
  }

  function themeToggler() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  function handleNextPage() {
    setResultsPage(resultsPage + 1);
  }

  function handlePrevPage() {
    if (resultsPage > 1) {
      setResultsPage((previous) => previous - 1);
    } else {
      return null;
    }
  }

  function handleMediaTypeChange(value) {
    setMediaTypeMovies(value);
  }

  return (
    <>
      <Head>
        <title>Saheds Movie App</title>
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <WatchedTVContext.Provider value={{ handleToggleWatchedTV, watchedTV }}>
          <WatchlistTVContext.Provider
            value={{ handleToggleWatchListTV, watchlistTV }}
          >
            <MediaContext.Provider
              value={{ handleMediaTypeChange, mediaTypeMovies }}
            >
              <WatchedContext.Provider value={{ watched, handleToggleWatched }}>
                <TrendingContext.Provider
                  value={{ dayTrending, trendingMovies, handleTrendingSort }}
                >
                  <CinemaContext.Provider
                    value={{ currentlyInCinemas, upcomingMovies }}
                  >
                    <WatchlistContext.Provider
                      value={{ handleToggleWatchList, watchlist }}
                    >
                      <DataContext.Provider
                        value={{
                          search,
                          resultsPage,
                          resetResultsPage,
                          totalSearchResults,
                          totalSearchPages,
                          handleNextPage,
                          handlePrevPage,
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
            </MediaContext.Provider>
          </WatchlistTVContext.Provider>
        </WatchedTVContext.Provider>
      </ThemeProvider>
    </>
  );
}
