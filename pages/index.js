import Form from "../components/Form";
import { useContext, useState, useEffect } from "react";
import { DataContext, WatchlistContext } from "./_app";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import Movie from "../components/Movie";
import getRandomIndexFromArray from "../utils/getRandomIndexFromArray";
import { suggestionText } from "./api/suggestionText";
import Link from "next/link";
import MovieSneakPeek from "../components/MovieSneakPeek";

const StyledSectionHeader = styled.section`
  padding-left: 30px;
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
  padding-left: 30px;
  width: 350px;
`;

const StyledHeader = styled.h2`
  padding-left: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledLine = styled.hr`
  margin-top: 20px;
  width: 140px;
  border-top: 1px solid lightgrey;
`;

const StyledSectionTrending = styled.section`
  padding-right: 30px;
  padding-left: 30px;
`;

const StyledParagraphSortBy = styled.p`
  margin-left: 6px;
  margin-bottom: 0;
`;

const StyledButtonDay = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: black;
  }

  :disabled {
    color: #f97b7b;
    text-decoration: underline;
  }
`;

const StyledButtonWeek = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: black;
  }

  :disabled {
    color: #f97b7b;
    text-decoration: underline;
  }
`;

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);
  const { watchlist } = useContext(WatchlistContext);
  const [runtime, setRuntime] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [dayTrending, setDayTrending] = useState(true);

  const randomMovie = getRandomIndexFromArray(watchlist);
  const cutTrendingArray = trendingMovies.slice(0, 3);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.themoviedb.org/3/trending/movie/${
          dayTrending ? "day" : "week"
        }?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTrendingMovies(data.results);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, [dayTrending]);

  return (
    <>
      <main>
        <StyledSectionHeader>
          <h3>Welcome back!</h3>
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
            <StyledHeader>
              {suggestionText[getRandomIndexFromArray(suggestionText)]}
            </StyledHeader>
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
          <h2>Trending movies:</h2>
          <section>
            <StyledParagraphSortBy>Sort by:</StyledParagraphSortBy>
            <StyledButtonDay
              onClick={() => {
                setDayTrending(true);
              }}
              disabled={dayTrending ? true : false}
            >
              Day
            </StyledButtonDay>
            <StyledButtonWeek
              onClick={() => {
                setDayTrending(false);
              }}
              disabled={dayTrending ? false : true}
            >
              Week
            </StyledButtonWeek>
          </section>

          <MovieSneakPeek movies={cutTrendingArray} />
        </StyledSectionTrending>
      </main>

      <Navigation />
    </>
  );
}
