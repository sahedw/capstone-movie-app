import React from "react";
import Image from "next/image";
import { WatchlistContext, WatchedContext } from "../../pages/_app";
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
import { useFetch } from "../../hooks/useFetch";

const StyledSectionHeader = styled.section`
  display: flex;
  justify-content: center;
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
  border: none;
`;

export default function MovieDetail({ movie }) {
  const [runtime, setRuntime] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchProvider, setWatchProvider] = useState("");
  const [castActors, setCastActors] = useState("");
  const [youtubeKey, setYoutubeKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const { handleToggleWatchList, watchlist } = useContext(WatchlistContext);
  const { watched, handleToggleWatched } = useContext(WatchedContext);

  const shownActors = castActors.slice(0, 4);
  const router = useRouter();
  const trailer = youtubeKey?.results?.find(
    (videoObject) => videoObject.type === "Trailer"
  );
  const streamingProviderFlatrate = watchProvider?.flatrate;
  const streamingProviderBuy = watchProvider?.buy;
  const streamingProviderRent = watchProvider?.rent;

  console.log(watchProvider);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US`
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
          `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
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
        {" "}
        <h3>Movie Details</h3>
      </StyledSectionHeader>
      <section>
        <section>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            width={202.5}
            height={300}
          />
        </section>
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
                  src={"/in-watchlist.png"}
                  width={40}
                  height={40}
                />{" "}
              </>
            ) : (
              <>
                <Image
                  alt={"not-in-watchlist"}
                  src={"/not-in-watchlist.png"}
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
                  src={"/in-watched.png"}
                  width={40}
                  height={40}
                />
              </>
            ) : (
              <>
                <Image
                  alt={"not-in-watched"}
                  src={"/not-in-watched.png"}
                  width={40}
                  height={40}
                />
              </>
            )}
          </StyledButton>
        </StyledSectionButtons>
      </section>
      <StyledShowTrailerButton onClick={displayTrailer}>
        {showTrailer ? "Hide the trailer" : "Watch the trailer"}
      </StyledShowTrailerButton>
      <section>
        {showTrailer ? (
          <ReactPlayer
            controls={true}
            volume={0.2}
            width={300}
            height={200}
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
          />
        ) : null}
      </section>

      {/* Currently votes from the community of the api. In the 
        future trying to use the IMDB vote. */}
      <p>{getPopularityDecimal(movieDetails?.vote_average)}/10 Rating</p>
      <p>{getGenreFrom(movie)}</p>
      <h2>
        {movie.title} - {movie.release_date.slice(0, 4)}
      </h2>
      <p>{calculateRuntimeFrom(runtime)}</p>
      <p>{movie.overview}</p>
      {/* Currently only able to show where a movie can be streamed with a flatrate.
      The api also is able to show where its rentable or buyable.
      For future features also display these informations */}
      <Actors actors={shownActors} />
      <h3>Availability:</h3>
      <p>Flatrate: {`${showWatchProviders(streamingProviderFlatrate)}`}</p>
      <p>Renting: {`${showWatchProviders(streamingProviderRent)}`}</p>
      <p>Purchase: {`${showWatchProviders(streamingProviderBuy)}`}</p>
    </>
  );
}
