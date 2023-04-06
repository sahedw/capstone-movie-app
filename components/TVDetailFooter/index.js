import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import getIconForTheme from "../../utils/getIconForTheme";
import {
  DataContext,
  TrendingContext,
  WatchlistTVContext,
  WatchedContext,
} from "../../pages/_app";
import { useContext } from "react";

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.body};
  position: fixed;
  width: 100%;
  height: 80px;
  bottom: -1px;
  border-top: 1px solid grey;
`;

const StyledNavBar = styled.nav``;

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding-inline-start: 0;
`;

const StyledListItem = styled.li`
  font-size: 10px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
  height: 45px;
  width: 160px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.color};
`;

const StyledIcon = styled(Image)``;

const StyledIconText = styled.p`
  color: white;
`;

export default function TVDetailFooter({ movie }) {
  const { theme } = useContext(DataContext);
  const { trendingMovies } = useContext(TrendingContext);
  const { handleToggleWatchListTV, watchlistTV } =
    useContext(WatchlistTVContext);
  const { handleToggleWatched, watched } = useContext(WatchedContext);

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

  function handleRemoveInWatchedPage(movie) {
    if (router.asPath.includes("my-watched")) {
      handleToggleWatched(movie);
      router.push("/my-watched");
    } else {
      handleToggleWatched(movie);
    }
  }

  return (
    <StyledFooter color={theme}>
      <StyledNavBar>
        <StyledList>
          <StyledListItem>
            <StyledDiv>
              <StyledButton
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
                    <StyledIcon
                      alt={"in-watchlist"}
                      src={`/in-watchlist.png`}
                      width={20}
                      height={20}
                    />{" "}
                    <StyledIconText color={theme}>Watchlist</StyledIconText>
                  </>
                ) : (
                  <>
                    <StyledIcon
                      alt={"not-in-watchlist"}
                      src={`/not-in-watchlist.png`}
                      width={20}
                      height={20}
                    />
                    <StyledIconText color={theme}>Watchlist</StyledIconText>
                  </>
                )}
              </StyledButton>
            </StyledDiv>
          </StyledListItem>
          <StyledListItem>
            <StyledDiv>
              <StyledButton
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
                    <StyledIcon
                      alt={"in-watched"}
                      src={`/in-watched.png`}
                      width={20}
                      height={20}
                    />

                    <StyledIconText color={theme}>Watched</StyledIconText>
                  </>
                ) : (
                  <>
                    <StyledIcon
                      alt={"not-in-watched"}
                      src={`/not-in-watched.png`}
                      width={20}
                      height={20}
                    />
                    <StyledIconText color={theme}>Watched</StyledIconText>
                  </>
                )}
              </StyledButton>
            </StyledDiv>
          </StyledListItem>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
