import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext } from "react";
import { WatchlistContext, WatchlistTVContext } from "../_app";
import { useRouter } from "next/router";
import PushButton from "../../components/PushButton";
import MovieDetailFooter from "../../components/MovieDetailFooter";
import Navigation from "../../components/Navigation";
import TVDetail from "../../components/TVDetail";
import TVDetailFooter from "../../components/TVDetailFooter";

export default function MovieDetailPage() {
  const { watchlist } = useContext(WatchlistContext);
  const { watchlistTV } = useContext(WatchlistTVContext);

  const router = useRouter();

  const currentMovie =
    watchlist.find((movie) => movie.id.toString() === router.query.id) ||
    watchlistTV.find((movie) => movie.id.toString() === router.query.id);

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
      {watchlist.includes(currentMovie) ? (
        <>
          <MovieDetail movie={currentMovie} />
          <MovieDetailFooter movie={currentMovie} />
        </>
      ) : (
        <>
          <TVDetail movie={currentMovie} />
          <TVDetailFooter movie={currentMovie} />
        </>
      )}
    </main>
  );
}
