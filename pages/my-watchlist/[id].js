import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext } from "react";
import { WatchedContext } from "../_app";

import { useRouter } from "next/router";
import BackButton from "../../components/PushButton";

export default function MovieDetailPage() {
  const { watchedList } = useContext(WatchedContext);

  const router = useRouter();

  const currentMovie = watchedList.find(
    (movie) => movie.id.toString() === router.query.id
  );

  if (!currentMovie)
    return (
      <>
        <BackButton name={"Back to Watchlist"} route={"/my-watchlist"} />
        <h1>{`We're quite sorry about this!`}</h1>
        <p>{`The movie id ${router.query.id} seems to be not in your watchlist.`}</p>
      </>
    );

  return (
    <>
      <MovieDetail movie={currentMovie} />
    </>
  );
}
