import React from "react";
import { useContext } from "react";
import { WatchlistContext } from "../_app";
import Movie from "../../components/Movie";
import MovieGrid from "../../components/MovieGrid";

import styled from "styled-components";
import Link from "next/link";
import Navigation from "../../components/Navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function MyWatchlistPage() {
  const { watchlist } = useContext(WatchlistContext);

  if (watchlist.length === 0)
    return (
      <main>
        <h2>Nothing to 👀 here.</h2>
        <p>Why dont you add some? </p>
        <Navigation />
      </main>
    );

  return (
    <main>
      <h2>My Watchlist ({watchlist.length}):</h2>
      <section>
        {watchlist.map((movie) => {
          return (
            <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
              <Movie movie={movie} />
            </StyledLink>
          );
        })}
      </section>
      <section>
        {watchlist.map((movie) => {
          return (
            <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
              <MovieGrid movie={movie} />
            </StyledLink>
          );
        })}
      </section>
      <Navigation />
    </main>
  );
}
