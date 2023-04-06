import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import calculateRuntimeFrom from "../../utils/calculateRuntimeFrom";
import getGenreFrom from "../../utils/getGenreFrom";
import { DataContext } from "../../pages/_app";
import { useContext } from "react";
import {
  OverviewWrapper,
  OverviewPosterContainer,
  OverviewPoster,
  OverviewTextContainer,
  OverviewHeader,
  OverviewText,
} from "../Styled Components/QuickOverview";

export default function TV({ movie }) {
  const { theme } = useContext(DataContext);
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/themoviedb/tv/${movie.id}?&language=eng-US`
        );
        if (response.ok) {
          const data = await response.json();
          setRuntime(data.episode_run_time);
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
      <OverviewWrapper>
        <OverviewPosterContainer>
          <OverviewPoster
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.name}
            width={135}
            height={200}
          />
        </OverviewPosterContainer>
        <OverviewTextContainer>
          <OverviewHeader color={theme}>
            {movie?.name} - <em>{movie?.first_air_date?.slice(0, 4)}</em>
          </OverviewHeader>
          <OverviewText>{getGenreFrom(movie)}</OverviewText>
          {runtime ? (
            <OverviewText>{calculateRuntimeFrom(runtime)}</OverviewText>
          ) : (
            <p>Loading...</p>
          )}
        </OverviewTextContainer>
      </OverviewWrapper>
    </>
  );
}
