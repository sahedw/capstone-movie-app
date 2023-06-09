import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext } from "react";
import { CinemaContext } from "../_app";
import { useRouter } from "next/router";
import PushButton from "../../components/PushButton";
import MovieDetailFooter from "../../components/MovieDetailFooter";
import Navigation from "../../components/Navigation";

export default function MovieDetailPage() {
  const { currentlyInCinemas, upcomingMovies } = useContext(CinemaContext);

  const router = useRouter();

  function getCinemaMovie() {
    const inCinemaMovie = currentlyInCinemas?.find(
      (movie) => movie.id.toString() === router.query.id
    );
    return (
      inCinemaMovie ||
      upcomingMovies?.find((movie) => movie.id.toString() === router.query.id)
    );
  }

  const currentMovie = getCinemaMovie();

  if (!currentMovie)
    return (
      <main>
        <PushButton />
        <h1>{`We're quite sorry about this!`}</h1>
        <p>{`The movie id '${router.query.id}' seems to be not in cinema currently.`}</p>
        <Navigation />
      </main>
    );

  return (
    <main>
      <MovieDetail movie={currentMovie} />
      <MovieDetailFooter movie={currentMovie} />
    </main>
  );
}
