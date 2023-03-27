import React from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;

export default function CinemaPage() {
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

  return (
    <main>
      <h2>Currently in cinemas:</h2>
      {movies.map((movie) => (
        <StyledLink key={movie.id} href={`search-results/${movie.id}`}>
          <Movie movie={movie} />
        </StyledLink>
      ))}
      <Navigation />
    </main>
  );
}
