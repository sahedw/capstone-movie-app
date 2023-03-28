import GlobalStyle from "../styles";
import Head from "next/head";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const DataContext = createContext();
export const WatchlistContext = createContext();
export const CinemaContext = createContext();
export const TrendingContext = createContext();

export default function App({ Component, pageProps }) {
  const [movies, setMovies] = useLocalStorageState("newMovies", {
    defaultValue: [],
  });
  const [watchlist, setWatchlist] = useLocalStorageState("newWatchlist", {
    defaultValue: [],
  });

  const [currentlyInCinemas, setCurrentlyInCinemas] = useLocalStorageState(
    "newCinemas",
    {
      defaultValue: [],
    }
  );

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [dayTrending, setDayTrending] = useState(true);

  const [search, setSearch] = useState("");

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US&query=${search}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );
        if (response.ok) {
          const data = await response.json();
          setCurrentlyInCinemas(data.results);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.themoviedb.org/3/trending/movie/${
          dayTrending ? "day" : "week"
        }?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTrendingMovies(data.results);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, [dayTrending]);

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

  function handleTrendingSort(boolean) {
    setDayTrending(boolean);
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Saheds Movie App</title>
      </Head>
      <TrendingContext.Provider
        value={{ dayTrending, trendingMovies, handleTrendingSort }}
      >
        <CinemaContext.Provider value={{ currentlyInCinemas }}>
          <WatchlistContext.Provider
            value={{ handleToggleWatchList, watchlist }}
          >
            <DataContext.Provider
              value={{
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
    </>
  );
}
