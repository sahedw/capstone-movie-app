import React from "react";
import { useRouter } from "next/router";
import {
  DataContext,
  TrendingContext,
  WatchlistTVContext,
  WatchedTVContext,
} from "../../pages/_app";
import { useContext, useState } from "react";
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
import simulateLoading from "../../utils/simulateLoading";

export default function TVDetailFooter({ movie }) {
  const [isButtonLoadingWatchlistTV, setIsButtonLoadingWatchlistTV] =
    useState(false);
  const [isButtonLoadingWatchedTV, setIsButtonLoadingWatchedTV] =
    useState(false);

  const { theme } = useContext(DataContext);
  const { trendingMovies } = useContext(TrendingContext);
  const { handleToggleWatchListTV, watchlistTV } =
    useContext(WatchlistTVContext);
  const { handleToggleWatchedTV, watchedTV } = useContext(WatchedTVContext);

  const router = useRouter();

  function handleRemoveInWatchlistTVPage(movie) {
    if (router.asPath.includes("my-watchlist")) {
      handleToggleWatchListTV(movie);
      router.push("/my-watchlist");
    } else if (
      trendingMovies.find((trendingMovie) => trendingMovie.id === movie.id)
    ) {
      handleToggleWatchListTV(movie);
      simulateLoading(setIsButtonLoadingWatchlistTV, 300);
    } else if (movie.id.toString().length === router.asPath.length - 1) {
      handleToggleWatchListTV(movie);
      router.push("/");
    } else {
      handleToggleWatchListTV(movie);
      simulateLoading(setIsButtonLoadingWatchlistTV, 300);
    }
  }

  function handleRemoveInWatchedTVPage(movie) {
    if (router.asPath.includes("my-watched")) {
      handleToggleWatchedTV(movie);
      router.push("/my-watched");
    } else {
      handleToggleWatchedTV(movie);
      simulateLoading(setIsButtonLoadingWatchedTV, 300);
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
                  JSON.stringify(watchlistTV).includes(JSON.stringify(movie))
                    ? "#f97b7b"
                    : "#faa5a5"
                }
                onClick={() => {
                  handleRemoveInWatchlistTVPage(movie);
                }}
                disabled={isButtonLoadingWatchlistTV}
              >
                {isButtonLoadingWatchlistTV ? (
                  <LoadingSpinnerButton />
                ) : (
                  <>
                    {" "}
                    {JSON.stringify(watchlistTV).includes(
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
                  JSON.stringify(watchedTV).includes(JSON.stringify(movie))
                    ? "#f97b7b"
                    : "#faa5a5"
                }
                onClick={() => {
                  handleRemoveInWatchedTVPage(movie);
                }}
                disabled={isButtonLoadingWatchedTV}
              >
                {isButtonLoadingWatchedTV ? (
                  <LoadingSpinnerButton />
                ) : (
                  <>
                    {" "}
                    {JSON.stringify(watchedTV).includes(
                      JSON.stringify(movie)
                    ) ? (
                      <>
                        <NavBarButtonIcon
                          alt={"in-watched"}
                          src={`/in-watched.png`}
                          width={20}
                          height={20}
                        />

                        <NavBarButtonText color={theme}>
                          Watched
                        </NavBarButtonText>
                      </>
                    ) : (
                      <>
                        <NavBarButtonIcon
                          alt={"not-in-watched"}
                          src={`/not-in-watched.png`}
                          width={20}
                          height={20}
                        />
                        <NavBarButtonText color={theme}>
                          Watched
                        </NavBarButtonText>
                      </>
                    )}
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
