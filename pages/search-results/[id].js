import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext } from "react";
import { DataContext, MediaContext } from "../_app";
import { useRouter } from "next/router";
import BackButton from "../../components/PushButton";
import MovieDetailFooter from "../../components/MovieDetailFooter";
import Navigation from "../../components/Navigation";
import TVDetail from "../../components/TVDetail";

export default function MovieDetailPage() {
  const { movies } = useContext(DataContext);
  const { mediaTypeMovies } = useContext(MediaContext);

  const router = useRouter();

  const currentMovie = movies?.find(
    (movie) => movie.id.toString() === router.query.id
  );

  if (!currentMovie)
    return (
      <main>
        <BackButton />
        <h1>{`We're quite sorry about this!`}</h1>
        <p>{`The movie id ${router.query.id} seems to be not in out database.`}</p>
        <Navigation />
      </main>
    );

  return (
    <main>
      {mediaTypeMovies === "movie" ? (
        <>
          <MovieDetail movie={currentMovie} />
          <MovieDetailFooter movie={currentMovie} />{" "}
        </>
      ) : (
        <TVDetail movie={currentMovie} />
      )}
    </main>
  );
}
