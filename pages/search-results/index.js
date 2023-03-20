import React from "react";
import Movie from "../../components/Movie";
import BackButton from "../../components/BackButton";

export default function SearchResultsPage() {
  return (
    <>
      <BackButton />
      <h2>Your search results:</h2>
      <Movie />
    </>
  );
}
