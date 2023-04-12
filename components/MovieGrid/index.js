import React from "react";
import Image from "next/image";
import styled from "styled-components";
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
  border-radius: 10px;
  animation: ${fadeInFromBottomImage} 0.7s ease-in-out;
  &:hover {
    transform: scale(1.05);
    border: 1px solid #f97b7b;
    cursor: pointer;
  }
`;

export default function MovieGrid({ movie }) {
  return (
    <StyledImage
      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      alt={movie.title}
      width={100}
      height={145}
    />
  );
}
