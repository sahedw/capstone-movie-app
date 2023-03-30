import React from "react";
import { useContext } from "react";
import { WatchlistContext } from "../_app";
import Movie from "../../components/Movie";
import MovieGrid from "../../components/MovieGrid";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Navigation from "../../components/Navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function MyWatchlistPage() {
  const [listLayout, setListLayout] = useState(true);
  const { watchlist } = useContext(WatchlistContext);

  function setLayoutType(boolean) {
    setListLayout(boolean);
  }

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
      <button
        onClick={() => {
          setLayoutType(true);
        }}
        disabled={listLayout ? true : false}
      >
        List
      </button>
      <button
        onClick={() => {
          setLayoutType(false);
        }}
        disabled={listLayout ? false : true}
      >
        Grid
      </button>
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
