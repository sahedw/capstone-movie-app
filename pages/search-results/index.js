import React from "react";
import Movie from "../../components/Movie";
import BackButton from "../../components/BackButton";

export default function SearchResultsPage() {
  return (
    <>
      <BackButton />
      <section>
        <h2>Your search results:</h2>
      </section>
      <section>
        <Movie />
      </section>
    </>
  );
}
