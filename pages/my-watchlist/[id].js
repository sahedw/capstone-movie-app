import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext } from "react";
import { WatchlistContext } from "../_app";
import { useRouter } from "next/router";
import PushButton from "../../components/PushButton";
import Navigation from "../../components/Navigation";

export default function MovieDetailPage() {
  const { watchlist } = useContext(WatchlistContext);

  const router = useRouter();

  const currentMovie = watchlist.find(
    (movie) => movie.id.toString() === router.query.id
  );

  if (!currentMovie)
    return (
      <main>
        <PushButton />
        <h1>{`We're quite sorry about this!`}</h1>
        <p>{`The movie id '${router.query.id}' seems to be not in your watchlist.`}</p>
        <Navigation />
      </main>
    );

  return (
    <main>
      <MovieDetail movie={currentMovie} />
      <Navigation />
    </main>
  );
}
