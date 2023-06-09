import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { keyframes } from "styled-components";

export const fadeInFromBottomImage = keyframes`
    0% {
    opacity: 0;
    transform: translateY(20px);
  }
    100% {
      opacity: 1;
      transform: translateY(0);
  }
`;
const StyledImage = styled(Image)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 10px;
  animation: ${fadeInFromBottomImage} 0.7s ease-in-out;
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
