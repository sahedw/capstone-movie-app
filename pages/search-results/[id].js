import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext } from "react";
import { DataContext } from "../_app";
import { useRouter } from "next/router";

export default function MovieDetailPage() {
  const { movies } = useContext(DataContext);
  const router = useRouter();

  const currentMovie = movies.find(
    (movie) => movie.id.toString() === router.query.id
  );

  if (!currentMovie)
    return (
      <>
        <h1>We're quite sorry about this!</h1>
        <p>{`The movie id ${router.query.id} seems to be not in out database.`}</p>
      </>
    );

  return (
    <>
      <MovieDetail movie={currentMovie} />
    </>
  );
}
