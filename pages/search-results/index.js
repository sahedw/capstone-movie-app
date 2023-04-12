import React, { useContext, useState, useEffect } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext, MediaContext } from "../_app";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import TV from "../../components/TV";
import { EmptyContentContainer } from "../../components/Styled Components/ListPage";
import SearchLoader from "../../animations/SearchLoader/SearchLoader";
import simulateLoading from "../../utils/simulateLoading";

const StyledHeader = styled.h2`
  margin-left: 15px;
`;

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
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid gray;
  border-radius: 15px;
  color: ${(props) => props.theme.fontColor};
  :disabled {
    opacity: 0.3;
  }
`;

export default function SearchResultsPage() {
  const {
    movies,
    moviesError,
    search,
    handleNextPage,
    handlePrevPage,
    resultsPage,
    totalSearchPages,
    totalSearchResults,
    theme,
  } = useContext(DataContext);
  const { mediaTypeMovies } = useContext(MediaContext);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    simulateLoading(setIsLoadingResults, 1500);
  }, []);

  if (moviesError)
    return (
      <EmptyContentContainer>
        <h2>Whoops, something seems wrong</h2>
        <p>There seems to be an error. Try again.</p>
      </EmptyContentContainer>
    );

  if (movies?.length === 0)
    return (
      <>
        <PushButton />
        <EmptyContentContainer>
          <h2>Whoops, something seems wrong</h2>
          <p>{`The movie '${search}' doesn't seem to exist`}</p>
          <p>{`Please try to go back and search again :)`}</p>
          <Navigation />
        </EmptyContentContainer>
      </>
    );

  return (
    <main>
      {isLoadingResults ? (
        <EmptyContentContainer>
          <div>
            <SearchLoader />
          </div>
        </EmptyContentContainer>
      ) : (
        <>
          <PushButton />
          <StyledHeader>{`Your search results (${totalSearchResults}):`}</StyledHeader>
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
              {mediaTypeMovies === "movie" ? (
                <Movie movie={movie} />
              ) : (
                <TV movie={movie} />
              )}
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
        </>
      )}
    </main>
  );
}
