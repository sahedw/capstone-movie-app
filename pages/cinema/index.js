import React from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function CinemaPage() {
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
