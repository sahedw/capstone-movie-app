import React from "react";
import { useRouter } from "next/router";
import {
  DataContext,
  TrendingContext,
  WatchlistTVContext,
  WatchedTVContext,
} from "../../pages/_app";
import { useContext } from "react";
import { DetailFooter } from "../Styled Components/DetailPageFooter";
import { DetailNavBar } from "../Styled Components/DetailPageFooter";
import { NavBarList } from "../Styled Components/DetailPageFooter";
import { NavBarListItem } from "../Styled Components/DetailPageFooter";
import { DetailNavBarButtonContainer } from "../Styled Components/DetailPageFooter";
import { NavBarListButton } from "../Styled Components/DetailPageFooter";
import { NavBarButtonIcon } from "../Styled Components/DetailPageFooter";
import { NavBarButtonText } from "../Styled Components/DetailPageFooter";

export default function TVDetailFooter({ movie }) {
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
    } else if (movie.id.toString().length === router.asPath.length - 1) {
      handleToggleWatchListTV(movie);
      router.push("/");
    } else {
      handleToggleWatchListTV(movie);
    }
  }

  function handleRemoveInWatchedTVPage(movie) {
    if (router.asPath.includes("my-watched")) {
      handleToggleWatchedTV(movie);
      router.push("/my-watched");
    } else {
      handleToggleWatchedTV(movie);
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
              >
                {JSON.stringify(watchlistTV).includes(JSON.stringify(movie)) ? (
                  <>
                    <NavBarButtonIcon
                      alt={"in-watchlist"}
                      src={`/in-watchlist.png`}
                      width={20}
                      height={20}
                    />{" "}
                    <NavBarButtonText color={theme}>Watchlist</NavBarButtonText>
                  </>
                ) : (
                  <>
                    <NavBarButtonIcon
                      alt={"not-in-watchlist"}
                      src={`/not-in-watchlist.png`}
                      width={20}
                      height={20}
                    />
                    <NavBarButtonText color={theme}>Watchlist</NavBarButtonText>
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
              >
                {JSON.stringify(watchedTV).includes(JSON.stringify(movie)) ? (
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
