import React from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { useContext } from "react";
import { CinemaContext } from "../_app";
import MovieGrid from "../../components/MovieGrid";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 10px;
`;

export default function CinemaPage() {
  const { currentlyInCinemas } = useContext(CinemaContext);
  return (
    <main>
      <h2>Currently in cinemas:</h2>
      <StyledDiv>
        {currentlyInCinemas.map((movie) => (
          <StyledLink key={movie.id} href={`cinema/${movie.id}`}>
            <MovieGrid movie={movie} />
          </StyledLink>
        ))}
      </StyledDiv>
      <Navigation />
    </main>
  );
}
