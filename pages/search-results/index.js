import React, { useContext } from "react";
import Movie from "../../components/Movie";
import BackButton from "../../components/BackButton";
import { DataContext } from "../_app";

export default function SearchResultsPage() {
  const { movies } = useContext(DataContext);
  return (
    <>
      <BackButton />
      <h2>Your search results:</h2>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </>
  );
}
