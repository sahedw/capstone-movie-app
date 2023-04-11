import React from "react";
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
import useSWR from "swr";

export default function TV({ movie }) {
  const { theme } = useContext(DataContext);

  const { data } = useSWR(`/api/themoviedb/tv/${movie.id}?&language=eng-US`);

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
          {data?.episode_run_time ? (
            <OverviewText>
              {calculateRuntimeFrom(data?.episode_run_time)}
            </OverviewText>
          ) : (
            <p>Loading...</p>
          )}
        </OverviewTextContainer>
      </OverviewWrapper>
    </>
  );
}
