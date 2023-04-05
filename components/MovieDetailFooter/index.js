import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import getIconForTheme from "../../utils/getIconForTheme";
import {
  DataContext,
  TrendingContext,
  WatchlistContext,
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  justify-content: space-around;
  align-items: center;
  height: 45px;
  width: 160px;
  border-radius: 20px;
  border: none;
  background-color: #f97b7b;
`;

const StyledIcon = styled(Image)``;

const StyledIconText = styled.p`
  color: white;
`;

export default function MovieDetailFooter({ movie }) {
  const { theme } = useContext(DataContext);
  const { trendingMovies } = useContext(TrendingContext);
  const { handleToggleWatchList, watchlist } = useContext(WatchlistContext);
  const { handleToggleWatched, watched } = useContext(WatchedContext);

  const router = useRouter();

  function handleRemoveInWatchlistPage(movie) {
    if (router.asPath.includes("my-watchlist")) {
      handleToggleWatchList(movie);
      router.push("/my-watchlist");
    } else if (
      trendingMovies.find((trendingMovie) => trendingMovie.id === movie.id)
    ) {
      handleToggleWatchList(movie);
    } else if (movie.id.toString().length === router.asPath.length - 1) {
      handleToggleWatchList(movie);
      router.push("/");
    } else {
      handleToggleWatchList(movie);
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
                onClick={() => {
                  handleRemoveInWatchlistPage(movie);
                }}
              >
                {JSON.stringify(watchlist).includes(JSON.stringify(movie)) ? (
                  <>
                    <StyledIcon
                      alt={"in-watchlist"}
                      src={`/in-watchlist.png`}
                      width={20}
                      height={20}
                    />{" "}
                    <StyledIconText color={theme}>
                      {" "}
                      from Watchlist
                    </StyledIconText>
                  </>
                ) : (
                  <>
                    <StyledIcon
                      alt={"not-in-watchlist"}
                      src={`/not-in-watchlist.png`}
                      width={20}
                      height={20}
                    />
                    <StyledIconText color={theme}> to Watchlist</StyledIconText>
                  </>
                )}
              </StyledButton>
            </StyledDiv>
          </StyledListItem>
          <StyledListItem>
            <StyledDiv>
              <StyledButton
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

                    <StyledIconText color={theme}> from Watched</StyledIconText>
                  </>
                ) : (
                  <>
                    <StyledIcon
                      alt={"not-in-watched"}
                      src={`/not-in-watched.png`}
                      width={20}
                      height={20}
                    />
                    <StyledIconText color={theme}> to Watched</StyledIconText>
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
