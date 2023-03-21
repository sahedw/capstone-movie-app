import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import handleRuntimeConversion from "../../utils/handleRuntimeConversion";
import getRenderGenres from "../../utils/getRenderGenres";

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
  }, []);

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
          <p>{getRenderGenres(movie)}</p>
          <p>{handleRuntimeConversion(runtime)}</p>
        </section>
      </StyledSection>
    </>
  );
}
