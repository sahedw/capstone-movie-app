import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function Form() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const url = `https://api.themoviedb.org/3/search/movie?api_key=657b6c5e2a2ab2cafa267e54252ca1a7&language=de-GER&query=${search}`;

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
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search a movie:</label>
        <input type="text" name="search" id="search" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
