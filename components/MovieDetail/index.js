import React from "react";
import Image from "next/image";

export default function MovieDetail({ movie }) {
  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        width={202.5}
        height={300}
      />
    </>
  );
}
