import { useContext } from "react";
import { useRouter } from "next/router";
import { WatchlistContext } from "./_app";
import PushButton from "../components/PushButton";
import Navigation from "../components/Navigation";
import MovieDetail from "../components/MovieDetail";

export default function MovieDetailPage() {
  const { watchlist } = useContext(WatchlistContext);

  const router = useRouter();

  const currentMovie = watchlist.find(
    (movie) => movie.id.toString() === router.query.id
  );

  if (!currentMovie)
    return (
      <main>
        <PushButton name={"Back to home"} route={"/"} />
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
