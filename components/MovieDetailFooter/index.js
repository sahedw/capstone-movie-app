import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import setCurrentNavIcon from "../../utils/setCurrentNavIcon";
import setCurrentNavText from "../../utils/setCurrentNavText";
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

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 160px;
  border-radius: 20px;
  border: 1px solid gray;
  background-color: transparent;
`;

export default function MovieDetailFooter({ movie }) {
  const { theme } = useContext(DataContext);
  const { trendingMovies } = useContext(TrendingContext);
  const { handleToggleWatchList, watchlist } = useContext(WatchlistContext);
  const { handleToggleWatched } = useContext(WatchedContext);

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
                <p>Add to Watchlist</p>
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
                <p>Add to Watched</p>
              </StyledButton>
            </StyledDiv>
          </StyledListItem>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
