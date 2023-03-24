import React from "react";
import { useContext } from "react";
import { WatchlistContext } from "../_app";
import Movie from "../../components/Movie";
import styled from "styled-components";
import Link from "next/link";
import PushButton from "../../components/PushButton";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function MyWatchlistPage() {
  const { watchlist } = useContext(WatchlistContext);

  const router = useRouter();

  console.log(router.asPath.toString());

  if (watchlist.length === 0)
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
        {watchlist.map((movie) => {
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
