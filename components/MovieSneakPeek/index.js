import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const StyledImage = styled(Image)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 10px;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  margin-top: 10px;
  grid-row-gap: 15px;
`;

export default function MovieSneakPeek({ movies }) {
  return (
    <StyledDiv>
      {movies.map((movie) => {
        return (
          <StyledImage
            key={movie.id}
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            width={100}
            height={150}
          />
        );
      })}
    </StyledDiv>
  );
}
