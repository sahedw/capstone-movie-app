import React from "react";
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

export default function Movie({ movie }) {
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=657b6c5e2a2ab2cafa267e54252ca1a7&language=eng-US`
        );
        if (response.ok) {
          const data = await response.json();
          setRuntime(data.runtime);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

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

  function handleRuntimeConversion(runtime) {
    if (runtime >= 180) {
      const remaining = runtime % 180;
      return `3h ${remaining}m`;
    } else if (runtime <= 170 && runtime >= 121) {
      const remaining = runtime % 120;
      return `2h ${remaining}m`;
    } else {
      if (runtime <= 120 && runtime >= 61) {
        const remaining = runtime % 60;
        return `1h ${remaining}m`;
      } else if (runtime <= 60 && runtime > 0) {
        return `${runtime}m`;
      } else {
        return "no data";
      }
    }
  }

  return (
    <>
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
          <p>{handleRuntimeConversion(runtime)}</p>
        </section>
      </StyledSection>
    </>
  );
}
