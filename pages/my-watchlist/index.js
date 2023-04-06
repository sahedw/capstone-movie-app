import React from "react";
import { useContext } from "react";
import { WatchlistContext, WatchlistTVContext, DataContext } from "../_app";
import Movie from "../../components/Movie";
import MovieGrid from "../../components/MovieGrid";
import Navigation from "../../components/Navigation";
import useLocalStorageState from "use-local-storage-state";
import TVGrid from "../../components/TVGrid";
import TV from "../../components/TV";
import { ListWrapper } from "../../components/Styled Components/ListPage";
import { ButtonsFlexContainer } from "../../components/Styled Components/ListPage";
import { ButtonsContainer } from "../../components/Styled Components/ListPage";
import { LayoutListButton } from "../../components/Styled Components/ListPage";
import { LayoutGridButton } from "../../components/Styled Components/ListPage";
import { MediaHeader } from "../../components/Styled Components/ListPage";
import { ContentContainerGrid } from "../../components/Styled Components/ListPage";
import { LinkWrapper } from "../../components/Styled Components/ListPage";
import { EmptyContentContainer } from "../../components/Styled Components/ListPage";
import { ContentContainerList } from "../../components/Styled Components/ListPage";

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
        <EmptyContentContainer>
          <h2>Nothing to 👀 here.</h2>
          <p>Why dont you add some? </p>
        </EmptyContentContainer>
        <Navigation />
      </main>
    );

  return (
    <main>
      <ListWrapper>
        <h2>My Watchlist:</h2>
        <ButtonsFlexContainer>
          <ButtonsContainer>
            <LayoutListButton
              color={theme}
              onClick={() => {
                setLayoutType(true);
              }}
              disabled={listLayoutWatchlist ? true : false}
            >
              List
            </LayoutListButton>
            <LayoutGridButton
              color={theme}
              onClick={() => {
                setLayoutType(false);
              }}
              disabled={listLayoutWatchlist ? false : true}
            >
              Grid
            </LayoutGridButton>
          </ButtonsContainer>
        </ButtonsFlexContainer>

        <MediaHeader>Movies ({watchlist.length})</MediaHeader>

        {listLayoutWatchlist ? (
          <ContentContainerList>
            {watchlist.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <Movie movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerList>
        ) : (
          <ContentContainerGrid>
            {watchlist.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <MovieGrid movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerGrid>
        )}

        <MediaHeader>Shows ({watchlistTV.length})</MediaHeader>

        {listLayoutWatchlist ? (
          <ContentContainerList>
            {watchlistTV.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <TV movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerList>
        ) : (
          <ContentContainerGrid>
            {watchlistTV.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watchlist/${movie.id}`}>
                  <TVGrid movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerGrid>
        )}
      </ListWrapper>
      <Navigation />
    </main>
  );
}
