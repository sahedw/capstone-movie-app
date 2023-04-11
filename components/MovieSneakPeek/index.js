import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { LoadingSpinner } from "../Styled Components/LoadingSpinner";

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
  if (!movies) return <LoadingSpinner />;

  return (
    <StyledDiv>
      {movies?.map((movie) => {
        return (
          <Link key={movie.id} href={`/${movie.id}`}>
            <StyledImage
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              width={100}
              height={150}
            />
          </Link>
        );
      })}
    </StyledDiv>
  );
}
