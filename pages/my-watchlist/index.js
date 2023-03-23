import React from "react";
import { useContext } from "react";
import { WatchedContext } from "../_app";
import Movie from "../../components/Movie";

export default function MyWatchlistPage() {
  const { watchedList } = useContext(WatchedContext);

  return (
    <>
      <h2>My Watchlist:</h2>
      <section>
        {watchedList.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </section>
    </>
  );
}
