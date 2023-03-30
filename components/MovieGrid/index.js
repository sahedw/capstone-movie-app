import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledImage = styled(Image)`
  border-radius: 10px;
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
