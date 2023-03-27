import React from "react";
import Image from "next/image";
import styled from "styled-components";

export default function MovieGrid({ movie }) {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      alt={movie.title}
      width={120}
      height={160}
    />
  );
}
