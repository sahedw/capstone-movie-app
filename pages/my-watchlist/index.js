import React from "react";
import { useContext } from "react";
import { WatchedContext } from "../_app";
import Movie from "../../components/Movie";
import styled from "styled-components";
import Link from "next/link";
import PushButton from "../../components/PushButton";
import Navigation from "../../components/Navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function MyWatchlistPage() {
  const { watchedList } = useContext(WatchedContext);

  if (watchedList.length === 0)
    return (
      <main>
        <h2>Nothing to 👀 here.</h2>
        <p>Why dont you add some? </p>
        <PushButton name={"Back to Home"} route={"/"} />
        <Navigation />
      </main>
    );

  return (
    <main>
      <h2>My Watchlist:</h2>
      <section>
        {watchedList.map((movie) => {
          return (
            <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
              <Movie movie={movie} />
            </StyledLink>
          );
        })}
      </section>
      <Navigation />
    </main>
  );
}
