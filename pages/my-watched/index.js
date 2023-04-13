import React from "react";
import { useContext } from "react";
import { WatchedContext, WatchedTVContext, DataContext } from "../_app";
import Movie from "../../components/Movie";
import MovieGrid from "../../components/MovieGrid";
import Navigation from "../../components/Navigation";
import useLocalStorageState from "use-local-storage-state";
import TVGrid from "../../components/TVGrid";
import TV from "../../components/TV";
import {
  ListWrapper,
  ContentContainerList,
  EmptyContentContainer,
  ButtonsFlexContainer,
  ButtonsContainer,
  LayoutListButton,
  LayoutGridButton,
  MediaHeader,
  ContentContainerGrid,
  LinkWrapper,
} from "../../components/Styled Components/ListPage";

export default function MyWatchedPage() {
  const [listLayoutWatched, setListLayoutWatched] = useLocalStorageState(
    "newLayoutWatched",
    {
      defaultValue: true,
    }
  );
  const { watched } = useContext(WatchedContext);
  const { watchedTV } = useContext(WatchedTVContext);

  const { theme } = useContext(DataContext);

  function setLayoutType(boolean) {
    setListLayoutWatched(boolean);
  }

  if (watched.length === 0 && watchedTV.length === 0)
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
        <h2>My Watched ({watched.length + watchedTV.length}):</h2>
        <ButtonsFlexContainer>
          <ButtonsContainer>
            <LayoutListButton
              color={theme}
              onClick={() => {
                setLayoutType(true);
              }}
              disabled={listLayoutWatched ? true : false}
            >
              List
            </LayoutListButton>
            <LayoutGridButton
              color={theme}
              onClick={() => {
                setLayoutType(false);
              }}
              disabled={listLayoutWatched ? false : true}
            >
              Grid
            </LayoutGridButton>
          </ButtonsContainer>
        </ButtonsFlexContainer>

        <MediaHeader>Movies ({watched.length})</MediaHeader>

        {listLayoutWatched ? (
          <ContentContainerList>
            {watched.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watched/${movie.id}`}>
                  <Movie movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerList>
        ) : (
          <ContentContainerGrid>
            {watched.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watched/${movie.id}`}>
                  <MovieGrid movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerGrid>
        )}
        <MediaHeader>Shows ({watchedTV.length})</MediaHeader>
        {listLayoutWatched ? (
          <ContentContainerList>
            {watchedTV.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watched/${movie.id}`}>
                  <TV movie={movie} />
                </LinkWrapper>
              );
            })}
          </ContentContainerList>
        ) : (
          <ContentContainerGrid>
            {watchedTV.map((movie) => {
              return (
                <LinkWrapper key={movie.id} href={`my-watched/${movie.id}`}>
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
