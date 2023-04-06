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
import { DetailHeaderContainer } from "../Styled Components/DetailPage";
import { DetailPageDescription } from "../Styled Components/DetailPage";
import { DetailPageDescriptionText } from "../Styled Components/DetailPage";
import { DetailPosterContainer } from "../Styled Components/DetailPage";
import { DetailPoster } from "../Styled Components/DetailPage";
import { DetailHeaderTitle } from "../Styled Components/DetailPage";
import { DetailHeaderText } from "../Styled Components/DetailPage";
import { DetailSynopsis } from "../Styled Components/DetailPage";
import { TrailerButton } from "../Styled Components/DetailPage";
import { TrailerContainer } from "../Styled Components/DetailPage";
import { DetailSynopsisHeader } from "../Styled Components/DetailPage";
import { DetailSynopsisText } from "../Styled Components/DetailPage";
import { DetailAvailability } from "../Styled Components/DetailPage";
import { DetailAvailabilityHeading } from "../Styled Components/DetailPage";
import { DetailAvailabilityText } from "../Styled Components/DetailPage";
import { Trailer } from "../Styled Components/DetailPage";

export default function MovieDetail({ movie }) {
  const [runtime, setRuntime] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchProvider, setWatchProvider] = useState("");
  const [castActors, setCastActors] = useState("");
  const [youtubeKey, setYoutubeKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const { availabilityOption, theme } = useContext(DataContext);

  const shownActors = castActors.slice(0, 4);
  const trailer = youtubeKey?.results?.find(
    (videoObject) => videoObject.type === "Trailer"
  );
  const streamingProviderFlatrate = watchProvider?.flatrate;
  const streamingProviderBuy = watchProvider?.buy;
  const streamingProviderRent = watchProvider?.rent;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/themoviedb/movie/${movie.id}?&language=eng-US`
        );
        if (response.ok) {
          const data = await response.json();
          setRuntime(data.runtime);
          setMovieDetails(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/themoviedb/movie/${movie.id}/watch/providers?`
        );
        if (response.ok) {
          const data = await response.json();
          setWatchProvider(data.results.DE);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/themoviedb/movie/${movie.id}/credits?`
        );
        if (response.ok) {
          const data = await response.json();
          setCastActors(data.cast);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/themoviedb/movie/${movie.id}/videos?&language=en-US`
        );
        if (response.ok) {
          const data = await response.json();
          setYoutubeKey(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

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
          {calculateRuntimeFrom(runtime)}
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
