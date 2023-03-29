import React from "react";
import { useContext } from "react";
import { WatchedContext } from "../_app";
import Movie from "../../components/Movie";
import styled from "styled-components";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function MyWatchedPage() {
  const { watched } = useContext(WatchedContext);

  if (watched.length === 0)
    return (
      <main>
        <h2>Nothing to 👀 here.</h2>
        <p>Why dont you add some? </p>
        <Navigation />
      </main>
    );

  return (
    <main>
      <h2>My Watched:</h2>
      <section>
        {watched.map((movie) => {
          return (
            <StyledLink key={movie.id} href={`my-watched/${movie.id}`}>
              <Movie movie={movie} />
            </StyledLink>
          );
        })}
      </section>
      <Navigation />
    </main>
  );
}
