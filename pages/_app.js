import GlobalStyle from "../styles";
import Head from "next/head";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const DataContext = createContext();
export const WatchedContext = createContext();

export default function App({ Component, pageProps }) {
  const [movies, setMovies] = useLocalStorageState("newMovies", {
    defaultValue: [],
  });
  const [watchedList, setWatchedList] = useLocalStorageState("newWatched", {
    defaultValue: [],
  });

  function handleAddWatchList(newMovie) {
    setWatchedList([...watchedList, newMovie]);
  }

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

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setSearch(data.search);
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Saheds Movie App</title>
      </Head>
      <WatchedContext.Provider value={{ handleAddWatchList, watchedList }}>
        <DataContext.Provider
          value={{
            DataContext,
            handleFormSubmit,
            movies,
          }}
        >
          <Component {...pageProps} />
        </DataContext.Provider>
      </WatchedContext.Provider>
    </>
  );
}
