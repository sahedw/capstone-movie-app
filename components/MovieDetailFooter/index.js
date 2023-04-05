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
  background-color: ${(props) => props.theme.navigation};
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
/* display: flex;
  justify-content: space-around;
  align-items: center; */
const StyledButton = styled.button`
  position: relative;
  height: 45px;
  width: 160px;
  border-radius: 20px;
  border: 1px solid gray;
  background-color: transparent;
`;

const StyledIcon = styled(Image)`
  position: absolute;
  left: 15px;
  top: 12px;
`;

const StyledIconText = styled.p`
  position: absolute;
  right: 20px;
  top: 0px;
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
                      src={`/in-watchlist${getIconForTheme(theme)}.png`}
                      width={20}
                      height={20}
                    />{" "}
                    <StyledIconText> from Watchlist</StyledIconText>
                  </>
                ) : (
                  <>
                    <StyledIcon
                      alt={"not-in-watchlist"}
                      src={`/not-in-watchlist${getIconForTheme(theme)}.png`}
                      width={20}
                      height={20}
                    />
                    <StyledIconText> to Watchlist</StyledIconText>
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
                      src={`/in-watched${getIconForTheme(theme)}.png`}
                      width={20}
                      height={20}
                    />

                    <StyledIconText> from Watched</StyledIconText>
                  </>
                ) : (
                  <>
                    <StyledIcon
                      alt={"not-in-watched"}
                      src={`/not-in-watched${getIconForTheme(theme)}.png`}
                      width={20}
                      height={20}
                    />
                    <StyledIconText> to Watched</StyledIconText>
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
