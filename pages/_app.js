import GlobalStyle from "../styles";
import Head from "next/head";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const DataContext = createContext();

export default function App({ Component, pageProps }) {
  const [movies, setMovies] = useLocalStorageState("newMovies", {
    defaultValue: [],
  });
  const [search, setSearch] = useState("");

  const url = `https://api.themoviedb.org/3/search/movie?api_key=657b6c5e2a2ab2cafa267e54252ca1a7&language=eng-US&query=${search}`;

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

  const [runtime, setRuntime] = useState("");
  const [movieId, setMovieId] = useState("");

  function handleRuntimeFetch(id) {
    setMovieId(id);
  }

  const urlId = `https://api.themoviedb.org/3/movie/${movieId}?api_key=657b6c5e2a2ab2cafa267e54252ca1a7&language=eng-US`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(urlId);
        if (response.ok) {
          const data = await response.json();
          setRuntime(data.runtime);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, [urlId]);

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
      <DataContext.Provider
        value={{
          handleRuntimeFetch,
          setMovieId,
          runtime,
          DataContext,
          handleFormSubmit,
          movies,
        }}
      >
        <Component {...pageProps} />
      </DataContext.Provider>
    </>
  );
}
