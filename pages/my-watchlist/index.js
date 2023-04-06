import React from "react";
import { useContext } from "react";
import { WatchlistContext, WatchlistTVContext, DataContext } from "../_app";
import Movie from "../../components/Movie";
import MovieGrid from "../../components/MovieGrid";
import styled from "styled-components";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import useLocalStorageState from "use-local-storage-state";
import TVGrid from "../../components/TVGrid";
import TV from "../../components/TV";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const StyledButtonList = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

const StyledButtonGrid = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 5px;
  margin-top: 15px;
`;

const StyledSection = styled.section`
  padding-left: 15px;
  padding-right: 15px;
`;

const StyledSectionEmpty = styled.section`
  height: 550px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledSectionButtonsFlex = styled.section`
  width: 100%;
  margin-bottom: 15px;
`;

const StyledSectionButtons = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const StyledSectionList = styled.section`
  margin-top: 15px;
`;

const StyledHeaderMediaType = styled.h5`
  margin-bottom: 5px;
`;

export default function MyWatchlistPage() {
  const [listLayoutWatchlist, setListLayoutWatchlist] = useLocalStorageState(
    "newLayoutWatchlist",
    {
      defaultValue: true,
    }
  );
  const { watchlist } = useContext(WatchlistContext);
  const { watchlistTV } = useContext(WatchlistTVContext);

  const { theme } = useContext(DataContext);

  function setLayoutType(boolean) {
    setListLayoutWatchlist(boolean);
  }

  if (watchlist.length === 0)
    return (
      <main>
        <StyledSectionEmpty>
          <h2>Nothing to 👀 here.</h2>
          <p>Why dont you add some? </p>
        </StyledSectionEmpty>
        <Navigation />
      </main>
    );

  return (
    <main>
      <StyledSection>
        <h2>My Watchlist:</h2>
        <StyledSectionButtonsFlex>
          <StyledSectionButtons>
            <StyledButtonList
              color={theme}
              onClick={() => {
                setLayoutType(true);
              }}
              disabled={listLayoutWatchlist ? true : false}
            >
              List
            </StyledButtonList>
            <StyledButtonGrid
              color={theme}
              onClick={() => {
                setLayoutType(false);
              }}
              disabled={listLayoutWatchlist ? false : true}
            >
              Grid
            </StyledButtonGrid>
          </StyledSectionButtons>
        </StyledSectionButtonsFlex>

        <StyledHeaderMediaType>
          Movies ({watchlist.length})
        </StyledHeaderMediaType>

        {listLayoutWatchlist ? (
          <StyledSectionList>
            {watchlist.map((movie) => {
              return (
                <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <Movie movie={movie} />
                </StyledLink>
              );
            })}
          </StyledSectionList>
        ) : (
          <StyledDiv>
            {watchlist.map((movie) => {
              return (
                <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <MovieGrid movie={movie} />
                </StyledLink>
              );
            })}
          </StyledDiv>
        )}

        <StyledHeaderMediaType>
          Shows ({watchlistTV.length})
        </StyledHeaderMediaType>

        {listLayoutWatchlist ? (
          <StyledSectionList>
            {watchlistTV.map((movie) => {
              return (
                <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <TV movie={movie} />
                </StyledLink>
              );
            })}
          </StyledSectionList>
        ) : (
          <StyledDiv>
            {watchlistTV.map((movie) => {
              return (
                <StyledLink key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <TVGrid movie={movie} />
                </StyledLink>
              );
            })}
          </StyledDiv>
        )}
      </StyledSection>
      <Navigation />
    </main>
  );
}
