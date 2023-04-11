import React from "react";
import { useRouter } from "next/router";
import {
  DataContext,
  TrendingContext,
  WatchlistContext,
  WatchedContext,
} from "../../pages/_app";
import { useContext } from "react";
import { useState } from "react";
import {
  DetailFooter,
  DetailNavBar,
  NavBarList,
  NavBarListButton,
  NavBarButtonIcon,
  NavBarButtonText,
  DetailNavBarButtonContainer,
  NavBarListItem,
} from "../Styled Components/DetailPageFooter";
import { LoadingSpinnerButton } from "../Styled Components/LoadingSpinner";

export default function MovieDetailFooter({ movie }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { theme } = useContext(DataContext);
  const { trendingMovies } = useContext(TrendingContext);
  const { handleToggleWatchList, watchlist } = useContext(WatchlistContext);
  const { handleToggleWatched, watched } = useContext(WatchedContext);

  const router = useRouter();

  function simulateLoading() {
    setIsButtonLoading(true);
    setTimeout(() => {
      setIsButtonLoading(false);
    }, 1000);
  }

  function handleRemoveInWatchlistPage(movie) {
    if (router.asPath.includes("my-watchlist")) {
      handleToggleWatchList(movie);
      router.push("/my-watchlist");
    } else if (
      trendingMovies.find((trendingMovie) => trendingMovie.id === movie.id)
    ) {
      handleToggleWatchList(movie);
      simulateLoading();
    } else if (movie.id.toString().length === router.asPath.length - 1) {
      handleToggleWatchList(movie);
      router.push("/");
    } else {
      handleToggleWatchList(movie);
      simulateLoading();
    }
  }

  function handleRemoveInWatchedPage(movie) {
    if (router.asPath.includes("my-watched")) {
      handleToggleWatched(movie);
      router.push("/my-watched");
    } else {
      handleToggleWatched(movie);
    }
  }

  return (
    <DetailFooter color={theme}>
      <DetailNavBar>
        <NavBarList>
          <NavBarListItem>
            <DetailNavBarButtonContainer>
              <NavBarListButton
                color={
                  JSON.stringify(watchlist).includes(JSON.stringify(movie))
                    ? "#f97b7b"
                    : "#faa5a5"
                }
                onClick={() => {
                  handleRemoveInWatchlistPage(movie);
                }}
                disabled={isButtonLoading}
              >
                {isButtonLoading ? (
                  <LoadingSpinnerButton />
                ) : (
                  <>
                    {JSON.stringify(watchlist).includes(
                      JSON.stringify(movie)
                    ) ? (
                      <>
                        <NavBarButtonIcon
                          alt={"in-watchlist"}
                          src={`/in-watchlist.png`}
                          width={20}
                          height={20}
                        />{" "}
                        <NavBarButtonText color={theme}>
                          Watchlist
                        </NavBarButtonText>
                      </>
                    ) : (
                      <>
                        <NavBarButtonIcon
                          alt={"not-in-watchlist"}
                          src={`/not-in-watchlist.png`}
                          width={20}
                          height={20}
                        />
                        <NavBarButtonText color={theme}>
                          Watchlist
                        </NavBarButtonText>
                      </>
                    )}
                  </>
                )}
              </NavBarListButton>
            </DetailNavBarButtonContainer>
          </NavBarListItem>
          <NavBarListItem>
            <DetailNavBarButtonContainer>
              <NavBarListButton
                color={
                  JSON.stringify(watched).includes(JSON.stringify(movie))
                    ? "#f97b7b"
                    : "#faa5a5"
                }
                onClick={() => {
                  handleRemoveInWatchedPage(movie);
                }}
              >
                {JSON.stringify(watched).includes(JSON.stringify(movie)) ? (
                  <>
                    <NavBarButtonIcon
                      alt={"in-watched"}
                      src={`/in-watched.png`}
                      width={20}
                      height={20}
                    />

                    <NavBarButtonText color={theme}>Watched</NavBarButtonText>
                  </>
                ) : (
                  <>
                    <NavBarButtonIcon
                      alt={"not-in-watched"}
                      src={`/not-in-watched.png`}
                      width={20}
                      height={20}
                    />
                    <NavBarButtonText color={theme}>Watched</NavBarButtonText>
                  </>
                )}
              </NavBarListButton>
            </DetailNavBarButtonContainer>
          </NavBarListItem>
        </NavBarList>
      </DetailNavBar>
    </DetailFooter>
  );
}
