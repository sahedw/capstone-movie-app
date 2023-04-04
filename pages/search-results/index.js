import React, { useContext } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext } from "../_app";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "../../components/Navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function SearchResultsPage() {
  const {
    movies,
    search,
    handleNextPage,
    handlePrevPage,
    resultsPage,
    totalSearchPages,
    totalSearchResults,
  } = useContext(DataContext);

  if (movies?.length === 0)
    return (
      <>
        <PushButton />
        <h2>Whoops, something seems wrong</h2>
        <p>{`The movie '${search}' doesn't seem to exist`}</p>
        <p>{`Please try to go back and search again :)`}</p>
      </>
    );

  return (
    <main>
      <PushButton />
      <h2>{`Your search results (${totalSearchResults}):`}</h2>
      <section>
        {" "}
        <button
          onClick={handlePrevPage}
          disabled={resultsPage === 1 ? true : false}
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={resultsPage === totalSearchPages ? true : false}
        >
          Next Page
        </button>
      </section>
      {movies?.map((movie) => (
        <StyledLink key={movie.id} href={`search-results/${movie.id}`}>
          <Movie movie={movie} />
        </StyledLink>
      ))}
      <section>
        {" "}
        <button
          onClick={handlePrevPage}
          disabled={resultsPage === 1 ? true : false}
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={resultsPage === totalSearchPages ? true : false}
        >
          Next Page
        </button>
      </section>
      <Navigation />
    </main>
  );
}
