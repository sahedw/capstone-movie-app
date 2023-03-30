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
import { useFetch } from "../hooks/useFetch";

const StyledSectionHeader = styled.section`
  padding-left: 15px;
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

const StyledNoMoviePick = styled.section`
  width: 350px;
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
    color: black;
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
    color: black;
  }

  :disabled {
    color: #f97b7b;
  }
`;

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);
  const { watchlist } = useContext(WatchlistContext);
  const { dayTrending, trendingMovies, handleTrendingSort } =
    useContext(TrendingContext);

  const [runtime, setRuntime] = useState(0);

  const randomMovie = useMemo(
    () => getRandomIndexFromArray(watchlist),
    [watchlist]
  );
  const randomText = useMemo(
    () => suggestionText[getRandomIndexFromArray(suggestionText)],
    [watchlist]
  );

  const cutTrendingArray = trendingMovies.slice(0, 9);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US`
        );
        if (response.ok) {
          const data = await response.json();
          setRuntime(data.runtime);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <main>
        <StyledSectionHeader>
          <h1>Welcome back 👋🏼</h1>
          <p>
            Grab your 🍿 and lets watch a <strong>movie!</strong>{" "}
          </p>
        </StyledSectionHeader>
        <StyledSectionForm>
          <Form onSubmit={handleFormSubmit} movies={movies} />
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
          <StyledNoMoviePick>
            <h1>You must be fun at parties 😪</h1>
            <p>
              Here we WOULD 😒 suggest you random movies from your watchlist to
              watch.{" "}
            </p>
            <p>How about adding some movies?</p>
          </StyledNoMoviePick>
        )}
        <StyledLine />
        <StyledSectionTrending>
          <StyledTrendingHeader>Trending movies:</StyledTrendingHeader>
          <StyledSectionTrendingFlex>
            <StyledButtonDay
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
