import React from "react";
import { DataContext } from "../../pages/_app";
import getGenreFrom from "../../utils/getGenreFrom";
import calculateRuntimeFrom from "../../utils/calculateRuntimeFrom";
import { useState, useEffect } from "react";
import getPopularityDecimal from "../../utils/getPopularityDecimal";
import PushButton from "../PushButton";
import showWatchProviders from "../../utils/showWatchProviders";
import Actors from "../Actors";
import { useContext } from "react";
import {
  DetailHeaderContainer,
  DetailPosterContainer,
  DetailHeaderTitle,
  DetailHeaderText,
  DetailAvailability,
  Trailer,
  DetailAvailabilityText,
  DetailAvailabilityHeading,
  TrailerContainer,
  DetailSynopsisText,
  DetailSynopsisHeader,
  TrailerButton,
  DetailSynopsis,
  DetailPoster,
  DetailPageDescriptionText,
  DetailPageDescription,
} from "../Styled Components/DetailPage";
import useSWRFetch from "../../hooks/useSWRfetch";

export default function MovieDetail({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const { availabilityOption, theme } = useContext(DataContext);

  const { data: movieDetails } = useSWRFetch(
    `/api/themoviedb/movie/${movie.id}?&language=eng-US`
  );

  const { data: watchProvider } = useSWRFetch(
    `/api/themoviedb/movie/${movie.id}/watch/providers?`
  );

  const { data: castActors } = useSWRFetch(
    `/api/themoviedb/movie/${movie.id}/credits?`
  );

  const { data: youtubeKey } = useSWRFetch(
    `/api/themoviedb/movie/${movie.id}/videos?&language=en-US`
  );

  const shownActors = castActors?.cast.slice(0, 4);
  const trailer = youtubeKey?.results?.find(
    (videoObject) => videoObject.type === "Trailer"
  );
  const streamingProviderFlatrate = watchProvider?.results.DE.flatrate;
  const streamingProviderBuy = watchProvider?.results.DE.buy;
  const streamingProviderRent = watchProvider?.results.DE.rent;

  function displayTrailer() {
    setShowTrailer(!showTrailer);
  }

  return (
    <>
      <PushButton />
      <DetailPageDescription>
        <DetailPageDescriptionText>Movie Details</DetailPageDescriptionText>
      </DetailPageDescription>
      <DetailPosterContainer>
        <DetailPoster
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt={movie?.title}
          width={202.5}
          height={300}
        />
      </DetailPosterContainer>
      <DetailHeaderContainer>
        <DetailHeaderTitle>{movie?.title}</DetailHeaderTitle>
        <DetailHeaderText>
          {getPopularityDecimal(movieDetails?.vote_average)}/10 Rating
        </DetailHeaderText>
        <DetailHeaderText>
          {getGenreFrom(movie)} • {movie.release_date.slice(0, 4)} •{" "}
          {calculateRuntimeFrom(movieDetails?.runtime)}
        </DetailHeaderText>
      </DetailHeaderContainer>
      <DetailSynopsis>
        <TrailerButton color={theme} onClick={displayTrailer}>
          {showTrailer ? "Hide the trailer" : "Watch the trailer"}
        </TrailerButton>
        <TrailerContainer>
          {showTrailer ? (
            <Trailer
              controls={true}
              volume={0.2}
              width={300}
              height={200}
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
            />
          ) : null}
        </TrailerContainer>
        <DetailSynopsisHeader>Synopsis:</DetailSynopsisHeader>
        <DetailSynopsisText>{movie?.overview}</DetailSynopsisText>
      </DetailSynopsis>
      <Actors actors={shownActors} />
      <DetailAvailability>
        <h4>Availability:</h4>
        {availabilityOption === "all" && (
          <>
            <DetailAvailabilityHeading>Flatrate</DetailAvailabilityHeading>
            <DetailAvailabilityText>{`${showWatchProviders(
              streamingProviderFlatrate
            )}`}</DetailAvailabilityText>
            <DetailAvailabilityHeading>Renting</DetailAvailabilityHeading>
            <DetailAvailabilityText>
              {`${showWatchProviders(streamingProviderRent)}`}
            </DetailAvailabilityText>
            <DetailAvailabilityHeading>Purchase </DetailAvailabilityHeading>
            <DetailAvailabilityText>{`${showWatchProviders(
              streamingProviderBuy
            )}`}</DetailAvailabilityText>
          </>
        )}
        {availabilityOption === "flatrate" && (
          <p>Flatrate {`${showWatchProviders(streamingProviderFlatrate)}`}</p>
        )}
        {availabilityOption === "rent" && (
          <p>Renting {`${showWatchProviders(streamingProviderRent)}`}</p>
        )}

        {availabilityOption === "purchase" && (
          <p>Purchase: {`${showWatchProviders(streamingProviderBuy)}`}</p>
        )}
      </DetailAvailability>
    </>
  );
}
