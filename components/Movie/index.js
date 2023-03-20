import React from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Image from "next/image";
import styled from "styled-components";
import genres from "../../pages/api/genres";
import { useState, useEffect } from "react";

const StyledDiv = styled.div`
  height: 180px;
  width: 130px;
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default function Movie() {
  const { movies, runtime, handleRuntimeFetch } = useContext(DataContext);

  function findGenre(id) {
    const targetGenre = genres.find((genre) => genre.id === id);
    return targetGenre;
  }

  function handleRenderGenres(movie) {
    if (movie.genre_ids[1]) {
      return (
        findGenre(movie.genre_ids[0]).name +
        ", " +
        findGenre(movie.genre_ids[1]).name
      );
    } else if (movie.genre_ids[0]) {
      return findGenre(movie.genre_ids[0]).name;
    } else {
      return "Missing, Genre";
    }
  }

  if (!movies) return <h1>Loading...</h1>;

  return (
    <>
      {movies.map((movie) => {
        handleRuntimeFetch(movie.id);
        return (
          <StyledSection key={movie.id}>
            <StyledDiv>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                width={130}
                height={180}
              />
            </StyledDiv>

            <section>
              <h5>
                {movie.title} - {movie.release_date.slice(0, 4)}
              </h5>
              <p>{handleRenderGenres(movie)}</p>
              <p>{runtime}</p>
            </section>
          </StyledSection>
        );
      })}
    </>
  );
}
