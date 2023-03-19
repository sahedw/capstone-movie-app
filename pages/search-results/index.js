import React from "react";
import Movie from "../../components/Movie";

export default function SearchResultsPage() {
  return (
    <>
      <section>
        <h2>Your search results:</h2>
      </section>
      <section>
        <Movie />
      </section>
    </>
  );
}
