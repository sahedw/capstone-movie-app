import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import calculateRuntimeFrom from "../../utils/calculateRuntimeFrom";
import getGenreFrom from "../../utils/getGenreFrom";

const StyledDiv = styled.div`
  height: 200px;
  width: 135px;
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
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US`
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
  }, [movie?.id]);

  return (
    <>
      <StyledSection>
        <StyledDiv>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
            width={135}
            height={200}
          />
        </StyledDiv>
        <section>
          <h5>
            {movie?.title} - {movie?.release_date.slice(0, 4)}
          </h5>
          <p>{getGenreFrom(movie)}</p>
          {runtime ? <p>{calculateRuntimeFrom(runtime)}</p> : <p>Loading...</p>}
        </section>
      </StyledSection>
    </>
  );
}
