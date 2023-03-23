import React from "react";
import { useContext } from "react";
import { WatchedContext } from "../_app";
import Movie from "../../components/Movie";
import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function MyWatchlistPage() {
  const { watchedList } = useContext(WatchedContext);

  return (
    <>
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
    </>
  );
}
