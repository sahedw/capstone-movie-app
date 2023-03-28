import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledImage = styled(Image)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 10px;
  margin-top: 40px;
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
            width={120}
            height={175}
          />
        );
      })}
    </StyledDiv>
  );
}
