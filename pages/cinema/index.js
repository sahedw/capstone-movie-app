import React from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import MovieGrid from "../../components/MovieGrid";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 10px;
`;

const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;

export default function CinemaPage() {
  const [currentlyInCinemas, setCurrentlyInCinemas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
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

  return (
    <main>
      <h2>Currently in cinemas:</h2>
      <StyledDiv>
        {currentlyInCinemas.map((movie) => (
          <StyledLink key={movie.id} href={`search-results/${movie.id}`}>
            <MovieGrid movie={movie} />
          </StyledLink>
        ))}
      </StyledDiv>
      <Navigation />
    </main>
  );
}
