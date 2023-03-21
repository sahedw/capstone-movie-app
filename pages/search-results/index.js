import React, { useContext } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext } from "../_app";

export default function SearchResultsPage() {
  const { movies } = useContext(DataContext);
  return (
    <>
      <PushButton name={"Back to Home"} route={"/"} />
      <h2>Your search results:</h2>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </>
  );
}
