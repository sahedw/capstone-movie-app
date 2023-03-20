import React from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Image from "next/image";
import styled from "styled-components";
import genres from "../../pages/api/genres";

const StyledDiv = styled.div`
  height: 180px;
  width: 130px;
`;

/* The lightgray background is temporarily used for display purposes.
Will be changed in the future. */

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default function Movie() {
  const { movies } = useContext(DataContext);

  function findGenre(id) {
    const targetGenre = genres.find((genre) => genre.id === id);
    return targetGenre;
  }

  const originalMovie = movies[0].release_date;
  console.log(originalMovie.slice(0, 4));

  return (
    <>
      {movies.map((movie) => {
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
                {movie.title} - {originalMovie.slice(0, 4)}
              </h5>
              {movie.genre_ids[1] ? (
                <>
                  <p>
                    {findGenre(movie.genre_ids[0]).name},{" "}
                    {findGenre(movie.genre_ids[1]).name}
                  </p>
                </>
              ) : (
                <p>{findGenre(movie.genre_ids[0]).name}</p>
              )}
            </section>
          </StyledSection>
        );
      })}
    </>
  );
}
