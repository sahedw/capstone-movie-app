import React from "react";
import Image from "next/image";
import { WatchedContext } from "../../pages/_app";
import getGenreFrom from "../../utils/getGenreFrom";
import calculateRuntimeFrom from "../../utils/calculateRuntimeFrom";
import { useState, useEffect } from "react";
import getPopularityDecimal from "../../utils/getPopularityDecimal";
import PushButton from "../PushButton";
import showWatchProviders from "../../utils/showWatchProviders";
import Actors from "../Actors";
import { useContext } from "react";

export default function MovieDetail({ movie }) {
  const [runtime, setRuntime] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchProvider, setWatchProvider] = useState("");
  const [castActors, setCastActors] = useState("");
  const { handleToggleWatchList, watchedList } = useContext(WatchedContext);

  const streamingProvider = watchProvider?.flatrate;
  const shownActors = castActors.slice(0, 4);

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

  console.log(watchedList);

  return (
    <>
      <PushButton name={"Back to search"} route={"/search-results"} />
      <br />
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        width={202.5}
        height={300}
      />
      <br />
      <button
        onClick={() => {
          handleToggleWatchList(movie);
        }}
      >
        {JSON.stringify(watchedList).includes(JSON.stringify(movie))
          ? "Remove from Watchlist"
          : "Add to Watchlist"}
      </button>
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
      <p>{`${showWatchProviders(streamingProvider)}`}</p>
    </>
  );
}
