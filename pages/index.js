import Form from "../components/Form";
import { useContext, useState, useEffect, useMemo } from "react";
import { DataContext, WatchlistContext, TrendingContext } from "./_app";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import Movie from "../components/Movie";
import getRandomIndexFromArray from "../utils/getRandomIndexFromArray";
import { suggestionText } from "./api/suggestionText";
import Link from "next/link";
import MovieSneakPeek from "../components/MovieSneakPeek";
import Image from "next/image";
import getIconForTheme from "../utils/getIconForTheme";

const StyledSectionHeader = styled.section`
  position: relative;
  padding-left: 15px;
`;

const StyledSettingsIcon = styled(Image)`
  position: absolute;
  top: 0;
  right: 15px;
`;

const StyledTrendingHeader = styled.h4`
  margin-bottom: 0;
`;

const StyledSectionForm = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const StyledMoviePick = styled.section`
  margin-top: 40px;
`;

const StyledNoMoviePickSection = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledNoMoviePick = styled.section`
  width: 340px;
`;

const StyledHeader = styled.h4`
  padding-left: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledLine = styled.hr`
  margin-top: 40px;
  width: 140px;
  border-top: 1px solid lightgrey;
`;

const StyledSectionTrending = styled.section`
  margin-top: 40px;
  padding-right: 15px;
  padding-left: 15px;
`;

const StyledSectionTrendingFlex = styled.p`
  margin-top: 0;
  display: flex;
  justify-content: flex-end;
`;

const StyledButtonDay = styled.button`
  padding-left: 5px;
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

const StyledButtonWeek = styled.button`
  padding-left: 5px;
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

const StyledAppName = styled.h1`
  font-family: "Normal";
  color: ${(props) => props.theme.fontColor};
`;

const StyledHeaderSpan = styled.span`
  color: #f97b7b;
  font-family: "BIGLetters";
`;

const StyledHeaderSubtitle = styled.p`
  color: ${(props) => props.theme.fontColor};
`;

export default function Home() {
  const { handleFormSubmit, movies, theme } = useContext(DataContext);
  const { watchlist } = useContext(WatchlistContext);
  const { dayTrending, trendingMovies, handleTrendingSort } =
    useContext(TrendingContext);

  const randomMovie = useMemo(
    () => getRandomIndexFromArray(watchlist),
    [watchlist]
  );
  const randomText = useMemo(
    () => suggestionText[getRandomIndexFromArray(suggestionText)],
    [watchlist]
  );

  const cutTrendingArray = trendingMovies?.slice(0, 9);

  return (
    <>
      <main>
        <StyledSectionHeader>
          <StyledAppName color={theme}>
            Watched<StyledHeaderSpan>It</StyledHeaderSpan>
          </StyledAppName>
          <Link href={"/settings"}>
            <StyledSettingsIcon
              src={`/settings${getIconForTheme(theme)}.png`}
              alt="settings-icon"
              width={25}
              height={25}
            />
          </Link>
          <StyledHeaderSubtitle color={theme}>
            Grab your 🍿 and and watch it!<strong>cool!</strong>{" "}
          </StyledHeaderSubtitle>
        </StyledSectionHeader>
        <StyledSectionForm>
          <Form onSubmit={handleFormSubmit} />
        </StyledSectionForm>
        <StyledLine />
        {watchlist.length > 0 ? (
          <StyledMoviePick>
            <StyledHeader>{randomText}</StyledHeader>
            <StyledLink href={`/${watchlist[randomMovie].id}`}>
              <Movie movie={watchlist[randomMovie]} />
            </StyledLink>
          </StyledMoviePick>
        ) : (
          <StyledNoMoviePickSection>
            <StyledNoMoviePick>
              <h1>You must be fun at parties 😪</h1>
              <p>
                Here we WOULD 😒 suggest you random movies from your watchlist
                to watch.{" "}
              </p>
              <p>How about adding some movies?</p>
            </StyledNoMoviePick>
          </StyledNoMoviePickSection>
        )}
        <StyledLine />
        <StyledSectionTrending>
          <StyledTrendingHeader>Trending movies:</StyledTrendingHeader>
          <StyledSectionTrendingFlex>
            <StyledButtonDay
              color={theme}
              onClick={() => {
                handleTrendingSort(true);
              }}
              disabled={dayTrending ? true : false}
            >
              Day
            </StyledButtonDay>
            <StyledButtonWeek
              onClick={() => {
                handleTrendingSort(false);
              }}
              disabled={dayTrending ? false : true}
            >
              Week
            </StyledButtonWeek>
          </StyledSectionTrendingFlex>
          <MovieSneakPeek movies={cutTrendingArray} />
        </StyledSectionTrending>
      </main>
      <Navigation />
    </>
  );
}
