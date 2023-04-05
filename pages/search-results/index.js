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

const StyledSectionButtons = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;
`;

const StyledButtons = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.fontColor};
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
    theme,
  } = useContext(DataContext);

  if (movies?.length === 0)
    return (
      <>
        <PushButton />
        <h2>Whoops, something seems wrong</h2>
        <p>{`The movie '${search}' doesn't seem to exist`}</p>
        <p>{`Please try to go back and search again :)`}</p>
        <Navigation />
      </>
    );

  return (
    <main>
      <PushButton />
      <h2>{`Your search results (${totalSearchResults}):`}</h2>
      <StyledSectionButtons>
        {" "}
        <StyledButtons
          onClick={handlePrevPage}
          disabled={resultsPage === 1 ? true : false}
          color={theme}
        >
          Prev
        </StyledButtons>
        <StyledButtons
          onClick={handleNextPage}
          disabled={resultsPage === totalSearchPages ? true : false}
          color={theme}
        >
          Next
        </StyledButtons>
      </StyledSectionButtons>
      {movies?.map((movie) => (
        <StyledLink key={movie.id} href={`search-results/${movie.id}`}>
          <Movie movie={movie} />
        </StyledLink>
      ))}
      <StyledSectionButtons>
        {" "}
        <StyledButtons
          onClick={handlePrevPage}
          disabled={resultsPage === 1 ? true : false}
          color={theme}
        >
          Prev
        </StyledButtons>
        <StyledButtons
          onClick={handleNextPage}
          disabled={resultsPage === totalSearchPages ? true : false}
          color={theme}
        >
          Next
        </StyledButtons>
      </StyledSectionButtons>
      <Navigation />
    </main>
  );
}
