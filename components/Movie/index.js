import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import calculateRuntimeFrom from "../../utils/calculateRuntimeFrom";
import getGenreFrom from "../../utils/getGenreFrom";
import { useFetch } from "../../hooks/useFetch";
import { DataContext } from "../../pages/_app";
import { useContext } from "react";

const StyledDiv = styled.div`
  height: 200px;
  width: 120px;
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  transition: 0.3s ease-out;

  :hover {
    transform: translateY(-10px);
  }
`;

const StyledSectionText = styled.section`
  width: 200px;
  margin-left: 20px;
  padding-left: 10px;
`;

const StyledParagraph = styled.p`
  color: gray;
`;

const StyledImage = styled(Image)`
  border-radius: 15px;
`;

const StyledHeader = styled.h4`
  color: ${(props) => props.theme.fontColor};
`;

export default function Movie({ movie }) {
  const { theme } = useContext(DataContext);
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
          <StyledImage
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
            width={135}
            height={200}
          />
        </StyledDiv>
        <StyledSectionText>
          <StyledHeader color={theme}>
            {movie?.title} - <em>{movie?.release_date.slice(0, 4)}</em>
          </StyledHeader>
          <StyledParagraph>{getGenreFrom(movie)}</StyledParagraph>
          {runtime ? (
            <StyledParagraph>{calculateRuntimeFrom(runtime)}</StyledParagraph>
          ) : (
            <p>Loading...</p>
          )}
        </StyledSectionText>
      </StyledSection>
    </>
  );
}
