import React from "react";
import Image from "next/image";
import styled from "styled-components";
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
import useSWRFetch from "../../hooks/useSWRfetch";

export default function Movie({ movie }) {
  const { theme } = useContext(DataContext);
  const { data } = useSWRFetch(
    `/api/themoviedb/movie/${movie.id}?&language=eng-US`
  );

  return (
    <>
      <OverviewWrapper>
        <OverviewPosterContainer>
          <OverviewPoster
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
            width={135}
            height={200}
          />
        </OverviewPosterContainer>
        <OverviewTextContainer>
          <OverviewHeader color={theme}>
            {movie?.title} - <em>{movie?.release_date?.slice(0, 4)}</em>
          </OverviewHeader>
          <OverviewText>{getGenreFrom(movie)}</OverviewText>
          {data?.runtime ? (
            <OverviewText>{calculateRuntimeFrom(data?.runtime)}</OverviewText>
          ) : (
            <p>no data</p>
          )}
        </OverviewTextContainer>
      </OverviewWrapper>
    </>
  );
}
