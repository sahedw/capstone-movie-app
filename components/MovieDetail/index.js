import React from "react";
import Image from "next/image";
import {
  WatchlistContext,
  WatchedContext,
  DataContext,
  TrendingContext,
} from "../../pages/_app";
import getGenreFrom from "../../utils/getGenreFrom";
import calculateRuntimeFrom from "../../utils/calculateRuntimeFrom";
import { useState, useEffect } from "react";
import getPopularityDecimal from "../../utils/getPopularityDecimal";
import PushButton from "../PushButton";
import showWatchProviders from "../../utils/showWatchProviders";
import Actors from "../Actors";
import { useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactPlayer from "react-player";
import getIconForTheme from "../../utils/getIconForTheme";

const StyledSectionHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeaderMovieDetails = styled.h4`
  margin: 15px;
  margin-top: 0;
`;

const StyledSectionButtons = styled.section`
  display: flex;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
`;

const StyledShowTrailerButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  border: none;
  margin-bottom: 15px;
  cursor: pointer;
`;

const StyledPoster = styled(Image)`
  border-radius: 30px;
`;

const StyledSectionPoster = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledSectionQuickOverview = styled.section`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMovieTitle = styled.h2`
  margin: 5px;
`;

const StyledMovieSubtitles = styled.p`
  color: grey;
  margin: 5px;
`;

const StyledSynopsisText = styled.p`
  color: grey;
`;

const StyledSectionSynopsis = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledHeaderSynopsis = styled.h4`
  align-self: flex-start;
  margin: 0;
`;

const StyledTrailer = styled(ReactPlayer)`
  margin-bottom: 15px;
  align-self: flex-start;
`;

const StyledSectionTrailer = styled.section`
  align-self: center;
`;

const StyledSectionAvailability = styled.section`
  padding-left: 15px;
`;

export default function MovieDetail({ movie }) {
  const [runtime, setRuntime] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchProvider, setWatchProvider] = useState("");
  const [castActors, setCastActors] = useState("");
  const [youtubeKey, setYoutubeKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const { availabilityOption, theme } = useContext(DataContext);
  const { handleToggleWatchList, watchlist } = useContext(WatchlistContext);
  const { watched, handleToggleWatched } = useContext(WatchedContext);
  const { trendingMovies } = useContext(TrendingContext);

  const shownActors = castActors.slice(0, 4);
  const router = useRouter();
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

  function handleRemoveInWatchlistPage(movie) {
    if (router.asPath.includes("my-watchlist")) {
      handleToggleWatchList(movie);
      router.push("/my-watchlist");
    } else if (
      trendingMovies.find((trendingMovie) => trendingMovie.id === movie.id)
    ) {
      handleToggleWatchList(movie);
    } else if (movie.id.toString().length === router.asPath.length - 1) {
      handleToggleWatchList(movie);
      router.push("/");
    } else {
      handleToggleWatchList(movie);
    }
  }

  function handleRemoveInWatchedPage(movie) {
    if (router.asPath.includes("my-watched")) {
      handleToggleWatched(movie);
      router.push("/my-watched");
    } else {
      handleToggleWatched(movie);
    }
  }

  function displayTrailer() {
    setShowTrailer(!showTrailer);
  }

  return (
    <>
      <PushButton />
      <StyledSectionHeader>
        <StyledHeaderMovieDetails>Movie Details</StyledHeaderMovieDetails>
      </StyledSectionHeader>
      <section>
        <StyledSectionPoster>
          <StyledPoster
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            width={202.5}
            height={300}
          />
        </StyledSectionPoster>
      </section>
      <StyledSectionQuickOverview>
        <StyledMovieTitle>{movie.title}</StyledMovieTitle>
        <StyledMovieSubtitles>
          {getPopularityDecimal(movieDetails?.vote_average)}/10 Rating
        </StyledMovieSubtitles>
        <StyledMovieSubtitles>
          {getGenreFrom(movie)} - {movie.release_date.slice(0, 4)} -{" "}
          {calculateRuntimeFrom(runtime)}
        </StyledMovieSubtitles>
      </StyledSectionQuickOverview>
      <StyledSectionSynopsis>
        {" "}
        <StyledShowTrailerButton color={theme} onClick={displayTrailer}>
          {showTrailer ? "Hide the trailer" : "Watch the trailer"}
        </StyledShowTrailerButton>
        <StyledSectionTrailer>
          {showTrailer ? (
            <StyledTrailer
              controls={true}
              volume={0.2}
              width={300}
              height={200}
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
            />
          ) : null}
        </StyledSectionTrailer>
        <StyledHeaderSynopsis>Synopsis:</StyledHeaderSynopsis>
        <StyledSynopsisText>{movie.overview}</StyledSynopsisText>
      </StyledSectionSynopsis>

      <Actors actors={shownActors} />
      <StyledSectionAvailability>
        <h4>Availability:</h4>
        {availabilityOption === "all" && (
          <>
            {" "}
            <p>
              Flatrate: {`${showWatchProviders(streamingProviderFlatrate)}`}
            </p>
            <p>Renting: {`${showWatchProviders(streamingProviderRent)}`}</p>
            <p>
              Purchase: {`${showWatchProviders(streamingProviderBuy)}`}
            </p>{" "}
          </>
        )}
        {availabilityOption === "flatrate" && (
          <p>Flatrate: {`${showWatchProviders(streamingProviderFlatrate)}`}</p>
        )}
        {availabilityOption === "rent" && (
          <p>Renting: {`${showWatchProviders(streamingProviderRent)}`}</p>
        )}

        {availabilityOption === "purchase" && (
          <p>Purchase: {`${showWatchProviders(streamingProviderBuy)}`}</p>
        )}
      </StyledSectionAvailability>

      <StyledSectionButtons>
        <StyledButton
          onClick={() => {
            handleRemoveInWatchlistPage(movie);
          }}
        >
          {JSON.stringify(watchlist).includes(JSON.stringify(movie)) ? (
            <>
              <Image
                alt={"in-watchlist"}
                src={`/in-watchlist${getIconForTheme(theme)}.png`}
                width={40}
                height={40}
              />{" "}
            </>
          ) : (
            <>
              <Image
                alt={"not-in-watchlist"}
                src={`/not-in-watchlist${getIconForTheme(theme)}.png`}
                width={39}
                height={39}
              />
            </>
          )}
        </StyledButton>

        <StyledButton
          onClick={() => {
            handleRemoveInWatchedPage(movie);
          }}
        >
          {JSON.stringify(watched).includes(JSON.stringify(movie)) ? (
            <>
              <Image
                alt={"in-watched"}
                src={`/in-watched${getIconForTheme(theme)}.png`}
                width={40}
                height={40}
              />
            </>
          ) : (
            <>
              <Image
                alt={"not-in-watched"}
                src={`/not-in-watched${getIconForTheme(theme)}.png`}
                width={40}
                height={40}
              />
            </>
          )}
        </StyledButton>
      </StyledSectionButtons>
    </>
  );
}
